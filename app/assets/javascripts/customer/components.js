global.React = require('react');
global.ReactDOM = require('react-dom');

var injectTapEventPlugin =  require('react-tap-event-plugin');
injectTapEventPlugin();

var _ = require('lodash');

CartMixin = require('customer/mixins/CartMixin.js');
PaginationMixin = require('customer/mixins/PaginationMixin.js');

/* Snippets */
PhoneField = require('customer/components/snippets/PhoneField.js');
Errors = require('customer/components/snippets/Errors.js');
Pagination = require('customer/components/snippets/Pagination.js');
ProductSlider = require('customer/components/snippets/ProductSlider.js');
Filter = require('customer/components/snippets/Filter.js');
Sorter = require('customer/components/snippets/Sorter.js');
Banner = require('customer/components/snippets/Banner.js');
Breadcrumb = require('customer/components/snippets/Breadcrumb.js');
Menu = require('customer/components/snippets/Menu.js');
Currency = require('customer/components/snippets/Currency.js');
SocialShare = require('customer/components/snippets/SocialShare.js');

/* Layout */
Layout = require('customer/components/layouts/Layout.js');
Header = require('customer/components/layouts/Header.js');
Footer = require('customer/components/layouts/Footer.js');

/* Cart */
Cart = require('customer/components/carts/Cart.js');
CartPopup = require('customer/components/carts/CartPopup.js');

/* Product */
ProductItem = require('customer/components/products/ProductItem.js');
ProductList = require('customer/components/products/ProductList.js');
VariationSelector = require('customer/components/products/VariationSelector.js');
Product = require('customer/components/products/Product.js');
Search = require('customer/components/products/Search.js');

/* Category */
Category = require('customer/components/categories/Category.js');
CategoryBox = require('customer/components/categories/CategoryBox.js');
CategoryList = require('customer/components/categories/CategoryList.js');

/* Customer */
Account = require('customer/components/customers/Account.js');
LoginForm = require('customer/components/customers/LoginForm.js');
Login = require('customer/components/customers/Login.js');
ForgotPassword = require('customer/components/customers/ForgotPassword.js');
ResetPassword = require('customer/components/customers/ResetPassword.js');
Register = require('customer/components/customers/Register.js');

/* Checkout */
ShippingForm = require('customer/components/checkout/ShippingForm.js');
Shipping = require('customer/components/checkout/Shipping.js');
PaymentMethod = require('customer/components/checkout/PaymentMethod.js');
BillingForm = require('customer/components/checkout/BillingForm.js');
Billing = require('customer/components/checkout/Billing.js');
Summary = require('customer/components/checkout/Summary.js');
CheckoutForm = require('customer/components/checkout/CheckoutForm.js');
Checkout = require('customer/components/checkout/Checkout.js');
Coupon = require('customer/components/checkout/Coupon.js');
Success = require('customer/components/checkout/Success.js');

/* Order */
Order = require('customer/components/orders/Order.js');

/* Custom page */
CustomPage = require('customer/components/custom_pages/CustomPage.js');

Home = require('customer/components/Home.js');
