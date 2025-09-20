// App.js - Main application bootstrap and utilities
// Handles global app initialization, navigation, and common functionality

class FoodPickApp {
  constructor() {
    this.currentPage = this.getCurrentPage();
    this.isOnline = navigator.onLine;
    this.demoMode = localStorage.getItem('demoMode') === 'true';
    this.init();
  }

  init() {
    this.setupGlobalEventListeners();
    this.setupNavigation();
    this.setupThemeToggle();
    this.setupDemoMode();
    this.setupOfflineHandling();
    this.setupServiceWorker();
    this.initializePage();
  }

  // Page Detection
  getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page.replace('.html', '') || 'index';
  }

  // Global Event Listeners
  setupGlobalEventListeners() {
    // Handle online/offline status
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.handleOnlineStatus();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.handleOfflineStatus();
    });

    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.handlePageVisible();
      }
    });

    // Handle storage events from other tabs
    window.addEventListener('storage', (e) => {
      this.handleStorageChange(e);
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
      // Don't show error to user for now, just log it
    });

    // Handle errors
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
      // Could implement error reporting here
    });
  }

  // Navigation Setup
  setupNavigation() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Update icon
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.className = navMenu.classList.contains('active') 
            ? 'ri-close-line' 
            : 'ri-menu-line';
        }
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
          navMenu.classList.remove('active');
          const icon = navToggle.querySelector('i');
          if (icon) {
            icon.className = 'ri-menu-line';
          }
        }
      });

      // Close mobile menu when clicking on links
      navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          const icon = navToggle.querySelector('i');
          if (icon) {
            icon.className = 'ri-menu-line';
          }
        });
      });
    }

    // Update cart badge on page load
    this.updateCartBadge();
  }

  // Theme Toggle
  setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    document.body.className = `theme-${currentTheme}`;
    
    if (themeToggle) {
      themeToggle.checked = currentTheme === 'dark';
      
      themeToggle.addEventListener('change', () => {
        const theme = themeToggle.checked ? 'dark' : 'light';
        document.body.className = `theme-${theme}`;
        localStorage.setItem('theme', theme);
      });
    }
  }

  // Demo Mode
  setupDemoMode() {
    const demoButton = document.getElementById('demoMode');
    
    if (demoButton) {
      demoButton.addEventListener('click', () => {
        this.toggleDemoMode();
      });
      
      // Update button state
      this.updateDemoModeButton();
    }
  }

  toggleDemoMode() {
    this.demoMode = !this.demoMode;
    localStorage.setItem('demoMode', this.demoMode.toString());
    
    if (this.demoMode) {
      this.startDemoMode();
      UI.showToast('Demo mode activated! 🎉', 'success');
    } else {
      this.stopDemoMode();
      UI.showToast('Demo mode deactivated', 'info');
    }
    
    this.updateDemoModeButton();
  }

  startDemoMode() {
    // Add some demo items to cart
    const demoItems = [
      {
        restaurantId: 'rest_001',
        restaurantName: 'Mama Cass Kitchen',
        itemId: 'item_001',
        name: 'Jollof Rice',
        price: 2500,
        image: 'https://images.pexels.com/photos/2233348/pexels-photo-2233348.jpeg?auto=compress&cs=tinysrgb&w=400',
        quantity: 2,
        addOns: {
          'Protein': [{ name: 'Chicken', price: 0 }]
        },
        specialInstructions: '',
        timestamp: Date.now()
      },
      {
        restaurantId: 'rest_003',
        restaurantName: 'Pizza Palace',
        itemId: 'item_015',
        name: 'Margherita Pizza',
        price: 4500,
        image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=400',
        quantity: 1,
        addOns: {
          'Size': [{ name: 'Medium (12")', price: 1500 }]
        },
        specialInstructions: '',
        timestamp: Date.now() + 1
      }
    ];

    // Clear existing cart and add demo items
    Cart.clear();
    demoItems.forEach(item => Cart.addItem(item));

    // Create a demo order
    const demoOrder = {
      id: 'FPW' + Date.now().toString().slice(-6) + '999',
      items: [demoItems[0]],
      address: {
        id: 'demo_addr',
        label: 'Demo Address',
        area: 'Effurun',
        street: '123 Demo Street',
        directions: 'Near the demo landmark'
      },
      schedule: 'now',
      paymentMethod: 'cash',
      deliveryNotes: 'Demo order for testing',
      subtotal: 5000,
      deliveryFee: 300,
      discount: 0,
      total: 5300,
      status: 'received',
      timestamp: Date.now() - 600000, // 10 minutes ago
      estimatedDelivery: Date.now() + 1800000 // 30 minutes from now
    };

    // Add demo order
    const orders = Store.get('orders') || [];
    orders.unshift(demoOrder);
    Store.set('orders', orders);
  }

  stopDemoMode() {
    // Clear demo data but keep user's real data
    // This is a simplified approach - in a real app you'd want more sophisticated demo data management
  }

  updateDemoModeButton() {
    const demoButton = document.getElementById('demoMode');
    if (demoButton) {
      demoButton.textContent = this.demoMode ? 'Exit Demo' : 'Demo Mode';
      demoButton.className = this.demoMode ? 'demo-mode active' : 'demo-mode';
    }
  }

  // Offline Handling
  setupOfflineHandling() {
    if (!this.isOnline) {
      this.handleOfflineStatus();
    }
  }

  handleOnlineStatus() {
    // Remove offline indicator
    const offlineIndicator = document.querySelector('.offline-indicator');
    if (offlineIndicator) {
      offlineIndicator.remove();
    }

    // Restore cart from offline storage if available
    Cart.restoreFromOffline();

    UI.showToast('You\'re back online! 🌐', 'success');
  }

  handleOfflineStatus() {
    // Show offline indicator
    if (!document.querySelector('.offline-indicator')) {
      const indicator = document.createElement('div');
      indicator.className = 'offline-indicator';
      indicator.innerHTML = `
        <div style="background: var(--warning); color: white; padding: 8px; text-align: center; font-size: 14px;">
          <i class="ri-wifi-off-line"></i>
          You're offline. Some features may not work.
        </div>
      `;
      document.body.insertBefore(indicator, document.body.firstChild);
    }

    // Save cart for offline use
    Cart.saveForOffline();

    UI.showToast('You\'re offline. Cart saved locally.', 'warning');
  }

  handlePageVisible() {
    // Refresh data when page becomes visible
    this.updateCartBadge();
    
    // Check for updates in other tabs
    const lastUpdate = localStorage.getItem('lastDataUpdate');
    const currentUpdate = Date.now();
    
    if (lastUpdate && (currentUpdate - parseInt(lastUpdate)) > 30000) { // 30 seconds
      // Data might have been updated in another tab
      window.location.reload();
    }
  }

  handleStorageChange(e) {
    // Handle changes from other tabs
    if (e.key === 'cart') {
      this.updateCartBadge();
    }
    
    if (e.key === 'theme') {
      document.body.className = `theme-${e.newValue}`;
    }
  }

  // Service Worker
  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  // Cart Badge Update
  updateCartBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const count = Cart.getItemCount();
    
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'block' : 'none';
    });
  }

  // Page Initialization
  initializePage() {
    // Page-specific initialization
    switch (this.currentPage) {
      case 'index':
        this.initHomePage();
        break;
      case 'restaurants':
        this.initRestaurantsPage();
        break;
      case 'restaurant':
        this.initRestaurantPage();
        break;
      case 'cart':
        this.initCartPage();
        break;
      case 'track':
        this.initTrackPage();
        break;
      case 'account':
        this.initAccountPage();
        break;
      case 'admin':
        this.initAdminPage();
        break;
    }

    // Common initialization for all pages
    this.setupCommonFeatures();
  }

  initHomePage() {
    // Home page specific initialization
    console.log('Initializing home page');
  }

  initRestaurantsPage() {
    // Restaurants page specific initialization
    console.log('Initializing restaurants page');
  }

  initRestaurantPage() {
    // Restaurant page specific initialization
    console.log('Initializing restaurant page');
  }

  initCartPage() {
    // Cart page specific initialization
    console.log('Initializing cart page');
  }

  initTrackPage() {
    // Track page specific initialization
    console.log('Initializing track page');
  }

  initAccountPage() {
    // Account page specific initialization
    console.log('Initializing account page');
  }

  initAdminPage() {
    // Admin page specific initialization
    console.log('Initializing admin page');
  }

  setupCommonFeatures() {
    // Setup features common to all pages
    this.setupLazyLoading();
    this.setupSmoothScrolling();
    this.setupFormEnhancements();
  }

  setupLazyLoading() {
    // Enhanced lazy loading for images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Create a new image to preload
            const newImg = new Image();
            newImg.onload = () => {
              img.src = img.dataset.src || img.src;
              img.classList.remove('lazy');
              img.classList.add('loaded');
            };
            
            newImg.onerror = () => {
              img.src = '/assets/img/placeholder.jpg'; // Fallback image
              img.classList.add('error');
            };
            
            newImg.src = img.dataset.src || img.src;
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px'
      });

      // Observe all images with loading="lazy"
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  setupSmoothScrolling() {
    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
          const headerOffset = 80; // Account for fixed header
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupFormEnhancements() {
    // Enhanced form handling
    document.querySelectorAll('form').forEach(form => {
      // Add loading states to submit buttons
      form.addEventListener('submit', (e) => {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn && !submitBtn.disabled) {
          const originalText = submitBtn.textContent;
          submitBtn.innerHTML = '<div class="loading-spinner"></div> Processing...';
          submitBtn.disabled = true;
          
          // Re-enable after 3 seconds (fallback)
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 3000);
        }
      });

      // Real-time validation
      form.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('blur', () => {
          this.validateField(field);
        });
        
        field.addEventListener('input', () => {
          // Clear error state on input
          field.classList.remove('error');
          const errorMsg = field.parentNode.querySelector('.error-message');
          if (errorMsg) {
            errorMsg.remove();
          }
        });
      });
    });
  }

  validateField(field) {
    const errors = [];
    
    // Required field validation
    if (field.hasAttribute('required') && !field.value.trim()) {
      errors.push(`${this.getFieldLabel(field)} is required`);
    }
    
    // Email validation
    if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        errors.push('Please enter a valid email address');
      }
    }
    
    // Phone validation
    if (field.type === 'tel' && field.value) {
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(field.value)) {
        errors.push('Please enter a valid phone number');
      }
    }
    
    // Password validation
    if (field.type === 'password' && field.value) {
      if (field.value.length < 6) {
        errors.push('Password must be at least 6 characters long');
      }
    }
    
    // Show/hide errors
    this.showFieldErrors(field, errors);
  }

  showFieldErrors(field, errors) {
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    
    if (errors.length > 0) {
      field.classList.add('error');
      
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = errors[0];
      errorDiv.style.cssText = `
        color: var(--danger);
        font-size: var(--font-size-xs);
        margin-top: var(--spacing-xs);
      `;
      
      field.parentNode.appendChild(errorDiv);
    } else {
      field.classList.remove('error');
    }
  }

  getFieldLabel(field) {
    const label = field.closest('.form-group')?.querySelector('label');
    return label ? label.textContent.replace('*', '').trim() : field.name || 'Field';
  }

  // Utility Methods
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  }

  formatDate(date, options = {}) {
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    
    return new Intl.DateTimeFormat('en-NG', { ...defaultOptions, ...options }).format(date);
  }

  formatTime(date) {
    return new Intl.DateTimeFormat('en-NG', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  }

  // Performance monitoring
  measurePerformance(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
  }

  // Error reporting (placeholder)
  reportError(error, context = {}) {
    console.error('Error reported:', error, context);
    // In a real app, this would send to an error reporting service
  }

  // Analytics (placeholder)
  trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    // In a real app, this would send to an analytics service
  }

  // App state management
  getAppState() {
    return {
      currentPage: this.currentPage,
      isOnline: this.isOnline,
      demoMode: this.demoMode,
      cartItemCount: Cart.getItemCount(),
      user: Store.getCurrentUser()
    };
  }
}

// Utility functions available globally
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Initialize app when DOM is ready
let app;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    app = new FoodPickApp();
  });
} else {
  app = new FoodPickApp();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FoodPickApp, debounce, throttle };
}