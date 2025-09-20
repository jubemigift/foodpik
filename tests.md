# FoodPick Warri - Manual Testing Checklist

## Overview
This document provides a comprehensive manual testing checklist for the FoodPick Warri food delivery application. Follow these test cases to verify all functionality works as expected.

## Test Environment Setup
1. Open the application in a modern web browser (Chrome, Firefox, Safari, Edge)
2. Ensure JavaScript is enabled
3. Clear browser cache and localStorage before starting tests
4. Test on both desktop and mobile viewports

## 1. Landing Page (index.html)

### Navigation
- [ ] Logo and brand name display correctly
- [ ] All navigation links are clickable and lead to correct pages
- [ ] Mobile hamburger menu works on small screens
- [ ] Cart badge shows "0" initially
- [ ] Theme toggle works (dark/light mode)

### Hero Section
- [ ] Hero title and subtitle display correctly
- [ ] Search bar accepts input
- [ ] Search button redirects to restaurants page with query
- [ ] Quick filter chips redirect to restaurants page with cuisine filter
- [ ] "Find Restaurants" and "Track Order" buttons work

### Featured Restaurants
- [ ] Restaurant cards display with images, names, ratings, and metadata
- [ ] Clicking a restaurant card navigates to restaurant detail page
- [ ] "View All Restaurants" button works

### How It Works Section
- [ ] Three steps display with icons and descriptions
- [ ] Section is responsive on mobile

### Footer
- [ ] All footer links are present
- [ ] Demo Mode button toggles demo functionality
- [ ] Theme toggle works in footer

## 2. Restaurants Page (restaurants.html)

### Filters Sidebar
- [ ] Filters sidebar displays on desktop
- [ ] Mobile filters toggle button shows/hides sidebar on mobile
- [ ] Area checkboxes filter restaurants correctly
- [ ] Delivery time slider updates results
- [ ] Price range checkboxes work
- [ ] Rating filter works
- [ ] "Clear All" button resets all filters
- [ ] "Apply Filters" button applies selected filters

### Search and Controls
- [ ] Search input filters restaurants by name and cuisine
- [ ] Sort dropdown changes restaurant order
- [ ] Cuisine dropdown filters by cuisine type
- [ ] Results info shows correct count

### Restaurant Grid
- [ ] Restaurants display in grid layout
- [ ] Each card shows image, name, rating, delivery time, area, status
- [ ] Open/Closed status displays correctly
- [ ] Clicking a card navigates to restaurant detail page

### Pagination
- [ ] Pagination appears when there are many results
- [ ] Page numbers work correctly
- [ ] Previous/Next buttons work

### URL Parameters
- [ ] Search query in URL populates search field
- [ ] Cuisine parameter in URL applies cuisine filter
- [ ] Filters update URL parameters

## 3. Restaurant Detail Page (restaurant.html)

### Restaurant Header
- [ ] Banner image displays
- [ ] Restaurant logo, name, area, rating display
- [ ] Delivery time and open/closed status show
- [ ] Cuisine tags display

### Menu Categories Sidebar
- [ ] Categories list displays
- [ ] Clicking category scrolls to menu section
- [ ] Item counts show for each category

### Menu Display
- [ ] Menu items display by category
- [ ] Each item shows name, description, price, image
- [ ] Dietary badges (vegan, halal, spicy) display when applicable
- [ ] "Customizable" text shows for items with add-ons

### Add to Cart Modal
- [ ] Clicking menu item opens add to cart modal
- [ ] Item details populate correctly
- [ ] Add-ons display with radio buttons and checkboxes
- [ ] Required add-ons are enforced
- [ ] Quantity controls work
- [ ] Special instructions field accepts input
- [ ] Price updates with add-ons and quantity
- [ ] "Add to Cart" button adds item and closes modal

### Mini Cart (Desktop)
- [ ] Mini cart shows added items
- [ ] Quantities and prices display correctly
- [ ] "Go to Cart" button works
- [ ] Updates in real-time when items added

### Mobile Cart Drawer
- [ ] Cart button appears at bottom on mobile when items added
- [ ] Clicking opens cart drawer
- [ ] Drawer shows cart items and total
- [ ] "Go to Cart" button works

### Tabs
- [ ] Menu, Info, and Reviews tabs switch correctly
- [ ] Info tab shows restaurant details, hours, contact info
- [ ] Reviews tab shows mock reviews with ratings

## 4. Cart Page (cart.html)

### Cart Items
- [ ] All cart items display with images, names, quantities, prices
- [ ] Items grouped by restaurant
- [ ] Quantity controls (+/-) work
- [ ] Remove item button works
- [ ] "Clear Cart" button empties cart
- [ ] Add-ons and special instructions display

### Delivery Details
- [ ] Address selection shows saved addresses
- [ ] "Add New Address" opens modal
- [ ] Address modal saves new addresses
- [ ] Delivery time options work (ASAP vs scheduled)
- [ ] Delivery notes field accepts input

### Payment Methods
- [ ] Payment options display (Cash, Transfer, Card disabled)
- [ ] Selection works correctly

### Order Summary
- [ ] Subtotal calculates correctly
- [ ] Delivery fee calculates based on area
- [ ] Promo code section works
- [ ] Valid promo codes apply discount
- [ ] Invalid promo codes show error
- [ ] Total calculates correctly
- [ ] "Place Order" button disabled without address
- [ ] "Place Order" creates order and redirects to tracking

### Promo Codes
Test these demo codes:
- [ ] WARRI10 - 10% off orders over ₦2000
- [ ] FIRSTORDER - 15% off orders over ₦1500
- [ ] LUNCH20 - 20% off orders over ₦3000

### Empty Cart
- [ ] Empty cart shows appropriate message and "Browse Restaurants" button

## 5. Order Tracking Page (track.html)

### Order ID Input
- [ ] Input field accepts order ID
- [ ] "Track Order" button searches for order
- [ ] Invalid order ID shows "not found" message

### Order Tracking Display
- [ ] Order header shows ID, time, total, ETA
- [ ] Status timeline displays with current status highlighted
- [ ] Order items list shows all items with quantities and prices
- [ ] Delivery details show address and payment method
- [ ] Support buttons (Call, WhatsApp) have correct links

### Demo Mode
- [ ] Demo mode creates sample order
- [ ] Status updates automatically every 4 seconds in demo mode
- [ ] All status stages progress correctly

### URL Parameters
- [ ] Order ID in URL automatically loads tracking
- [ ] "Track Another Order" button clears URL and shows input

## 6. Account Page (account.html)

### Guest User (Not Logged In)
- [ ] Login and Register tabs display
- [ ] Login form accepts email and password
- [ ] Register form validates all required fields
- [ ] Password confirmation validation works
- [ ] Demo login button works with any credentials
- [ ] Terms and conditions checkbox required for registration

### Logged In User
- [ ] Profile, Addresses, and Order History tabs display
- [ ] Profile tab shows user information
- [ ] Profile form updates user data
- [ ] Account statistics display correctly
- [ ] Logout button works

### Addresses Tab
- [ ] Saved addresses display
- [ ] "Add New Address" creates new address
- [ ] Edit and delete buttons work
- [ ] Empty state shows when no addresses

### Order History Tab
- [ ] Past orders display with details
- [ ] Order status badges show correctly
- [ ] "Track Order" links work
- [ ] "Reorder" button adds items to cart
- [ ] Empty state shows when no orders

## 7. Admin Dashboard (admin.html)

### Admin Login
- [ ] Login form requires username and password
- [ ] Demo credentials (admin/admin123) work
- [ ] Invalid credentials show error message

### Dashboard Overview
- [ ] Statistics cards display with correct data
- [ ] Charts render (orders and revenue)
- [ ] Recent orders table shows data

### Restaurant Management
- [ ] Restaurant list displays with all details
- [ ] "Add Restaurant" opens modal
- [ ] Restaurant form saves new restaurants
- [ ] Edit and delete buttons work
- [ ] Form validation works

### Menu Management
- [ ] Restaurant filter works
- [ ] Menu items display by restaurant and category
- [ ] "Add Menu Item" opens modal
- [ ] Menu item form saves correctly
- [ ] Edit and delete menu items work

### Order Management
- [ ] Orders list displays with status
- [ ] Status filter dropdown works
- [ ] Status update dropdowns change order status
- [ ] Order details view works (if implemented)

### Coupon Management
- [ ] Coupons display in grid
- [ ] "Add Coupon" opens modal
- [ ] Coupon form saves with validation
- [ ] Edit and delete coupons work
- [ ] Expiry date validation works

## 8. Progressive Web App (PWA) Features

### Installation
- [ ] Browser shows "Install App" prompt
- [ ] App installs and launches in standalone mode
- [ ] App icon appears in device app drawer/home screen

### Offline Functionality
- [ ] App loads when offline
- [ ] Cart data persists offline
- [ ] Offline indicator shows when disconnected
- [ ] Data syncs when back online

### Service Worker
- [ ] Service worker registers successfully (check browser dev tools)
- [ ] Static files cache correctly
- [ ] Dynamic content caches on demand

## 9. Responsive Design

### Mobile (320px - 768px)
- [ ] Navigation collapses to hamburger menu
- [ ] All pages are scrollable and readable
- [ ] Touch targets are appropriately sized
- [ ] Forms are easy to use on mobile
- [ ] Restaurant cards stack vertically
- [ ] Cart drawer works on mobile

### Tablet (768px - 1024px)
- [ ] Layout adapts appropriately
- [ ] Sidebar filters work correctly
- [ ] Grid layouts adjust column count

### Desktop (1024px+)
- [ ] Full layout displays correctly
- [ ] Sidebars and multi-column layouts work
- [ ] Hover states work on interactive elements

## 10. Performance and Accessibility

### Performance
- [ ] Pages load quickly (under 3 seconds)
- [ ] Images load progressively
- [ ] No JavaScript errors in console
- [ ] Smooth scrolling and animations

### Accessibility
- [ ] All images have alt text
- [ ] Forms have proper labels
- [ ] Keyboard navigation works
- [ ] Color contrast is sufficient
- [ ] Screen reader compatibility (test with screen reader if available)

## 11. Data Persistence

### LocalStorage
- [ ] Cart persists across page refreshes
- [ ] User login state persists
- [ ] Addresses save correctly
- [ ] Orders save and display
- [ ] Theme preference persists

### Data Integrity
- [ ] No data loss during normal usage
- [ ] Concurrent tab usage works correctly
- [ ] Data updates reflect across tabs

## 12. Error Handling

### Network Errors
- [ ] Graceful handling of offline state
- [ ] Error messages for failed requests
- [ ] Retry mechanisms work

### User Input Errors
- [ ] Form validation shows helpful messages
- [ ] Invalid data handled gracefully
- [ ] Required field validation works

### Edge Cases
- [ ] Empty states display correctly
- [ ] Large orders handle properly
- [ ] Special characters in input fields work
- [ ] Very long text doesn't break layout

## Demo Mode Testing

### Activation
- [ ] Demo mode toggle works
- [ ] Demo data populates correctly
- [ ] Demo order creates and tracks

### Demo Features
- [ ] Sample cart items added
- [ ] Demo order progresses through statuses
- [ ] All demo functionality works as expected
- [ ] Exit demo mode cleans up properly

## Browser Compatibility

Test in multiple browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## Final Checklist

- [ ] All core user flows work end-to-end
- [ ] No critical bugs or broken functionality
- [ ] Performance is acceptable
- [ ] Design is consistent and polished
- [ ] PWA features work correctly
- [ ] Data persists correctly
- [ ] Error handling is graceful
- [ ] Responsive design works on all screen sizes

## Notes

Record any issues found during testing:

1. **Issue**: [Description]
   **Severity**: [High/Medium/Low]
   **Steps to reproduce**: [Steps]
   **Expected**: [Expected behavior]
   **Actual**: [Actual behavior]

2. **Issue**: [Description]
   **Severity**: [High/Medium/Low]
   **Steps to reproduce**: [Steps]
   **Expected**: [Expected behavior]
   **Actual**: [Actual behavior]

---

**Testing completed by**: [Name]
**Date**: [Date]
**Browser/Device**: [Browser and device information]
**Overall Status**: [Pass/Fail with notes]