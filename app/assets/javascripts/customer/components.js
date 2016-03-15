global.React = require('react');
global.ReactDOM = require('react-dom');

var injectTapEventPlugin =  require('react-tap-event-plugin');
injectTapEventPlugin();

CartMixin = require('./mixins/CartMixin.js');

Errors = require('./components/snippets/Errors.js');
ProductSlider = require('./components/snippets/ProductSlider.js');
Cart = require('./components/products/Cart.js');
Layout = require('./components/layouts/Layout.js');
Header = require('./components/layouts/Header.js');
Footer = require('./components/layouts/Footer.js');
ProductItem = require('./components/products/ProductItem.js');
ProductList = require('./components/products/ProductList.js');
Home = require('./components/Home.js');
Product = require('./components/products/Product.js');
Category = require('./components/categories/Category.js');
Account = require('./components/customers/Account.js');
LoginForm = require('./components/customers/LoginForm.js');
Login = require('./components/customers/Login.js');
Register = require('./components/customers/Register.js');
ShippingForm = require('./components/checkout/ShippingForm.js');
Shipping = require('./components/checkout/Shipping.js');
OrderPaymentMethod = require('./components/checkout/PaymentMethod.js');
BillingForm = require('./components/checkout/BillingForm.js');
Billing = require('./components/checkout/Billing.js');
Summary = require('./components/checkout/Summary.js');
CheckoutForm = require('./components/checkout/CheckoutForm.js');
Checkout = require('./components/checkout/Checkout.js');
Success = require('./components/checkout/Success.js');
Order = require('./components/orders/Order.js');
