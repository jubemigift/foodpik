// UI.js - User Interface utilities and components
// Handles modals, toasts, loading states, and reusable UI components

class UIManager {
  constructor() {
    this.activeModals = [];
    this.toastContainer = null;
    this.confirmDialog = null;
    this.init();
  }

  init() {
    this.createToastContainer();
    this.createConfirmDialog();
    this.setupGlobalEventListeners();
  }

  // Toast Notifications
  createToastContainer() {
    if (!this.toastContainer) {
      this.toastContainer = document.createElement('div');
      this.toastContainer.id = 'toast-container';
      this.toastContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 3000;
        pointer-events: none;
      `;
      document.body.appendChild(this.toastContainer);
    }
  }

  showToast(message, type = 'info', duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toast.style.pointerEvents = 'auto';
    
    this.toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);

    // Click to dismiss
    toast.addEventListener('click', () => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    });
  }

  // Confirm Dialog
  createConfirmDialog() {
    if (!this.confirmDialog) {
      this.confirmDialog = document.createElement('div');
      this.confirmDialog.className = 'confirm-dialog';
      this.confirmDialog.innerHTML = `
        <div class="confirm-content">
          <h3 id="confirmTitle">Confirm Action</h3>
          <p id="confirmMessage">Are you sure?</p>
          <div class="confirm-actions">
            <button class="btn btn-outline" id="confirmCancel">Cancel</button>
            <button class="btn btn-primary" id="confirmOk">Confirm</button>
          </div>
        </div>
      `;
      document.body.appendChild(this.confirmDialog);

      // Event listeners
      this.confirmDialog.querySelector('#confirmCancel').addEventListener('click', () => {
        this.hideConfirm();
      });

      this.confirmDialog.addEventListener('click', (e) => {
        if (e.target === this.confirmDialog) {
          this.hideConfirm();
        }
      });
    }
  }

  showConfirm(message, onConfirm, title = 'Confirm Action') {
    const titleEl = this.confirmDialog.querySelector('#confirmTitle');
    const messageEl = this.confirmDialog.querySelector('#confirmMessage');
    const okBtn = this.confirmDialog.querySelector('#confirmOk');

    titleEl.textContent = title;
    messageEl.textContent = message;

    // Remove previous listeners
    const newOkBtn = okBtn.cloneNode(true);
    okBtn.parentNode.replaceChild(newOkBtn, okBtn);

    // Add new listener
    newOkBtn.addEventListener('click', () => {
      this.hideConfirm();
      if (onConfirm) onConfirm();
    });

    this.confirmDialog.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  hideConfirm() {
    this.confirmDialog.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Modal Management
  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      this.activeModals.push(modalId);
      document.body.style.overflow = 'hidden';
      
      // Focus first input
      const firstInput = modal.querySelector('input, textarea, select');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      this.activeModals = this.activeModals.filter(id => id !== modalId);
      
      if (this.activeModals.length === 0) {
        document.body.style.overflow = '';
      }
    }
  }

  closeAllModals() {
    this.activeModals.forEach(modalId => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove('active');
      }
    });
    this.activeModals = [];
    document.body.style.overflow = '';
  }

  // Loading States
  showLoading(element, text = 'Loading...') {
    if (typeof element === 'string') {
      element = document.getElementById(element);
    }
    
    if (element) {
      element.innerHTML = `
        <div class="loading-state">
          <div class="loading-spinner"></div>
          <span>${text}</span>
        </div>
      `;
    }
  }

  hideLoading(element) {
    if (typeof element === 'string') {
      element = document.getElementById(element);
    }
    
    if (element) {
      const loadingState = element.querySelector('.loading-state');
      if (loadingState) {
        loadingState.remove();
      }
    }
  }

  // Skeleton Loading
  createSkeleton(type = 'text', count = 3) {
    let skeletonHTML = '';
    
    for (let i = 0; i < count; i++) {
      switch (type) {
        case 'text':
          skeletonHTML += '<div class="skeleton skeleton-text"></div>';
          break;
        case 'image':
          skeletonHTML += '<div class="skeleton skeleton-image"></div>';
          break;
        case 'card':
          skeletonHTML += `
            <div class="skeleton-card">
              <div class="skeleton skeleton-image"></div>
              <div class="skeleton skeleton-text"></div>
              <div class="skeleton skeleton-text"></div>
            </div>
          `;
          break;
      }
    }
    
    return skeletonHTML;
  }

  // Restaurant Card Component
  renderRestaurantCard(restaurant) {
    const isOpen = this.isRestaurantOpen(restaurant);
    const deliveryFeeText = restaurant.deliveryFee === 0 ? 'Free delivery' : `₦${restaurant.deliveryFee} delivery`;
    
    return `
      <div class="restaurant-card" onclick="window.location.href='/restaurant.html?id=${restaurant.id}'">
        <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-image" loading="lazy">
        <div class="restaurant-info">
          <h3 class="restaurant-name">${restaurant.name}</h3>
          <div class="restaurant-meta">
            <span class="rating">
              ${this.renderRating(restaurant.rating)}
              <span class="rating-text">(${restaurant.reviews})</span>
            </span>
            <span class="delivery-time">
              <i class="ri-time-line"></i>
              ${restaurant.deliveryTime} mins
            </span>
            <span class="delivery-fee">
              <i class="ri-truck-line"></i>
              ${deliveryFeeText}
            </span>
            <span class="area">
              <i class="ri-map-pin-line"></i>
              ${restaurant.area}
            </span>
            <span class="status ${isOpen ? 'open' : 'open'}">
              ${isOpen ? 'Open' : 'open'}
            </span>
          </div>
          <div class="restaurant-cuisines">
            ${restaurant.cuisines.map(cuisine => 
              `<span class="cuisine-tag">${cuisine}</span>`
            ).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // Rating Stars Component
  renderRating(rating, maxStars = 5) {
    let starsHTML = '<div class="rating-stars">';
    
    for (let i = 1; i <= maxStars; i++) {
      if (i <= Math.floor(rating)) {
        starsHTML += '<span class="star">★</span>';
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        starsHTML += '<span class="star half">★</span>';
      } else {
        starsHTML += '<span class="star empty">☆</span>';
      }
    }
    
    starsHTML += '</div>';
    return starsHTML;
  }

  // Form Validation
  validateForm(formElement) {
    const errors = [];
    const inputs = formElement.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        errors.push(`${this.getFieldLabel(input)} is required`);
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
      
      // Email validation
      if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          errors.push('Please enter a valid email address');
          input.classList.add('error');
        }
      }
      
      // Phone validation
      if (input.type === 'tel' && input.value) {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(input.value)) {
          errors.push('Please enter a valid phone number');
          input.classList.add('error');
        }
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  getFieldLabel(input) {
    const label = input.closest('.form-group')?.querySelector('label');
    return label ? label.textContent.replace('*', '').trim() : input.name || 'Field';
  }

  // Utility Functions
  isRestaurantOpen(restaurant) {
    const now = new Date();
    const day = now.toLocaleDateString('en', { weekday: 'short' }).toLowerCase();
    const time = now.getHours() * 100 + now.getMinutes();
    
    const hours = restaurant.hours[day];
    if (!hours || hours === 'open') return false;
    
    const [open, close] = hours.split(' - ').map(t => {
      const [hour, minute] = t.split(':').map(Number);
      return hour * 100 + minute;
    });
    
    return time >= open && time <= close;
  }

  formatPrice(price) {
    return `₦${price.toLocaleString()}`;
  }

  formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-NG', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  // Debounce utility
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle utility
  throttle(func, limit) {
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

  // Smooth scroll to element
  scrollToElement(element, offset = 0) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Copy to clipboard
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showToast('Copied to clipboard!', 'success');
      return true;
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        this.showToast('Copied to clipboard!', 'success');
        return true;
      } catch (fallbackErr) {
        this.showToast('Failed to copy to clipboard', 'error');
        return false;
      } finally {
        document.body.removeChild(textArea);
      }
    }
  }

  // Setup global event listeners
  setupGlobalEventListeners() {
    // Close modals on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.activeModals.length > 0) {
          this.closeModal(this.activeModals[this.activeModals.length - 1]);
        }
        if (this.confirmDialog.classList.contains('active')) {
          this.hideConfirm();
        }
      }
    });

    // Close modals on backdrop click
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        const modalId = e.target.id;
        if (modalId) {
          this.closeModal(modalId);
        }
      }
    });

    // Form validation on submit
    document.addEventListener('submit', (e) => {
      const form = e.target;
      if (form.classList.contains('validate')) {
        const validation = this.validateForm(form);
        if (!validation.isValid) {
          e.preventDefault();
          this.showToast(validation.errors[0], 'error');
        }
      }
    });

    // Auto-resize textareas
    document.addEventListener('input', (e) => {
      if (e.target.tagName === 'TEXTAREA') {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
      }
    });
  }

  // Image lazy loading
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Animate elements on scroll
  setupScrollAnimations() {
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, {
        threshold: 0.1
      });

      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animationObserver.observe(el);
      });
    }
  }

  // Initialize all UI features
  initializeAll() {
    this.setupLazyLoading();
    this.setupScrollAnimations();
  }
}

// Create global instance
const UI = new UIManager();

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    UI.initializeAll();
  });
} else {
  UI.initializeAll();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UI;
}