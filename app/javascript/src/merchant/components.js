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
  OrderBox
});
