// Global dependencies
import 'jquery/src/jquery';
import 'jquery-ujs'

import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

import "../../src/customer/routes";

import 'owl.carousel/dist/owl.carousel';
import '@zeitiger/elevatezoom/jquery.elevatezoom';

import React from 'react';
window.React = React;

import * as I18n from 'i18n-js';
window.I18n = I18n;

import * as _ from 'lodash';
window._ = _;

import { translate } from '../../src/functions';
window.translate = translate;

import '../../src/customer/components';
import '../../src/customer/pages';
