var Currency = React.createClass({
  render: CurrencyRT,
  submit: function(e) {
    e.preventDefault();

    var form = $(this.refs.form),
      data = form.serialize(),
      action = form.attr("action"),
      method = form.attr("method");

    $.post(action, data, function(response) {
      I18n.currency = response.currency;
      Turbolinks.visit(location.toString())
    })
  }
})

module.exports = Currency;
