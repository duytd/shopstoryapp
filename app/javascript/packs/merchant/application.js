// Global dependencies
import "jquery/src/jquery";
import "jquery-ujs"

import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

import "../../src/merchant/routes";

import * as I18n from 'i18n-js';
window.I18n = I18n;
I18n.defaultLocale = Shopstory.defaultLocale;
I18n.locale = Shopstory.locale;

// Utilities
import "../../src/functions";
import "../../src/merchant/base";

// Register components
import "../../src/merchant/components";
