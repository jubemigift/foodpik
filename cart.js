// Cart.js - Shopping cart management
// Handles cart operations, checkout logic, and order creation

class CartManager {
  constructor() {
    this.items = [];
    this.init();
  }

  init() {
    this.loadCart();
    this.setupEventListeners();
  }

  // Load cart from localStorage
  loadCart() {
    const cartData = Store.get('cart') || [];
    this.items = cartData;
    this.updateCartBadge();
  }

  // Save cart to localStorage
  saveCart() {
    Store.set('cart', this.items);
    this.updateCartBadge();
  }

  // Add item to cart
  addItem(item) {
    // Check if item from same restaurant exists with same configuration
    const existingItemIndex = this.findExistingItem(item);
    
    if (existingItemIndex !== -1) {
      // Update quantity of existing item
      this.items[existingItemIndex].quantity += item.quantity;
    } else {
      // Add new item
      this.items.push({
        ...item,
        timestamp: item.timestamp || Date.now()
      });
    }
    
    this.saveCart();
    this.emitCartUpdate();
  }

  // Find existing item with same configuration
  findExistingItem(newItem) {
    return this.items.findIndex(item => 
      item.restaurantId === newItem.restaurantId &&
      item.itemId === newItem.itemId &&
      this.compareAddOns(item.addOns, newItem.addOns) &&
      item.specialInstructions === newItem.specialInstructions
    );
  }

  // Compare add-ons for equality
  compareAddOns(addOns1, addOns2) {
    const keys1 = Object.keys(addOns1 || {}).sort();
    const keys2 = Object.keys(addOns2 || {}).sort();
    
    if (keys1.length !== keys2.length) return false;
    
    return keys1.every(key => {
      const options1 = (addOns1[key] || []).map(opt => opt.name).sort();
      const options2 = (addOns2[key] || []).map(opt => opt.name).sort();
      
      return options1.length === options2.length &&
             options1.every((opt, index) => opt === options2[index]);
    });
  }

  // Remove item from cart
  removeItem(timestamp) {
    this.items = this.items.filter(item => item.timestamp !== parseInt(timestamp));
    this.saveCart();
    this.emitCartUpdate();
  }

  // Update item quantity
  updateItemQuantity(timestamp, change) {
    const itemIndex = this.items.findIndex(item => item.timestamp === parseInt(timestamp));
    
    if (itemIndex !== -1) {
      this.items[itemIndex].quantity += change;
      
      if (this.items[itemIndex].quantity <= 0) {
        this.removeItem(timestamp);
      } else {
        this.saveCart();
        this.emitCartUpdate();
      }
    }
  }

  // Clear entire cart
  clear() {
    this.items = [];
    this.saveCart();
    this.emitCartUpdate();
  }

  // Get all cart items
  getItems() {
    return [...this.items];
  }

  // Get cart item count
  getItemCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Calculate subtotal (before delivery and discounts)
  getSubtotal() {
    return this.items.reduce((total, item) => {
      const itemPrice = item.price;
      const addOnPrice = this.calculateAddOnPrice(item.addOns);
      return total + ((itemPrice + addOnPrice) * item.quantity);
    }, 0);
  }

  // Calculate add-on price for an item
  calculateAddOnPrice(addOns) {
    if (!addOns) return 0;
    
    return Object.values(addOns).reduce((total, addOnGroup) => {
      return total + addOnGroup.reduce((groupTotal, addOn) => {
        return groupTotal + (addOn.price || 0);
      }, 0);
    }, 0);
  }

  // Get total (including delivery fee and discounts)
  getTotal(deliveryFee = 0, discount = 0) {
    return this.getSubtotal() + deliveryFee - discount;
  }

  // Group items by restaurant
  getItemsByRestaurant() {
    const grouped = {};
    
    this.items.forEach(item => {
      if (!grouped[item.restaurantId]) {
        grouped[item.restaurantId] = [];
      }
      grouped[item.restaurantId].push(item);
    });
    
    return grouped;
  }

  // Check if cart has items from multiple restaurants
  hasMultipleRestaurants() {
    const restaurantIds = [...new Set(this.items.map(item => item.restaurantId))];
    return restaurantIds.length > 1;
  }

  // Get unique restaurant IDs in cart
  getRestaurantIds() {
    return [...new Set(this.items.map(item => item.restaurantId))];
  }

  // Validate cart before checkout
  validateCart() {
    const errors = [];
    
    if (this.items.length === 0) {
      errors.push('Your cart is empty');
      return { isValid: false, errors };
    }

    // Check if all restaurants are still available
    const restaurants = Store.get('restaurants') || [];
    const restaurantIds = this.getRestaurantIds();
    
    restaurantIds.forEach(restaurantId => {
      const restaurant = restaurants.find(r => r.id === restaurantId);
      if (!restaurant) {
        errors.push('One or more restaurants in your cart are no longer available');
      } else if (!restaurant.isOpen) {
        errors.push(`${restaurant.name} is currently closed`);
      }
    });

    // Check minimum order requirements
    const itemsByRestaurant = this.getItemsByRestaurant();
    Object.entries(itemsByRestaurant).forEach(([restaurantId, items]) => {
      const restaurant = restaurants.find(r => r.id === restaurantId);
      if (restaurant) {
        const restaurantSubtotal = items.reduce((total, item) => {
          const itemPrice = item.price;
          const addOnPrice = this.calculateAddOnPrice(item.addOns);
          return total + ((itemPrice + addOnPrice) * item.quantity);
        }, 0);
        
        if (restaurantSubtotal < restaurant.minOrder) {
          errors.push(`Minimum order for ${restaurant.name} is ₦${restaurant.minOrder.toLocaleString()}`);
        }
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Create order from cart
  createOrder(orderDetails) {
    const validation = this.validateCart();
    if (!validation.isValid) {
      throw new Error(validation.errors[0]);
    }

    const orderId = this.generateOrderId();
    const order = {
      id: orderId,
      items: this.getItems(),
      ...orderDetails,
      timestamp: Date.now(),
      estimatedDelivery: this.calculateEstimatedDelivery(orderDetails.address?.area)
    };

    // Save order
    const orders = Store.get('orders') || [];
    orders.push(order);
    Store.set('orders', orders);

    // Clear cart
    this.clear();

    return order;
  }

  // Generate unique order ID
  generateOrderId() {
    const prefix = 'FPW';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  }

  // Calculate estimated delivery time
  calculateEstimatedDelivery(area) {
    const now = new Date();
    const baseDeliveryTime = 35; // Base delivery time in minutes
    
    // Add extra time based on area (mock distance calculation)
    const areaDelays = {
      'Effurun': 0,
      'Enerhen': 5,
      'PTI Road': 10,
      'Jakpa Road': 15,
      'Airport Road': 20,
      'Ekpan': 25,
      'Ugbuwangue': 30,
      'Ugborikoko': 35
    };
    
    const extraTime = areaDelays[area] || 15;
    const totalMinutes = baseDeliveryTime + extraTime + Math.floor(Math.random() * 10); // Add some randomness
    
    return new Date(now.getTime() + totalMinutes * 60 * 1000);
  }

  // Update cart badge in navigation
  updateCartBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const count = this.getItemCount();
    
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'block' : 'none';
    });
  }

  // Setup event listeners
  setupEventListeners() {
    // Listen for storage updates from other tabs
    window.addEventListener('storage', (e) => {
      if (e.key === 'cart') {
        this.loadCart();
      }
    });

    // Listen for custom cart events
    window.addEventListener('cart:update', () => {
      this.loadCart();
    });
  }

  // Emit cart update event
  emitCartUpdate() {
    window.dispatchEvent(new CustomEvent('cart:update', {
      detail: {
        items: this.getItems(),
        count: this.getItemCount(),
        subtotal: this.getSubtotal()
      }
    }));
  }

  // Save cart for offline use
  saveForOffline() {
    try {
      const cartData = {
        items: this.items,
        timestamp: Date.now()
      };
      localStorage.setItem('offline_cart', JSON.stringify(cartData));
      return true;
    } catch (error) {
      console.error('Failed to save cart for offline use:', error);
      return false;
    }
  }

  // Restore cart from offline storage
  restoreFromOffline() {
    try {
      const offlineCart = localStorage.getItem('offline_cart');
      if (offlineCart) {
        const cartData = JSON.parse(offlineCart);
        
        // Check if offline cart is recent (within 24 hours)
        const hoursSinceOffline = (Date.now() - cartData.timestamp) / (1000 * 60 * 60);
        if (hoursSinceOffline < 24) {
          this.items = cartData.items || [];
          this.saveCart();
          localStorage.removeItem('offline_cart');
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Failed to restore cart from offline storage:', error);
      return false;
    }
  }

  // Get cart summary for display
  getCartSummary() {
    const itemCount = this.getItemCount();
    const subtotal = this.getSubtotal();
    const restaurantCount = this.getRestaurantIds().length;
    
    return {
      itemCount,
      subtotal,
      restaurantCount,
      isEmpty: itemCount === 0,
      hasMultipleRestaurants: restaurantCount > 1
    };
  }

  // Apply promo code
  applyPromoCode(code, subtotal) {
    const validation = Store.validateCoupon(code, subtotal);
    
    if (validation.valid) {
      const discount = Math.floor(subtotal * (validation.coupon.discount / 100));
      return {
        success: true,
        coupon: validation.coupon,
        discount
      };
    } else {
      return {
        success: false,
        error: validation.error
      };
    }
  }

  // Calculate delivery fee for cart
  calculateDeliveryFee(address) {
    if (!address || !address.area) return 0;
    
    // Get unique restaurants in cart
    const restaurantIds = this.getRestaurantIds();
    const restaurants = Store.get('restaurants') || [];
    
    // Use the highest delivery fee if multiple restaurants
    let maxDeliveryFee = 0;
    restaurantIds.forEach(restaurantId => {
      const restaurant = restaurants.find(r => r.id === restaurantId);
      if (restaurant) {
        const baseFee = restaurant.deliveryFee || 0;
        const areaFee = Store.calculateDeliveryFee(address.area);
        const totalFee = Math.max(baseFee, areaFee);
        maxDeliveryFee = Math.max(maxDeliveryFee, totalFee);
      }
    });
    
    return maxDeliveryFee;
  }

  // Get recommended items (based on cart contents)
  getRecommendedItems() {
    if (this.items.length === 0) return [];
    
    const restaurantIds = this.getRestaurantIds();
    const menus = Store.get('menus') || {};
    const recommendations = [];
    
    // Get items from same restaurants that aren't in cart
    restaurantIds.forEach(restaurantId => {
      const menu = menus[restaurantId] || {};
      Object.values(menu).forEach(categoryItems => {
        categoryItems.forEach(item => {
          const isInCart = this.items.some(cartItem => 
            cartItem.restaurantId === restaurantId && cartItem.itemId === item.id
          );
          
          if (!isInCart && recommendations.length < 6) {
            recommendations.push({
              ...item,
              restaurantId
            });
          }
        });
      });
    });
    
    return recommendations;
  }

  // Export cart data
  exportCart() {
    return {
      items: this.items,
      summary: this.getCartSummary(),
      timestamp: Date.now()
    };
  }

  // Import cart data
  importCart(cartData) {
    try {
      if (cartData && cartData.items) {
        this.items = cartData.items;
        this.saveCart();
        this.emitCartUpdate();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to import cart data:', error);
      return false;
    }
  }
}

// Create global instance
const Cart = new CartManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Cart;
}