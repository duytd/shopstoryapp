global.React = require('react');
global.ReactDOM = require('react-dom');

var injectTapEventPlugin =  require('react-tap-event-plugin');
injectTapEventPlugin();

ErrorsRT = require('./themes/default/templates/snippets/Errors.rt');
ProductSliderRT = require('./themes/default/templates/snippets/ProductSlider.rt');
LayoutRT = require('./themes/default/templates/layouts/Layout.rt');
HeaderRT = require('./themes/default/templates/layouts/Header.rt');
FooterRT = require('./themes/default/templates/layouts/Footer.rt');
CartRT = require('./themes/default/templates/products/Cart.rt');

ProductItemRT = require('./themes/default/templates/products/ProductItem.rt');
ProductListRT = require('./themes/default/templates/products/ProductList.rt');
HomeRT = require('./themes/default/templates/Home.rt');
ProductRT = require('./themes/default/templates/products/Product.rt');
CategoryRT = require('./themes/default/templates/categories/Category.rt');
AccountRT = require('./themes/default/templates/customers/Account.rt');
LoginRT = require('./themes/default/templates/customers/Login.rt');
LoginFormRT = require('./themes/default/templates/customers/LoginForm.rt');
RegisterRT = require('./themes/default/templates/customers/Register.rt');
ShippingFormRT = require('./themes/default/templates/checkout/ShippingForm.rt');
ShippingRT = require('./themes/default/templates/checkout/Shipping.rt');
PaymentMethodRT = require('./themes/default/templates/checkout/PaymentMethod.rt');
BillingFormRT = require('./themes/default/templates/checkout/BillingForm.rt');
BillingRT = require('./themes/default/templates/checkout/Billing.rt');
CheckoutRT = require('./themes/default/templates/checkout/Checkout.rt');
CheckoutFormRT = require('./themes/default/templates/checkout/CheckoutForm.rt');
SummaryRT = require('./themes/default/templates/checkout/Summary.rt');

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
