//= require js-routes
//= require i18n.js
//= require i18n/translations
//= require_tree ./mixins
//= require_tree ./components

import ReactOnRails from 'react-on-rails';

import Setup from './components/shops/Setup';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Setup,
});
