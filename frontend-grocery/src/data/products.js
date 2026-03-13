// --- Category Image Imports (from src/assets/images/cat) ---
import catFruits from '../assets/images/cat/cat-fruits.jpg';
import catVeg from '../assets/images/cat/cat-vegetables.jpg';
import catDairy from '../assets/images/cat/cat-dairy.jpg';
import catJuices from '../assets/images/cat/cat-juices.jpg';
import catSnacks from '../assets/images/cat/cat-snacks.jpg';
import catHousehold from '../assets/images/cat/cat-household.jpg';

// --- Product Image Imports (from src/assets/images/prod) ---
import imgApples from '../assets/images/prod/prod-apples.jpg';
import imgBananas from '../assets/images/prod/prod-bananas.jpg';
import imgOranges from '../assets/images/prod/prod-oranges.jpg';
import imgTomatoes from '../assets/images/prod/prod-tomatoes.jpg';
import imgOnions from '../assets/images/prod/prod-onions.jpg';
import imgPotatoes from '../assets/images/prod/prod-potatoes.jpg';
import imgMilk from '../assets/images/prod/prod-milk.jpg';
import imgYogurt from '../assets/images/prod/prod-yogurt.jpg';
import imgEggs from '../assets/images/prod/prod-eggs.jpg';
import imgAppleJuice from '../assets/images/prod/prod-apple-juice.jpg';
import imgMangoJuice from '../assets/images/prod/prod-mango-juice.jpg';
import imgOrangeJuice from '../assets/images/prod/prod-orange-juice.jpg';
import imgRice from '../assets/images/prod/prod-rice.jpg';
import imgBread from '../assets/images/prod/prod-bread.jpg';
import imgOil from '../assets/images/prod/prod-oil.jpg';
import imgSoap from '../assets/images/prod/prod-soap.jpg';

export const categories = [
  { id: 1, name: 'Fruits', icon: '🍎', color: '#e8f5e9', accent: '#2e7d32', image: catFruits },
  { id: 2, name: 'Vegetables', icon: '🥦', color: '#f3e5f5', accent: '#7b1fa2', image: catVeg },
  { id: 3, name: 'Dairy', icon: '🥛', color: '#e3f2fd', accent: '#1565c0', image: catDairy },
  { id: 4, name: 'Juices', icon: '🧃', color: '#fff8e1', accent: '#f57f17', image: catJuices },
  { id: 5, name: 'Snacks', icon: '🍿', color: '#fce4ec', accent: '#c62828', image: catSnacks },
  { id: 6, name: 'Household', icon: '🧹', color: '#e0f7fa', accent: '#00838f', image: catHousehold },
];

export const products = [
  { id: 1, name: 'Red Apples', category: 'Fruits', price: 2.49, originalPrice: 3.19, unit: 'per lb', badge: 'Sale', rating: 4.8, reviews: 124, description: 'Crisp, sweet, and perfectly red...', image: imgApples, inStock: true, featured: true, popular: true },
  { id: 2, name: 'Organic Bananas', category: 'Fruits', price: 0.99, originalPrice: null, unit: 'per bunch', badge: 'Organic', rating: 4.7, reviews: 98, description: 'Naturally sweet and creamy...', image: imgBananas, inStock: true, featured: true, popular: true },
  { id: 3, name: 'Navel Oranges', category: 'Fruits', price: 3.99, originalPrice: null, unit: 'per bag (4pc)', badge: 'Fresh', rating: 4.6, reviews: 67, description: 'Juicy, seedless navel oranges...', image: imgOranges, inStock: true, featured: false, popular: true },
  { id: 4, name: 'Fresh Tomatoes', category: 'Vegetables', price: 1.99, originalPrice: 2.49, unit: 'per lb', badge: 'Sale', rating: 4.5, reviews: 89, description: 'Vine-ripened tomatoes...', image: imgTomatoes, inStock: true, featured: true, popular: true },
  { id: 5, name: 'Red Onions', category: 'Vegetables', price: 1.29, originalPrice: null, unit: 'per lb', badge: null, rating: 4.4, reviews: 53, description: 'Mild and slightly sweet...', image: imgOnions, inStock: true, featured: false, popular: false },
  { id: 6, name: 'Baby Potatoes', category: 'Vegetables', price: 2.79, originalPrice: null, unit: 'per 2lb bag', badge: 'New', rating: 4.6, reviews: 41, description: 'Tender, creamy baby potatoes...', image: imgPotatoes, inStock: true, featured: false, popular: false },
  { id: 7, name: 'Whole Milk', category: 'Dairy', price: 3.50, originalPrice: null, unit: 'per gallon', badge: 'Fresh', rating: 4.9, reviews: 210, description: 'Farm-fresh whole milk...', image: imgMilk, inStock: true, featured: true, popular: true },
  { id: 8, name: 'Greek Yogurt', category: 'Dairy', price: 4.99, originalPrice: 5.99, unit: 'per 32oz', badge: 'Sale', rating: 4.8, reviews: 156, description: 'Thick, protein-packed Greek yogurt...', image: imgYogurt, inStock: true, featured: false, popular: true },
  { id: 9, name: 'Free-Range Eggs', category: 'Dairy', price: 5.49, originalPrice: null, unit: 'per dozen', badge: 'Organic', rating: 4.9, reviews: 302, description: 'Farm-fresh free-range eggs...', image: imgEggs, inStock: true, featured: true, popular: true },
  { id: 10, name: 'Apple Juice', category: 'Juices', price: 3.99, originalPrice: null, unit: 'per 64oz', badge: null, rating: 4.5, reviews: 78, description: '100% pure pressed apple juice...', image: imgAppleJuice, inStock: true, featured: false, popular: true },
  { id: 11, name: 'Mango Juice', category: 'Juices', price: 4.49, originalPrice: 4.99, unit: 'per 32oz', badge: 'Sale', rating: 4.7, reviews: 62, description: 'Tropical mango juice...', image: imgMangoJuice, inStock: true, featured: true, popular: true },
  { id: 12, name: 'Orange Juice', category: 'Juices', price: 4.99, originalPrice: null, unit: 'per 64oz', badge: 'Fresh', rating: 4.8, reviews: 188, description: 'Freshly squeezed orange juice...', image: imgOrangeJuice, inStock: true, featured: true, popular: true },
  { id: 13, name: 'Basmati Rice', category: 'Snacks', price: 6.99, originalPrice: null, unit: 'per 5lb bag', badge: null, rating: 4.7, reviews: 145, description: 'Long-grain aromatic Basmati rice...', image: imgRice, inStock: true, featured: false, popular: false },
  { id: 14, name: 'Whole Grain Bread', category: 'Snacks', price: 3.29, originalPrice: null, unit: 'per loaf', badge: 'New', rating: 4.6, reviews: 91, description: 'Hearty whole grain bread...', image: imgBread, inStock: true, featured: false, popular: true },
  { id: 15, name: 'Sunflower Oil', category: 'Household', price: 5.99, originalPrice: 7.49, unit: 'per 48oz', badge: 'Sale', rating: 4.4, reviews: 73, description: 'Light, neutral-flavored sunflower oil...', image: imgOil, inStock: true, featured: false, popular: false },
  { id: 16, name: 'Dish Soap', category: 'Household', price: 2.99, originalPrice: null, unit: 'per 19oz', badge: null, rating: 4.5, reviews: 112, description: 'Powerful grease-cutting dish soap...', image: imgSoap, inStock: true, featured: false, popular: false },
];