var OrderForm = React.createClass({
  renderPaymentInfo: function() {
    var paymentInfo = "";

    if (this.props.order.payment_method) {
      paymentInfo += this.props.order.payment.payment_method.name + " - ";
    }

    if (this.props.order.payment.submethod) {
      paymentInfo += this.props.order.payment.submethod + " - ";
    }

    if (this.props.order.transaction_number) {
      paymentInfo += this.props.order.payment.transaction_number + " - ";
    }

    paymentInfo += this.props.order.payment.state.toUpperCase();

    return paymentInfo;
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-sm-8">
          <div className="block">
            <h3>#{this.props.order.id}</h3>
            <p>{I18n.t("activerecord.attributes.order.status")}: {this.props.order.status.toUpperCase()}</p>

            {(this.props.order.payment) ?
            <p>
              {I18n.t("activerecord.attributes.order.payment")}: {this.renderPaymentInfo()}
            </p> : null}

            {(this.props.order.order_products && this.props.order.order_products.length > 0) ?
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  {this.props.order.order_products.map(function(orderProduct, index) {
                    return (
                      <tr key={"order_product_" + index}>
                        <td>
                          <img src={orderProduct.variation.image.thumb.url} className="img-responsive" />
                        </td>
                        <td>
                          {orderProduct.variation.name}
                        </td>
                        <td>
                          {I18n.toCurrency(orderProduct.unit_price, {precision: 0, unit: this.props.order.currency})}
                        </td>
                        <td>
                          {orderProduct.quantity}
                        </td>
                      </tr>
                    )
                  }.bind(this))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-right">
                      <p>{I18n.t("activerecord.attributes.order.subtotal")}</p>
                      <p>{I18n.t("activerecord.attributes.order.shipping")}</p>
                      <p>{I18n.t("activerecord.attributes.order.tax")}</p>
                      <p><b>{I18n.t("activerecord.attributes.order.total")}</b></p>
                    </td>
                    <td>
                      <p>{this.props.order.subtotal.toKoreanFormat()}</p>
                      <p>{this.props.order.shipping.toKoreanFormat()}</p>
                      <p>{this.props.order.tax.toKoreanFormat()}</p>
                      <p><b>{this.props.order.total.toKoreanFormat()}</b></p>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div> : null}
          </div>
        </div>

        {(this.props.order.shipping_address && this.props.order.billing_address) ?
        <div className="col-sm-4">
          <div className="block">
            <h3>{I18n.t("activerecord.attributes.order.shipping_address")}</h3>
            <p>{this.props.order.shipping_address.first_name} {this.props.order.shipping_address.last_name}</p>
            <p>{this.props.order.shipping_address.email}</p>
            <p>{this.props.order.shipping_address.phone_number}</p>
            <p>{this.props.order.shipping_address.state} {this.props.order.shipping_address.city} {this.props.order.shipping_address.country} - {this.props.order.shipping_address.zip_code}</p>
            <p>{this.props.order.shipping_address.address1}</p>
            <p>{this.props.order.shipping_address.address2}</p>
            <p>{this.props.order.shipping_address.fax}</p>
          </div>

          <div className="block">
            <h3>{I18n.t("activerecord.attributes.order.billing_address")}</h3>
            <p>{this.props.order.billing_address.first_name} {this.props.order.billing_address.last_name}</p>
            <p>{this.props.order.billing_address.email}</p>
            <p>{this.props.order.billing_address.phone_number}</p>
            <p>{this.props.order.billing_address.state} {this.props.order.billing_address.city} {this.props.order.billing_address.country} - {this.props.order.billing_address.zip_code}</p>
            <p>{this.props.order.billing_address.address1}</p>
            <p>{this.props.order.billing_address.address2}</p>
            <p>{this.props.order.billing_address.fax}</p>
          </div>
        </div> : null}
      </div>
    )
  }
})