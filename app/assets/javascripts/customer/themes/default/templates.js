global.React = require('react');
global.ReactDOM = require('react-dom');

var injectTapEventPlugin =  require('react-tap-event-plugin');
injectTapEventPlugin();

CartMixin = require('customer/mixins/CartMixin.js');
PaginationMixin = require('customer/mixins/PaginationMixin.js');

PhoneFieldRT = require('./templates/snippets/PhoneField.rt');
ErrorsRT = require('./templates/snippets/Errors.rt');
PaginationRT = require('./templates/snippets/Pagination.rt');
ProductSliderRT = require('./templates/snippets/ProductSlider.rt');
LayoutRT = require('./templates/layouts/Layout.rt');
HeaderRT = require('./templates/layouts/Header.rt');
FooterRT = require('./templates/layouts/Footer.rt');
CartRT = require('./templates/products/Cart.rt');
ProductItemRT = require('./templates/products/ProductItem.rt');
ProductListRT = require('./templates/products/ProductList.rt');
HomeRT = require('./templates/Home.rt');
VariationSelectorRT = require('./templates/products/VariationSelector.rt');
ProductRT = require('./templates/products/Product.rt');
CategoryRT = require('./templates/categories/Category.rt');
AccountRT = require('./templates/customers/Account.rt');
LoginRT = require('./templates/customers/Login.rt');
LoginFormRT = require('./templates/customers/LoginForm.rt');
RegisterRT = require('./templates/customers/Register.rt');
ShippingFormRT = require('./templates/checkout/ShippingForm.rt');
ShippingRT = require('./templates/checkout/Shipping.rt');
PaymentMethodRT = require('./templates/checkout/PaymentMethod.rt');
BillingFormRT = require('./templates/checkout/BillingForm.rt');
BillingRT = require('./templates/checkout/Billing.rt');
CheckoutRT = require('./templates/checkout/Checkout.rt');
CheckoutFormRT = require('./templates/checkout/CheckoutForm.rt');
SummaryRT = require('./templates/checkout/Summary.rt');
SuccessRT = require('./templates/checkout/Success.rt');
OrderRT = require('./templates/orders/Order.rt');

PhoneField = require('customer/components/snippets/PhoneField.js');
Errors = require('customer/components/snippets/Errors.js');
Pagination = require('customer/components/snippets/Pagination.js');
ProductSlider = require('customer/components/snippets/ProductSlider.js');
Cart = require('customer/components/products/Cart.js');
Layout = require('customer/components/layouts/Layout.js');
Header = require('customer/components/layouts/Header.js');
Footer = require('customer/components/layouts/Footer.js');
ProductItem = require('customer/components/products/ProductItem.js');
ProductList = require('customer/components/products/ProductList.js');
Home = require('customer/components/Home.js');
VariationSelector = require('customer/components/products/VariationSelector.js');
Product = require('customer/components/products/Product.js');
Category = require('customer/components/categories/Category.js');
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
