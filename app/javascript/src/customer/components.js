import ReactOnRails from 'react-on-rails';
import Home from './components/Home';
import CategoryBox from './components/categories/CategoryBox';
import Category from './components/categories/Category';
import CustomPage from './components/custom_pages/CustomPage';
import Account from './components/customers/Account';
import Order from './components/orders/Order';
import Cart from './components/carts/Cart';
import Checkout from './components/checkout/Checkout';
import Success from './components/checkout/Success';
import ResetPassword from './components/customers/ResetPassword';
import ForgotPassword from './components/customers/ForgotPassword';
import CheckoutForm from './components/checkout/CheckoutForm';
import Product from './components/products/Product';
import Register from './components/customers/Register';
import Search from './components/products/Search';
import Login from './components/customers/Login';

// Register components
ReactOnRails.register({
  Home,
  CategoryBox,
  Category,
  CustomPage,
  Account,
  Order,
  Cart,
  Checkout,
  Success,
  ResetPassword,
  ForgotPassword,
  CheckoutForm,
  Product,
  Register,
  Search,
  Login
});
