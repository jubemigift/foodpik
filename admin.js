// Admin.js - Admin dashboard functionality
// Handles admin operations, data management, and analytics

class AdminManager {
  constructor() {
    this.currentUser = null;
    this.init();
  }

  init() {
    this.checkAuthStatus();
    this.setupEventListeners();
  }

  // Authentication
  checkAuthStatus() {
    this.currentUser = Store.get('adminUser');
    return !!this.currentUser;
  }

  login(username, password) {
    // Simple demo authentication
    if (username === 'admin' && password === 'admin123') {
      this.currentUser = {
        id: 'admin_001',
        username: 'admin',
        name: 'Admin User',
        role: 'super_admin',
        loginTime: Date.now()
      };
      
      Store.set('adminUser', this.currentUser);
      Store.set('adminLoggedIn', true);
      return { success: true, user: this.currentUser };
    }
    
    return { success: false, error: 'Invalid credentials' };
  }

  logout() {
    this.currentUser = null;
    Store.remove('adminUser');
    Store.remove('adminLoggedIn');
  }

  // Restaurant Management
  createRestaurant(restaurantData) {
    const restaurant = {
      id: Store.generateId('rest_'),
      ...restaurantData,
      rating: 4.0,
      reviews: 0,
      isOpen: true,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const restaurants = Store.get('restaurants') || [];
    restaurants.push(restaurant);
    Store.set('restaurants', restaurants);

    return restaurant;
  }

  updateRestaurant(restaurantId, updates) {
    const restaurants = Store.get('restaurants') || [];
    const index = restaurants.findIndex(r => r.id === restaurantId);
    
    if (index !== -1) {
      restaurants[index] = {
        ...restaurants[index],
        ...updates,
        updatedAt: Date.now()
      };
      Store.set('restaurants', restaurants);
      return restaurants[index];
    }
    
    return null;
  }

  deleteRestaurant(restaurantId) {
    // Remove restaurant
    const restaurants = Store.get('restaurants') || [];
    const filteredRestaurants = restaurants.filter(r => r.id !== restaurantId);
    Store.set('restaurants', filteredRestaurants);

    // Remove associated menu items
    const menus = Store.get('menus') || {};
    delete menus[restaurantId];
    Store.set('menus', menus);

    return true;
  }

  toggleRestaurantStatus(restaurantId, newStatus) {
    const restaurants = Store.get('restaurants') || [];
    const restaurantIndex = restaurants.findIndex(r => r.id === restaurantId);
    
    if (restaurantIndex !== -1) {
      restaurants[restaurantIndex].isOpen = newStatus;
      restaurants[restaurantIndex].updatedAt = Date.now();
      Store.set('restaurants', restaurants);
      
      // Re-render the restaurants section
      if (typeof adminApp !== 'undefined' && adminApp.currentSection === 'restaurants') {
        adminApp.renderRestaurants();
      }
      
      return restaurants[restaurantIndex];
    }
    
    return null;
  }

  toggleRestaurantStatus(restaurantId, newStatus) {
    const restaurants = Store.get('restaurants') || [];
    const restaurantIndex = restaurants.findIndex(r => r.id === restaurantId);
    
    if (restaurantIndex !== -1) {
      restaurants[restaurantIndex].isOpen = newStatus;
      restaurants[restaurantIndex].updatedAt = Date.now();
      Store.set('restaurants', restaurants);
      
      // Re-render the restaurants section
      if (typeof adminApp !== 'undefined' && adminApp.currentSection === 'restaurants') {
        adminApp.renderRestaurants();
      }
      
      return restaurants[restaurantIndex];
    }
    
    return null;
  }

  getRestaurantStats(restaurantId) {
    const orders = Store.get('orders') || [];
    const restaurantOrders = orders.filter(order => 
      order.items.some(item => item.restaurantId === restaurantId)
    );

    const totalOrders = restaurantOrders.length;
    const totalRevenue = restaurantOrders.reduce((sum, order) => sum + order.total, 0);
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Calculate rating from recent orders (mock)
    const rating = 4.0 + Math.random() * 0.8;
    
    return {
      totalOrders,
      totalRevenue,
      avgOrderValue,
      rating: Math.round(rating * 10) / 10,
      reviews: totalOrders
    };
  }

  // Menu Management
  createMenuItem(restaurantId, category, itemData) {
    const menus = Store.get('menus') || {};
    
    if (!menus[restaurantId]) {
      menus[restaurantId] = {};
    }
    
    if (!menus[restaurantId][category]) {
      menus[restaurantId][category] = [];
    }

    const menuItem = {
      id: Store.generateId('item_'),
      ...itemData,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    menus[restaurantId][category].push(menuItem);
    Store.set('menus', menus);

    return menuItem;
  }

  updateMenuItem(restaurantId, category, itemId, updates) {
    const menus = Store.get('menus') || {};
    
    if (menus[restaurantId] && menus[restaurantId][category]) {
      const itemIndex = menus[restaurantId][category].findIndex(item => item.id === itemId);
      
      if (itemIndex !== -1) {
        menus[restaurantId][category][itemIndex] = {
          ...menus[restaurantId][category][itemIndex],
          ...updates,
          updatedAt: Date.now()
        };
        
        Store.set('menus', menus);
        return menus[restaurantId][category][itemIndex];
      }
    }
    
    return null;
  }

  deleteMenuItem(restaurantId, category, itemId) {
    const menus = Store.get('menus') || {};
    
    if (menus[restaurantId] && menus[restaurantId][category]) {
      menus[restaurantId][category] = menus[restaurantId][category].filter(
        item => item.id !== itemId
      );
      
      // Remove category if empty
      if (menus[restaurantId][category].length === 0) {
        delete menus[restaurantId][category];
      }
      
      Store.set('menus', menus);
      return true;
    }
    
    return false;
  }

  // Order Management
  updateOrderStatus(orderId, newStatus) {
    const orders = Store.get('orders') || [];
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex !== -1) {
      orders[orderIndex].status = newStatus;
      orders[orderIndex].updatedAt = Date.now();
      
      // Add status history
      if (!orders[orderIndex].statusHistory) {
        orders[orderIndex].statusHistory = [];
      }
      
      orders[orderIndex].statusHistory.push({
        status: newStatus,
        timestamp: Date.now()
      });
      
      Store.set('orders', orders);
      return orders[orderIndex];
    }
    
    return null;
  }

  getOrdersByStatus(status) {
    const orders = Store.get('orders') || [];
    return status ? orders.filter(order => order.status === status) : orders;
  }

  getOrdersByDateRange(startDate, endDate) {
    const orders = Store.get('orders') || [];
    return orders.filter(order => {
      const orderDate = new Date(order.timestamp);
      return orderDate >= startDate && orderDate <= endDate;
    });
  }

  // Coupon Management
  createCoupon(couponData) {
    const coupon = {
      id: Store.generateId('coupon_'),
      ...couponData,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      usageCount: 0
    };

    const coupons = Store.get('coupons') || [];
    coupons.push(coupon);
    Store.set('coupons', coupons);

    return coupon;
  }

  updateCoupon(couponId, updates) {
    return Store.updateInList('coupons', couponId, {
      ...updates,
      updatedAt: Date.now()
    });
  }

  deleteCoupon(couponId) {
    return Store.removeFromList('coupons', couponId);
  }

  getCouponUsage(couponId) {
    const orders = Store.get('orders') || [];
    const usage = orders.filter(order => order.promo && order.promo.id === couponId);
    
    return {
      totalUses: usage.length,
      totalDiscount: usage.reduce((sum, order) => sum + (order.discount || 0), 0),
      recentUses: usage.slice(-10) // Last 10 uses
    };
  }

  // Analytics and Reports
  getDashboardStats() {
    const orders = Store.get('orders') || [];
    const restaurants = Store.get('restaurants') || [];
    const users = Store.get('users') || [];
    
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const todayOrders = orders.filter(order => new Date(order.timestamp) >= todayStart);
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0);
    const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

    return {
      totalOrders: orders.length,
      todayOrders: todayOrders.length,
      totalRevenue,
      todayRevenue,
      avgOrderValue,
      totalRestaurants: restaurants.length,
      totalUsers: users.length,
      activeRestaurants: restaurants.filter(r => r.isOpen).length
    };
  }

  getOrdersAnalytics(days = 7) {
    const orders = Store.get('orders') || [];
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000));
    
    const periodOrders = orders.filter(order => {
      const orderDate = new Date(order.timestamp);
      return orderDate >= startDate && orderDate <= endDate;
    });

    // Group by day
    const dailyStats = {};
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate.getTime() + (i * 24 * 60 * 60 * 1000));
      const dateKey = date.toISOString().split('T')[0];
      dailyStats[dateKey] = {
        orders: 0,
        revenue: 0,
        date: dateKey
      };
    }

    periodOrders.forEach(order => {
      const dateKey = new Date(order.timestamp).toISOString().split('T')[0];
      if (dailyStats[dateKey]) {
        dailyStats[dateKey].orders++;
        dailyStats[dateKey].revenue += order.total;
      }
    });

    return Object.values(dailyStats);
  }

  getRevenueByArea() {
    const orders = Store.get('orders') || [];
    const areaRevenue = {};

    orders.forEach(order => {
      const area = order.address?.area || 'Unknown';
      if (!areaRevenue[area]) {
        areaRevenue[area] = 0;
      }
      areaRevenue[area] += order.total;
    });

    return Object.entries(areaRevenue).map(([area, revenue]) => ({
      area,
      revenue,
      percentage: 0 // Will be calculated by the chart component
    }));
  }

  getTopRestaurants(limit = 10) {
    const orders = Store.get('orders') || [];
    const restaurants = Store.get('restaurants') || [];
    const restaurantStats = {};

    // Initialize stats for all restaurants
    restaurants.forEach(restaurant => {
      restaurantStats[restaurant.id] = {
        id: restaurant.id,
        name: restaurant.name,
        orders: 0,
        revenue: 0,
        rating: restaurant.rating || 0
      };
    });

    // Calculate stats from orders
    orders.forEach(order => {
      order.items.forEach(item => {
        const restaurantId = item.restaurantId;
        if (restaurantStats[restaurantId]) {
          restaurantStats[restaurantId].orders++;
          restaurantStats[restaurantId].revenue += (item.price * item.quantity);
        }
      });
    });

    return Object.values(restaurantStats)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, limit);
  }

  getPopularItems(limit = 10) {
    const orders = Store.get('orders') || [];
    const itemStats = {};

    orders.forEach(order => {
      order.items.forEach(item => {
        const key = `${item.restaurantId}_${item.itemId}`;
        if (!itemStats[key]) {
          itemStats[key] = {
            name: item.name,
            restaurantName: item.restaurantName,
            orders: 0,
            quantity: 0,
            revenue: 0
          };
        }
        
        itemStats[key].orders++;
        itemStats[key].quantity += item.quantity;
        itemStats[key].revenue += (item.price * item.quantity);
      });
    });

    return Object.values(itemStats)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, limit);
  }

  // User Management
  getUserStats() {
    const users = Store.get('users') || [];
    const orders = Store.get('orders') || [];
    
    const userOrderCounts = {};
    orders.forEach(order => {
      const userId = order.userId || 'guest';
      userOrderCounts[userId] = (userOrderCounts[userId] || 0) + 1;
    });

    const activeUsers = Object.keys(userOrderCounts).length;
    const avgOrdersPerUser = activeUsers > 0 ? orders.length / activeUsers : 0;

    return {
      totalUsers: users.length,
      activeUsers,
      avgOrdersPerUser: Math.round(avgOrdersPerUser * 10) / 10,
      newUsersToday: 0 // Would need registration timestamps
    };
  }

  // Data Export/Import
  exportData(type = 'all') {
    const data = {};
    
    switch (type) {
      case 'restaurants':
        data.restaurants = Store.get('restaurants');
        data.menus = Store.get('menus');
        break;
      case 'orders':
        data.orders = Store.get('orders');
        break;
      case 'users':
        data.users = Store.get('users');
        data.addresses = Store.get('addresses');
        break;
      case 'coupons':
        data.coupons = Store.get('coupons');
        break;
      default:
        data.restaurants = Store.get('restaurants');
        data.menus = Store.get('menus');
        data.orders = Store.get('orders');
        data.users = Store.get('users');
        data.addresses = Store.get('addresses');
        data.coupons = Store.get('coupons');
    }
    
    return {
      data,
      exportDate: new Date().toISOString(),
      type
    };
  }

  importData(importData) {
    try {
      if (importData.data) {
        Object.entries(importData.data).forEach(([key, value]) => {
          Store.set(key, value);
        });
        return { success: true };
      }
      return { success: false, error: 'Invalid import data format' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Backup and Restore
  createBackup() {
    const backup = {
      timestamp: Date.now(),
      data: Store.exportData(),
      version: '1.0'
    };
    
    return backup;
  }

  restoreBackup(backup) {
    try {
      if (backup.data && backup.version) {
        Store.importData(backup.data);
        return { success: true };
      }
      return { success: false, error: 'Invalid backup format' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Setup event listeners
  setupEventListeners() {
    // Listen for data changes
    window.addEventListener('storage:update', (e) => {
      // Handle real-time updates if needed
      console.log('Data updated:', e.detail.key);
    });
  }

  // Utility methods
  formatCurrency(amount) {
    return `₦${amount.toLocaleString()}`;
  }

  formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString('en-NG');
  }

  formatDateTime(timestamp) {
    return new Date(timestamp).toLocaleString('en-NG');
  }
}

// Create global instance
const Admin = new AdminManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Admin;
}