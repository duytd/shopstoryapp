var ShippingRateList = React.createClass({
  render: function() {
    var headers = [
      I18n.t("activerecord.attributes.shipping_rate.name")
    ];

    return (
      <List
        type="shipping_rate"
        items={this.props.shipping_rates}
        headers={headers}
        deleteAllUrl={Routes.merchant_shipping_rates_path()} />
    )
  }
})
