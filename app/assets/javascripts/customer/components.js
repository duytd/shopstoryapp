global.React = require('react');
global.ReactDOM = require('react-dom');

var injectTapEventPlugin =  require('react-tap-event-plugin');
injectTapEventPlugin();

var _ = require('lodash');

CartMixin = require('customer/mixins/CartMixin.js');
PaginationMixin = require('customer/mixins/PaginationMixin.js');

PhoneField = require('customer/components/snippets/PhoneField.js');
Errors = require('customer/components/snippets/Errors.js');
Pagination = require('customer/components/snippets/Pagination.js');
ProductSlider = require('customer/components/snippets/ProductSlider.js');
Filter = require('customer/components/snippets/Filter.js');
Sorter = require('customer/components/snippets/Sorter.js');
Banner = require('customer/components/snippets/Banner.js');
Breadcrumb = require('customer/components/snippets/Breadcrumb.js');
Menu = require('customer/components/snippets/Menu.js');
Cart = require('customer/components/carts/Cart.js');
CartPopup = require('customer/components/carts/CartPopup.js');
Layout = require('customer/components/layouts/Layout.js');
Header = require('customer/components/layouts/Header.js');
Footer = require('customer/components/layouts/Footer.js');
ProductItem = require('customer/components/products/ProductItem.js');
ProductList = require('customer/components/products/ProductList.js');
Home = require('customer/components/Home.js');
VariationSelector = require('customer/components/products/VariationSelector.js');
Product = require('customer/components/products/Product.js');
Category = require('customer/components/categories/Category.js');
CategoryListing = require('customer/components/categories/CategoryListing.js');
Account = require('customer/components/customers/Account.js');
LoginForm = require('customer/components/customers/LoginForm.js');
Login = require('customer/components/customers/Login.js');
Register = require('customer/components/customers/Register.js');
ShippingForm = require('customer/components/checkout/ShippingForm.js');
Shipping = require('customer/components/checkout/Shipping.js');
PaymentMethod = require('customer/components/checkout/PaymentMethod.js');
BillingForm = require('customer/components/checkout/BillingForm.js');
Billing = require('customer/components/checkout/Billing.js');
Summary = require('customer/components/checkout/Summary.js');
CheckoutForm = require('customer/components/checkout/CheckoutForm.js');
Checkout = require('customer/components/checkout/Checkout.js');
Success = require('customer/components/checkout/Success.js');
Order = require('customer/components/orders/Order.js');
CustomPage = require('customer/components/custom_pages/CustomPage.js');
