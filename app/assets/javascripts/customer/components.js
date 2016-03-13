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
