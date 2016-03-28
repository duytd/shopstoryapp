var ShippingRateBox = React.createClass({
  render: function() {
    var shippingRateList = (
      <ShippingRateList
        shipping_rates={this.props.shipping_rates}
      />
    )

    return (
      <Box name="shipping_rate"
        list={shippingRateList}
        url={Routes.new_merchant_shipping_rate_path()}
        title={I18n.t("merchant.admin.shipping_rates.title")}
      />
    );
  }
});
