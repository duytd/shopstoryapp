import ReactOnRails from 'react-on-rails';
import I18n from 'i18n-js';
import translations from "../i18n/translations.json";

//Shop
import Setup from './components/shops/Setup';
import ShopForm from './components/shops/ShopForm';
import Webmaster from './components/shops/Webmaster';
import Search from './components/search/Search';

//Banners
import BannerBox from './components/banners/BannerBox';
import BannerForm from './components/banners/BannerForm';

//Banners
import OrderBox from './components/orders/OrderBox';
import OrderForm from './components/orders/OrderForm';

// Customers
import CustomerBox from './components/customers/CustomerBox';
import CustomerForm from './components/customers/CustomerForm';

// Products
import ProductBox from './components/products/ProductBox';
import ProductForm from './components/products/ProductForm';

// Categories
import CategoryBox from './components/categories/CategoryBox';
import CategoryForm from './components/categories/CategoryForm';

// Categories
import DiscountBox from './components/discounts/DiscountBox';
import DiscountForm from './components/discounts/DiscountForm';

// Menu
import MenuBox from './components/menus/MenuBox';
import MenuForm from './components/menus/MenuForm';

// Shipping Rates
import ShippingRateBox from './components/shipping_rates/ShippingRateBox';
import ShippingRateForm from './components/shipping_rates/ShippingRateForm';

// Reports
import OrderReport from './components/reports/OrderReport';
import ProductReport from './components/reports/ProductReport';
import PaymentReport from './components/reports/PaymentReport';

// Custom Pages
import CustomPageBox from './components/custom_pages/CustomPageBox';
import CustomPageForm from './components/custom_pages/CustomPageForm';

// Developer
import Credentials from './components/developers/Credentials';

// Design
import GeneralForm from './components/design/General';
import Theme from './components/design/Theme';
import ThemeList from './components/design/ThemeList';
import Editor from './components/design/Editor';
import EmailTemplateEditor from './components/email_templates/EmailTemplateEditor';

// Pages
import Account from './components/pages/Account';
import Dashboard from './components/pages/Dashboard';

// General
import Breadcrumb from './components/general/Breadcrumb';

// Setup locales
I18n.translations = translations;

// Register components
ReactOnRails.register({
  Setup,
  ShopForm,
  Webmaster,
  Search,
  Breadcrumb,
  BannerForm,
  BannerBox,
  OrderForm,
  OrderBox,
  CustomerBox,
  CustomerForm,
  ProductBox,
  ProductForm,
  CategoryBox,
  CategoryForm,
  DiscountBox,
  DiscountForm,
  MenuBox,
  MenuForm,
  ShippingRateBox,
  ShippingRateForm,
  OrderReport,
  ProductReport,
  PaymentReport,
  CustomPageBox,
  CustomPageForm,
  Credentials,
  GeneralForm,
  Theme,
  ThemeList,
  Editor,
  Dashboard,
  Account,
  EmailTemplateEditor
});
