// Mock data for FoodPick Warri
// This file contains all the seed data for restaurants, menus, coupons, etc.

// Warri areas
const WARRI_AREAS = [
  'Effurun',
  'Enerhen', 
  'PTI Road',
  'Jakpa Road',
  'Airport Road',
  'Ekpan',
  'Ugbuwangue',
  'Ugborikoko'
];

// Sample restaurants data
const RESTAURANTS_DATA = [
  {
    id: 'rest_001',
    name: 'Mama Cass Kitchen',
    area: 'Effurun',
    description: 'Authentic Nigerian cuisine with a modern twist. Famous for our jollof rice and grilled fish.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    logo: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200',
    phone: '+234 803 123 4567',
    address: '15 Effurun-Sapele Road, Effurun',
    cuisines: ['Nigerian', 'Continental'],
    rating: 4.5,
    reviews: 234,
    deliveryTime: 30,
    deliveryFee: 300,
    minOrder: 1500,
    isOpen: true,
    priceRange: 'moderate',
    hours: {
      mon: '09:00 - 22:00',
      tue: '09:00 - 22:00', 
      wed: '09:00 - 22:00',
      thu: '09:00 - 22:00',
      fri: '09:00 - 23:00',
      sat: '09:00 - 23:00',
      sun: '10:00 - 21:00'
    }
  },
  {
    id: 'rest_002',
    name: 'Golden Dragon Chinese',
    area: 'Enerhen',
    description: 'Authentic Chinese cuisine in the heart of Warri. Fresh ingredients, traditional recipes.',
    image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=800',
    logo: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=200',
    phone: '+234 805 234 5678',
    address: '8 Enerhen Junction, Enerhen',
    cuisines: ['Chinese', 'Asian'],
    rating: 4.2,
    reviews: 156,
    deliveryTime: 35,
    deliveryFee: 400,
    minOrder: 2000,
    isOpen: true,
    priceRange: 'moderate',
    hours: {
      mon: '11:00 - 22:00',
      tue: '11:00 - 22:00',
      wed: '11:00 - 22:00', 
      thu: '11:00 - 22:00',
      fri: '11:00 - 23:00',
      sat: '11:00 - 23:00',
      sun: '12:00 - 21:00'
    }
  },
  {
    id: 'rest_003',
    name: 'Pizza Palace',
    area: 'PTI Road',
    description: 'Wood-fired pizzas and Italian favorites. Fresh dough made daily, premium toppings.',
    image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=800',
    logo: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=200',
    phone: '+234 807 345 6789',
    address: '22 PTI Road, Warri',
    cuisines: ['Italian', 'Pizza', 'Continental'],
    rating: 4.7,
    reviews: 189,
    deliveryTime: 25,
    deliveryFee: 500,
    minOrder: 1800,
    isOpen: true,
    priceRange: 'premium',
    hours: {
      mon: '12:00 - 23:00',
      tue: '12:00 - 23:00',
      wed: '12:00 - 23:00',
      thu: '12:00 - 23:00',
      fri: '12:00 - 00:00',
      sat: '12:00 - 00:00',
      sun: '14:00 - 22:00'
    }
  },
  {
    id: 'rest_004',
    name: 'Buka Express',
    area: 'Jakpa Road',
    description: 'Fast Nigerian food done right. Traditional recipes, quick service, great prices.',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800',
    logo: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=200',
    phone: '+234 809 456 7890',
    address: '45 Jakpa Road, Warri',
    cuisines: ['Nigerian', 'Fast Food'],
    rating: 4.1,
    reviews: 298,
    deliveryTime: 20,
    deliveryFee: 300,
    minOrder: 1000,
    isOpen: true,
    priceRange: 'budget',
    hours: {
      mon: '08:00 - 22:00',
      tue: '08:00 - 22:00',
      wed: '08:00 - 22:00',
      thu: '08:00 - 22:00',
      fri: '08:00 - 23:00',
      sat: '08:00 - 23:00',
      sun: '09:00 - 21:00'
    }
  },
  {
    id: 'rest_005',
    name: 'Shawarma King',
    area: 'Airport Road',
    description: 'The best shawarma in Warri! Fresh ingredients, authentic Middle Eastern flavors.',
    image: 'https://images.pexels.com/photos/2233348/pexels-photo-2233348.jpeg?auto=compress&cs=tinysrgb&w=800',
    logo: 'https://images.pexels.com/photos/2233348/pexels-photo-2233348.jpeg?auto=compress&cs=tinysrgb&w=200',
    phone: '+234 811 567 8901',
    address: '12 Airport Road, Warri',
    cuisines: ['Middle Eastern', 'Fast Food'],
    rating: 4.6,
    reviews: 167,
    deliveryTime: 15,
    deliveryFee: 400,
    minOrder: 1200,
    isOpen: true,
    priceRange: 'budget',
    hours: {
      mon: '10:00 - 23:00',
      tue: '10:00 - 23:00',
      wed: '10:00 - 23:00',
      thu: '10:00 - 23:00',
      fri: '10:00 - 00:00',
      sat: '10:00 - 00:00',
      sun: '12:00 - 22:00'
    }
  },
  {
    id: 'rest_006',
    name: 'Ocean View Seafood',
    area: 'Ekpan',
    description: 'Fresh seafood daily. Grilled fish, pepper soup, and coastal delicacies.',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800',
    logo: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=200',
    phone: '+234 813 678 9012',
    address: '7 Ekpan Roundabout, Ekpan',
    cuisines: ['Seafood', 'Nigerian'],
    rating: 4.4,
    reviews: 145,
    deliveryTime: 40,
    deliveryFee: 600,
    minOrder: 2500,
    isOpen: true,
    priceRange: 'premium',
    hours: {
      mon: '11:00 - 22:00',
      tue: '11:00 - 22:00',
      wed: '11:00 - 22:00',
      thu: '11:00 - 22:00',
      fri: '11:00 - 23:00',
      sat: '11:00 - 23:00',
      sun: '13:00 - 21:00'
    }
  },
  {
    id: 'rest_007',
    name: 'Sweet Treats Bakery',
    area: 'Ugbuwangue',
    description: 'Fresh pastries, cakes, and baked goods. Perfect for breakfast or dessert.',
    image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=800',
    logo: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=200',
    phone: '+234 815 789 0123',
    address: '3 Ugbuwangue Market Road, Ugbuwangue',
    cuisines: ['Pastries', 'Bakery', 'Desserts'],
    rating: 4.3,
    reviews: 89,
    deliveryTime: 25,
    deliveryFee: 350,
    minOrder: 800,
    isOpen: true,
    priceRange: 'budget',
    hours: {
      mon: '06:00 - 20:00',
      tue: '06:00 - 20:00',
      wed: '06:00 - 20:00',
      thu: '06:00 - 20:00',
      fri: '06:00 - 21:00',
      sat: '06:00 - 21:00',
      sun: '07:00 - 19:00'
    }
  },
  {
    id: 'rest_008',
    name: 'Spice Garden',
    area: 'Ugborikoko',
    description: 'Exotic spices and traditional Nigerian soups. Home-style cooking at its finest.',
    image: 'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg?auto=compress&cs=tinysrgb&w=800',
    logo: 'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg?auto=compress&cs=tinysrgb&w=200',
    phone: '+234 817 890 1234',
    address: '18 Ugborikoko Junction, Ugborikoko',
    cuisines: ['Nigerian', 'Soups', 'Traditional'],
    rating: 4.8,
    reviews: 203,
    deliveryTime: 45,
    deliveryFee: 500,
    minOrder: 2000,
    isOpen: true,
    priceRange: 'moderate',
    hours: {
      mon: '10:00 - 21:00',
      tue: '10:00 - 21:00',
      wed: '10:00 - 21:00',
      thu: '10:00 - 21:00',
      fri: '10:00 - 22:00',
      sat: '10:00 - 22:00',
      sun: '11:00 - 20:00'
    }
  }
];

// Sample menu data organized by restaurant
const MENUS_DATA = {
  'rest_001': { // Mama Cass Kitchen
    'Rice Dishes': [
      {
        id: 'item_001',
        name: 'Jollof Rice',
        description: 'Our signature jollof rice cooked with fresh tomatoes, peppers, and aromatic spices',
        price: 2500,
        image: 'https://images.pexels.com/photos/2233348/pexels-photo-2233348.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['halal'],
        addOns: [
          {
            name: 'Protein',
            type: 'radio',
            required: true,
            options: [
              { name: 'Chicken', price: 0 },
              { name: 'Beef', price: 500 },
              { name: 'Fish', price: 800 }
            ]
          },
          {
            name: 'Extras',
            type: 'checkbox',
            required: false,
            options: [
              { name: 'Extra Meat', price: 1000 },
              { name: 'Plantain', price: 500 },
              { name: 'Coleslaw', price: 300 }
            ]
          }
        ]
      },
      {
        id: 'item_002',
        name: 'Fried Rice',
        description: 'Colorful fried rice with mixed vegetables, liver, and your choice of protein',
        price: 2800,
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['halal'],
        addOns: [
          {
            name: 'Protein',
            type: 'radio',
            required: true,
            options: [
              { name: 'Chicken', price: 0 },
              { name: 'Beef', price: 500 },
              { name: 'Fish', price: 800 }
            ]
          }
        ]
      },
      {
        id: 'item_003',
        name: 'Coconut Rice',
        description: 'Fragrant rice cooked in coconut milk with curry and mixed vegetables',
        price: 3000,
        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['vegan'],
        addOns: [
          {
            name: 'Protein',
            type: 'radio',
            required: false,
            options: [
              { name: 'Grilled Chicken', price: 1200 },
              { name: 'Grilled Fish', price: 1500 }
            ]
          }
        ]
      }
    ],
    'Grills': [
      {
        id: 'item_004',
        name: 'Grilled Fish',
        description: 'Fresh tilapia grilled to perfection with our special spice blend',
        price: 4500,
        image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['halal'],
        addOns: [
          {
            name: 'Sides',
            type: 'checkbox',
            required: false,
            options: [
              { name: 'Jollof Rice', price: 1500 },
              { name: 'Fried Plantain', price: 800 },
              { name: 'Yam Chips', price: 1000 }
            ]
          }
        ]
      },
      {
        id: 'item_005',
        name: 'Suya',
        description: 'Spicy grilled beef skewers with traditional suya spice',
        price: 2000,
        image: 'https://images.pexels.com/photos/2233348/pexels-photo-2233348.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['spicy', 'halal'],
        addOns: [
          {
            name: 'Spice Level',
            type: 'radio',
            required: true,
            options: [
              { name: 'Mild', price: 0 },
              { name: 'Medium', price: 0 },
              { name: 'Hot', price: 0 },
              { name: 'Extra Hot', price: 0 }
            ]
          }
        ]
      }
    ],
    'Soups': [
      {
        id: 'item_006',
        name: 'Banga Soup',
        description: 'Traditional palm nut soup with assorted meat and fish',
        price: 3500,
        image: 'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['spicy'],
        addOns: [
          {
            name: 'Swallow',
            type: 'radio',
            required: true,
            options: [
              { name: 'Pounded Yam', price: 1000 },
              { name: 'Eba', price: 800 },
              { name: 'Fufu', price: 900 }
            ]
          }
        ]
      }
    ],
    'Drinks': [
      {
        id: 'item_007',
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed orange juice',
        price: 800,
        image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['vegan']
      },
      {
        id: 'item_008',
        name: 'Chapman',
        description: 'Nigerian cocktail with mixed fruits and spices',
        price: 1200,
        image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: []
      }
    ]
  },
  'rest_002': { // Golden Dragon Chinese
    'Noodles': [
      {
        id: 'item_009',
        name: 'Chicken Chow Mein',
        description: 'Stir-fried noodles with chicken and mixed vegetables',
        price: 3200,
        image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: [],
        addOns: [
          {
            name: 'Spice Level',
            type: 'radio',
            required: true,
            options: [
              { name: 'Mild', price: 0 },
              { name: 'Medium', price: 0 },
              { name: 'Spicy', price: 0 }
            ]
          }
        ]
      },
      {
        id: 'item_010',
        name: 'Beef Lo Mein',
        description: 'Soft noodles with tender beef and vegetables in savory sauce',
        price: 3500,
        image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: [],
        addOns: [
          {
            name: 'Extra Vegetables',
            type: 'checkbox',
            required: false,
            options: [
              { name: 'Broccoli', price: 300 },
              { name: 'Carrots', price: 200 },
              { name: 'Bell Peppers', price: 250 }
            ]
          }
        ]
      }
    ],
    'Rice': [
      {
        id: 'item_011',
        name: 'Special Fried Rice',
        description: 'Chinese-style fried rice with shrimp, chicken, and mixed vegetables',
        price: 3800,
        image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: []
      },
      {
        id: 'item_012',
        name: 'Vegetable Fried Rice',
        description: 'Healthy fried rice with assorted fresh vegetables',
        price: 2800,
        image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['vegan']
      }
    ],
    'Main Dishes': [
      {
        id: 'item_013',
        name: 'Sweet & Sour Chicken',
        description: 'Crispy chicken in tangy sweet and sour sauce with pineapple',
        price: 4200,
        image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: []
      },
      {
        id: 'item_014',
        name: 'Kung Pao Chicken',
        description: 'Spicy chicken with peanuts and vegetables in Sichuan sauce',
        price: 4000,
        image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['spicy']
      }
    ]
  },
  'rest_003': { // Pizza Palace
    'Pizza': [
      {
        id: 'item_015',
        name: 'Margherita Pizza',
        description: 'Classic pizza with fresh mozzarella, tomato sauce, and basil',
        price: 4500,
        image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: [],
        addOns: [
          {
            name: 'Size',
            type: 'radio',
            required: true,
            options: [
              { name: 'Small (9")', price: 0 },
              { name: 'Medium (12")', price: 1500 },
              { name: 'Large (15")', price: 3000 }
            ]
          },
          {
            name: 'Extra Toppings',
            type: 'checkbox',
            required: false,
            options: [
              { name: 'Extra Cheese', price: 800 },
              { name: 'Pepperoni', price: 1000 },
              { name: 'Mushrooms', price: 600 },
              { name: 'Bell Peppers', price: 500 }
            ]
          }
        ]
      },
      {
        id: 'item_016',
        name: 'Pepperoni Pizza',
        description: 'Classic pepperoni pizza with mozzarella cheese',
        price: 5200,
        image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: [],
        addOns: [
          {
            name: 'Size',
            type: 'radio',
            required: true,
            options: [
              { name: 'Small (9")', price: 0 },
              { name: 'Medium (12")', price: 1500 },
              { name: 'Large (15")', price: 3000 }
            ]
          }
        ]
      },
      {
        id: 'item_017',
        name: 'Meat Lovers Pizza',
        description: 'Loaded with pepperoni, sausage, bacon, and ham',
        price: 6500,
        image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: [],
        addOns: [
          {
            name: 'Size',
            type: 'radio',
            required: true,
            options: [
              { name: 'Small (9")', price: 0 },
              { name: 'Medium (12")', price: 1500 },
              { name: 'Large (15")', price: 3000 }
            ]
          }
        ]
      }
    ],
    'Pasta': [
      {
        id: 'item_018',
        name: 'Spaghetti Bolognese',
        description: 'Classic spaghetti with rich meat sauce',
        price: 3800,
        image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: []
      },
      {
        id: 'item_019',
        name: 'Chicken Alfredo',
        description: 'Creamy alfredo pasta with grilled chicken',
        price: 4200,
        image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: []
      }
    ]
  },
  'rest_004': { // Buka Express
    'Rice': [
      {
        id: 'item_020',
        name: 'Jollof Rice & Chicken',
        description: 'Quick serve jollof rice with fried chicken',
        price: 1800,
        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['halal']
      },
      {
        id: 'item_021',
        name: 'Fried Rice Combo',
        description: 'Fried rice with chicken and plantain',
        price: 2000,
        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['halal']
      }
    ],
    'Fast Food': [
      {
        id: 'item_022',
        name: 'Chicken & Chips',
        description: 'Crispy fried chicken with seasoned potato chips',
        price: 2200,
        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: []
      },
      {
        id: 'item_023',
        name: 'Meat Pie',
        description: 'Flaky pastry filled with seasoned minced meat',
        price: 800,
        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: []
      }
    ]
  },
  'rest_005': { // Shawarma King
    'Shawarma': [
      {
        id: 'item_024',
        name: 'Chicken Shawarma',
        description: 'Tender chicken with vegetables and sauce in pita bread',
        price: 1500,
        image: 'https://images.pexels.com/photos/2233348/pexels-photo-2233348.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['halal'],
        addOns: [
          {
            name: 'Size',
            type: 'radio',
            required: true,
            options: [
              { name: 'Regular', price: 0 },
              { name: 'Large', price: 500 }
            ]
          },
          {
            name: 'Extras',
            type: 'checkbox',
            required: false,
            options: [
              { name: 'Extra Meat', price: 800 },
              { name: 'Extra Sauce', price: 200 },
              { name: 'Cheese', price: 300 }
            ]
          }
        ]
      },
      {
        id: 'item_025',
        name: 'Beef Shawarma',
        description: 'Juicy beef with fresh vegetables and tahini sauce',
        price: 1800,
        image: 'https://images.pexels.com/photos/2233348/pexels-photo-2233348.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['halal'],
        addOns: [
          {
            name: 'Size',
            type: 'radio',
            required: true,
            options: [
              { name: 'Regular', price: 0 },
              { name: 'Large', price: 500 }
            ]
          }
        ]
      }
    ],
    'Sides': [
      {
        id: 'item_026',
        name: 'French Fries',
        description: 'Crispy golden french fries',
        price: 800,
        image: 'https://images.pexels.com/photos/2233348/pexels-photo-2233348.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['vegan']
      }
    ]
  },
  'rest_006': { // Ocean View Seafood
    'Grilled Fish': [
      {
        id: 'item_027',
        name: 'Grilled Tilapia',
        description: 'Fresh tilapia grilled with herbs and spices',
        price: 5500,
        image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['halal']
      },
      {
        id: 'item_028',
        name: 'Grilled Catfish',
        description: 'Whole catfish grilled to perfection',
        price: 6000,
        image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['halal', 'spicy']
      }
    ],
    'Soups': [
      {
        id: 'item_029',
        name: 'Fish Pepper Soup',
        description: 'Spicy fish soup with traditional spices',
        price: 3500,
        image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['spicy']
      }
    ]
  },
  'rest_007': { // Sweet Treats Bakery
    'Pastries': [
      {
        id: 'item_030',
        name: 'Croissant',
        description: 'Buttery, flaky French croissant',
        price: 600,
        image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: []
      },
      {
        id: 'item_031',
        name: 'Chocolate Muffin',
        description: 'Rich chocolate muffin with chocolate chips',
        price: 800,
        image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: []
      }
    ],
    'Cakes': [
      {
        id: 'item_032',
        name: 'Chocolate Cake Slice',
        description: 'Moist chocolate cake with chocolate frosting',
        price: 1200,
        image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: []
      }
    ]
  },
  'rest_008': { // Spice Garden
    'Soups': [
      {
        id: 'item_033',
        name: 'Egusi Soup',
        description: 'Traditional melon seed soup with assorted meat',
        price: 4000,
        image: 'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['spicy'],
        addOns: [
          {
            name: 'Swallow',
            type: 'radio',
            required: true,
            options: [
              { name: 'Pounded Yam', price: 1200 },
              { name: 'Eba', price: 800 },
              { name: 'Fufu', price: 1000 },
              { name: 'Amala', price: 900 }
            ]
          }
        ]
      },
      {
        id: 'item_034',
        name: 'Ogbono Soup',
        description: 'Draw soup made with ground ogbono seeds',
        price: 3800,
        image: 'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['spicy'],
        addOns: [
          {
            name: 'Swallow',
            type: 'radio',
            required: true,
            options: [
              { name: 'Pounded Yam', price: 1200 },
              { name: 'Eba', price: 800 },
              { name: 'Fufu', price: 1000 }
            ]
          }
        ]
      },
      {
        id: 'item_035',
        name: 'Bitter Leaf Soup',
        description: 'Traditional soup with bitter leaf and assorted meat',
        price: 4200,
        image: 'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['spicy']
      }
    ],
    'Stews': [
      {
        id: 'item_036',
        name: 'Pepper Stew',
        description: 'Spicy tomato stew with assorted meat',
        price: 3000,
        image: 'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['spicy']
      }
    ]
  }
};

// Sample coupons data
const COUPONS_DATA = [
  {
    id: 'coupon_001',
    code: 'WARRI10',
    description: 'Get 10% off your order',
    discount: 10,
    minSpend: 2000,
    expiry: '2025-12-31T23:59:59.000Z'
  },
  {
    id: 'coupon_002', 
    code: 'FIRSTORDER',
    description: 'First time customer discount',
    discount: 15,
    minSpend: 1500,
    expiry: '2025-12-31T23:59:59.000Z'
  },
  {
    id: 'coupon_003',
    code: 'LUNCH20',
    description: 'Lunch time special - 20% off',
    discount: 20,
    minSpend: 3000,
    expiry: '2025-06-30T23:59:59.000Z'
  }
];

// Sample users data (for demo purposes)
const USERS_DATA = [
  {
    id: 'user_001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+234 803 123 4567',
    defaultArea: 'Effurun'
  },
  {
    id: 'user_002',
    firstName: 'Jane',
    lastName: 'Smith', 
    email: 'jane.smith@example.com',
    phone: '+234 805 234 5678',
    defaultArea: 'Enerhen'
  }
];

// Sample addresses data
const ADDRESSES_DATA = [
  {
    id: 'addr_001',
    userId: 'user_001',
    label: 'Home',
    area: 'Effurun',
    street: '15 Sapele Road',
    directions: 'Opposite First Bank',
    timestamp: Date.now() - 86400000 // 1 day ago
  },
  {
    id: 'addr_002',
    userId: 'user_001',
    label: 'Office',
    area: 'PTI Road',
    street: '8 PTI Junction',
    directions: 'Near Shell Filling Station',
    timestamp: Date.now() - 172800000 // 2 days ago
  }
];

// Sample orders data (for demo purposes)
const ORDERS_DATA = [
  {
    id: 'FPW' + Date.now().toString().slice(-6) + '001',
    items: [
      {
        restaurantId: 'rest_001',
        restaurantName: 'Mama Cass Kitchen',
        itemId: 'item_001',
        name: 'Jollof Rice',
        price: 2500,
        image: 'https://images.pexels.com/photos/2233348/pexels-photo-2233348.jpeg?auto=compress&cs=tinysrgb&w=400',
        quantity: 2,
        addOns: {
          'Protein': [{ name: 'Chicken', price: 0 }],
          'Extras': [{ name: 'Plantain', price: 500 }]
        },
        specialInstructions: 'Extra spicy please',
        timestamp: Date.now() - 3600000
      }
    ],
    address: {
      id: 'addr_001',
      label: 'Home',
      area: 'Effurun',
      street: '15 Sapele Road',
      directions: 'Opposite First Bank'
    },
    schedule: 'now',
    scheduleTime: null,
    paymentMethod: 'cash',
    deliveryNotes: 'Call when you arrive',
    promo: null,
    subtotal: 5500,
    deliveryFee: 300,
    discount: 0,
    total: 5800,
    status: 'preparing',
    timestamp: Date.now() - 3600000, // 1 hour ago
    estimatedDelivery: Date.now() + 1800000 // 30 minutes from now
  }
];

// Initialize data in localStorage if not exists
function initializeData() {
  if (!localStorage.getItem('restaurants')) {
    localStorage.setItem('restaurants', JSON.stringify(RESTAURANTS_DATA));
  }
  
  if (!localStorage.getItem('menus')) {
    localStorage.setItem('menus', JSON.stringify(MENUS_DATA));
  }
  
  if (!localStorage.getItem('coupons')) {
    localStorage.setItem('coupons', JSON.stringify(COUPONS_DATA));
  }
  
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(USERS_DATA));
  }
  
  if (!localStorage.getItem('addresses')) {
    localStorage.setItem('addresses', JSON.stringify(ADDRESSES_DATA));
  }
  
  if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify(ORDERS_DATA));
  }
  
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
  }
}

// Call initialization
initializeData();