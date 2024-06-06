import React from 'react';
import I18n from 'i18n-js';

export default class Currency extends React.Component {
  render() {
    return CurrencyRT.apply(this);
  }

  submit = (e) => {
    e.preventDefault();

    var form = $(this.refs.form),
      data = form.serialize(),
      action = form.attr("action"),
      method = form.attr("method");

    $.post(action, data, function(response) {
      I18n.currency = response.currency;
      window.location = location.toString();
    })
  }
}
