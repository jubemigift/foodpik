// Store.js - localStorage wrapper with event system
// This provides a clean API for data persistence and real-time updates

class DataStore {
  constructor() {
    this.listeners = {};
    this.init();
  }

  init() {
    // Initialize with default empty structures if needed
    const defaultData = {
      restaurants: [],
      menus: {},
      coupons: [],
      users: [],
      addresses: [],
      orders: [],
      cart: [],
      currentUser: null,
      session: null,
      adminLoggedIn: false
    };

    // Only set defaults if key doesn't exist
    Object.keys(defaultData).forEach(key => {
      if (!localStorage.getItem(key)) {
        this.set(key, defaultData[key]);
      }
    });
  }

  // Get data from localStorage
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return null;
    }
  }

  // Set data in localStorage
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      this.emit('storage:update', { key, value });
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
      return false;
    }
  }

  // Remove data from localStorage
  remove(key) {
    try {
      localStorage.removeItem(key);
      this.emit('storage:update', { key, value: null });
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  }

  // Add item to array in localStorage
  push(key, item) {
    const array = this.get(key) || [];
    array.push(item);
    return this.set(key, array);
  }

  // Update item in array by id
  updateInList(key, id, updates) {
    const array = this.get(key) || [];
    const index = array.findIndex(item => item.id === id);
    
    if (index !== -1) {
      array[index] = { ...array[index], ...updates };
      return this.set(key, array);
    }
    
    return false;
  }

  // Remove item from array by id
  removeFromList(key, id) {
    const array = this.get(key) || [];
    const filtered = array.filter(item => item.id !== id);
    return this.set(key, filtered);
  }

  // Find item in array by id
  findInList(key, id) {
    const array = this.get(key) || [];
    return array.find(item => item.id === id);
  }

  // Filter items in array
  filterList(key, predicate) {
    const array = this.get(key) || [];
    return array.filter(predicate);
  }

  // Clear all data (for demo reset)
  clear() {
    try {
      localStorage.clear();
      this.init(); // Reinitialize with defaults
      this.emit('storage:clear');
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  // Event system for real-time updates
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }

  emit(event, data) {
    // Emit custom event on window for cross-component communication
    window.dispatchEvent(new CustomEvent(event, { detail: data }));
    
    // Also call registered listeners
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  // Utility methods for common operations

  // Get current user
  getCurrentUser() {
    return this.get('currentUser');
  }

  // Check if user is logged in
  isLoggedIn() {
    return !!this.getCurrentUser();
  }

  // Get user's addresses
  getUserAddresses(userId = null) {
    const currentUser = userId || this.getCurrentUser()?.id;
    if (!currentUser) return [];
    
    return this.filterList('addresses', addr => addr.userId === currentUser);
  }

  // Get user's orders
  getUserOrders(userId = null) {
    const currentUser = userId || this.getCurrentUser()?.id;
    if (!currentUser) return [];
    
    return this.filterList('orders', order => order.userId === currentUser);
  }

  // Search restaurants
  searchRestaurants(query, filters = {}) {
    const restaurants = this.get('restaurants') || [];
    
    return restaurants.filter(restaurant => {
      // Text search
      if (query) {
        const searchText = query.toLowerCase();
        const matchesName = restaurant.name.toLowerCase().includes(searchText);
        const matchesCuisine = restaurant.cuisines.some(cuisine => 
          cuisine.toLowerCase().includes(searchText)
        );
        const matchesArea = restaurant.area.toLowerCase().includes(searchText);
        
        if (!matchesName && !matchesCuisine && !matchesArea) {
          return false;
        }
      }

      // Area filter
      if (filters.areas && filters.areas.length > 0) {
        if (!filters.areas.includes(restaurant.area)) {
          return false;
        }
      }

      // Delivery time filter
      if (filters.deliveryTime && restaurant.deliveryTime > filters.deliveryTime) {
        return false;
      }

      // Price range filter
      if (filters.priceRange && filters.priceRange.length > 0) {
        if (!filters.priceRange.includes(restaurant.priceRange)) {
          return false;
        }
      }

      // Rating filter
      if (filters.rating && filters.rating.length > 0) {
        const meetsRating = filters.rating.some(minRating => 
          restaurant.rating >= minRating
        );
        if (!meetsRating) {
          return false;
        }
      }

      // Cuisine filter
      if (filters.cuisine) {
        const matchesCuisine = restaurant.cuisines.some(cuisine => 
          cuisine.toLowerCase() === filters.cuisine.toLowerCase()
        );
        if (!matchesCuisine) {
          return false;
        }
      }

      return true;
    });
  }

  // Get restaurant menu
  getRestaurantMenu(restaurantId) {
    const menus = this.get('menus') || {};
    return menus[restaurantId] || {};
  }

  // Search menu items
  searchMenuItems(restaurantId, query) {
    const menu = this.getRestaurantMenu(restaurantId);
    const results = [];
    
    Object.entries(menu).forEach(([category, items]) => {
      items.forEach(item => {
        if (item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())) {
          results.push({ ...item, category });
        }
      });
    });
    
    return results;
  }

  // Validate coupon
  validateCoupon(code, subtotal) {
    const coupons = this.get('coupons') || [];
    const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase());
    
    if (!coupon) {
      return { valid: false, error: 'Invalid coupon code' };
    }

    if (subtotal < coupon.minSpend) {
      return { 
        valid: false, 
        error: `Minimum order of ₦${coupon.minSpend.toLocaleString()} required` 
      };
    }

    const now = new Date();
    const expiry = new Date(coupon.expiry);
    if (now > expiry) {
      return { valid: false, error: 'Coupon has expired' };
    }

    return { valid: true, coupon };
  }

  // Calculate delivery fee based on area
  calculateDeliveryFee(area) {
    const deliveryTiers = {
      'Effurun': 300,
      'Enerhen': 400,
      'PTI Road': 500,
      'Jakpa Road': 600,
      'Airport Road': 700,
      'Ekpan': 800,
      'Ugbuwangue': 900,
      'Ugborikoko': 1000
    };

    return deliveryTiers[area] || 500;
  }

  // Generate unique ID
  generateId(prefix = '') {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  }

  // Export data (for backup/debugging)
  exportData() {
    const data = {};
    const keys = [
      'restaurants', 'menus', 'coupons', 'users', 
      'addresses', 'orders', 'cart', 'currentUser'
    ];
    
    keys.forEach(key => {
      data[key] = this.get(key);
    });
    
    return data;
  }

  // Import data (for restore/seeding)
  importData(data) {
    try {
      Object.entries(data).forEach(([key, value]) => {
        this.set(key, value);
      });
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Get storage usage info
  getStorageInfo() {
    let totalSize = 0;
    const itemSizes = {};
    
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const size = localStorage[key].length;
        itemSizes[key] = size;
        totalSize += size;
      }
    }
    
    return {
      totalSize,
      itemSizes,
      totalSizeKB: Math.round(totalSize / 1024 * 100) / 100,
      available: 5120 - Math.round(totalSize / 1024), // Assuming 5MB limit
    };
  }
}

// Create global instance
const Store = new DataStore();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Store;
}