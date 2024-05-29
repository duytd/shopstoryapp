export default class ShippingRateBox extends React.Component {
  render() {
    var shippingRateList = (
      <ShippingRateList
        shipping_rates={this.props.shipping_rates} />
    )

    if (this.props.shipping_rates.length == 0) {
      shippingRateList = (
        <div className="text-center">
          <p>{I18n.t("merchant.admin.messages.no_shipping_rate")}</p>
          <a href={Routes.new_merchant_shipping_rate_path.localize()} className="btn btn-lg btn-primary">
            {I18n.t("merchant.admin.buttons.add")}
          </a>
        </div>
      )
    }

    return (
      <Box name="shipping_rate"
        list={shippingRateList}
        url={Routes.new_merchant_shipping_rate_path.localize()}
        title={I18n.t("merchant.admin.shipping_rates.title")} />
    );
  }
}
