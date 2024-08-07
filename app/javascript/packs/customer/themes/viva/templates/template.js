// Global dependencies
import 'jquery/src/jquery';
import 'jquery-ujs'
import 'owl.carousel/dist/owl.carousel';
import '@zeitiger/elevatezoom/jquery.elevatezoom';

import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

import * as I18n from 'i18n-js';
window.I18n = I18n;

I18n.defaultLocale = SingularCart.defaultLocale;
I18n.locale = SingularCart.locale;

import * as _ from 'lodash';
window._ = _;

import { translate } from '../../../../../src/functions';
window.translate = translate;

import '../../../../../src/functions';

import "../../../../../src/customer/routes";

// Template
import '../../../../../src/customer/themes/viva/templates/template';

// Translations
import '../../../../../src/customer/themes/viva/locales/all';

// Custom js
import '../../../../../src/customer/themes/viva/assets/javascripts/shop';

// Components
import '../../../../../src/customer/components';

// Register customer pages
import '../../../../../src/customer/pages';
