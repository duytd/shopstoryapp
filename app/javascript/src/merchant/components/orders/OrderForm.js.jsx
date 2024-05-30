export default class OrderForm extends React.Component {
  getInitialState() {
    return {
      editing: false,
      order: this.props.order,
    }
  },
  renderPaymentInfo() {
    var paymentInfo = "";

    if (this.state.order.payment.payment_method) {
      paymentInfo += this.state.order.payment.payment_method.name + " - ";
    }

    if (this.state.order.payment.submethod) {
      paymentInfo += this.state.order.payment.submethod + " - ";
    }

    if (this.state.order.payment.transaction_number) {
      paymentInfo += this.state.order.payment.transaction_number + " - ";
    }

    paymentInfo += this.state.order.payment.state.toUpperCase();

    return paymentInfo;
  },
  renderOrderProduct(orderProduct, index) {
    return (
      <tr key={"order_product_" + index}>
        <td>
          <a href={Routes.edit_merchant_product_path.localize(orderProduct.variation.product_slug)}>
            <img src={orderProduct.variation.image.image.thumb.url} className="img-responsive" width="50" height="50" />
          </a>
        </td>
        <td>
          {orderProduct.variation.name}
        </td>
        <td>
          {i18n.toCurrency(orderProduct.unit_price, {precision: 0, unit: this.state.order.currency})}
        </td>
        <td>
          {orderProduct.quantity}
        </td>
      </tr>
    )
  },
  renderTransactionInfo(info, index) {
    return (
      <p key={"transaction_info_" + index}>
        {(info["show_admin"] != false) ?
          <span>
            <b>{info["label"]}</b>: {info["value"]}
          </span>: null}
      </p>
    )
  },
  render() {
    return (
      <div className="row">
        <div className="col-sm-8">
          <div className="block">
            <h3>#{this.state.order.id}</h3>
            {(!this.state.order.abandoned) ?
              <a className="pull-right btn btn-primary" href={this.props.invoice_url}>
                {i18n.t("merchant.admin.buttons.download_invoice")}
              </a> : null}

            {(!this.state.order.shipment && !this.state.order.abandoned) ?
              <a className="pull-right btn btn-default" onClick={this.createShipment}>
                {i18n.t("merchant.admin.buttons.create_shipment")}
              </a> : null}

            <p>{i18n.t("activerecord.attributes.order.status")}: {this.state.order.status.toUpperCase()}</p>

            {(this.state.order.payment) ?
            <p>
              {i18n.t("activerecord.attributes.order.payment")}: {this.state.order.payment.state.toUpperCase()}
            </p> : null}

            {(this.state.order.order_products && this.state.order.order_products.length > 0) ?
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  {this.state.order.order_products.map(function(orderProduct, index) {
                    return this.renderOrderProduct(orderProduct, index)
                  }.bind(this))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-right">
                      <p>{i18n.t("activerecord.attributes.order.subtotal")}</p>
                      <p>{i18n.t("activerecord.attributes.order.shipping")}</p>
                      <p>{i18n.t("activerecord.attributes.order.tax")}</p>
                      <h3>{i18n.t("activerecord.attributes.order.total")}</h3>
                    </td>
                    <td>
                      <p>{this.state.order.subtotal.toKoreanFormat()}</p>
                      <p>{this.state.order.shipping.toKoreanFormat()}</p>
                      <p>{this.state.order.tax.toKoreanFormat()}</p>
                      <h3>{this.state.order.total.toKoreanFormat()}</h3>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div> : null}
          </div>

          {(this.state.order.payment && !this.state.order.unprocessed) ?
            <div className="block">
              <h3>{i18n.t("activerecord.attributes.order.payment")}</h3>
              <p>{this.state.order.payment.payment_method.name}</p>
              <p>{this.state.order.payment.transaction_number}</p>
              {this.props.transaction_info.map(function(info, index){
                return this.renderTransactionInfo(info, index);
              }.bind(this))}
            </div> : null}

        <ShipmentForm
          order={this.state.order}
          shippingMethods={this.props.shipping_methods}
          shipmentStatuses={this.props.shipment_statuses}
          shipment={this.state.order.shipment}
          editing={this.state.editing}
          disableEditing={this.disableEditing}
          updateOrder={this.updateOrder}
          enableEditing={this.enableEditing} />

        </div>
        {(this.state.order.shipping_address && this.state.order.billing_address) ?
        <div className="col-sm-4">
          <div className="block">
            <h3>{i18n.t("activerecord.attributes.order.shipping_address")}</h3>
            <p>{this.state.order.shipping_address.first_name} {this.state.order.shipping_address.last_name}</p>
            <p>{this.state.order.shipping_address.email}</p>
            <p>{this.state.order.shipping_address.phone_number}</p>
            <p>{this.state.order.shipping_address.state} {this.state.order.shipping_address.city} {this.state.order.shipping_address.country} - {this.state.order.shipping_address.zip_code}</p>
            <p>{this.state.order.shipping_address.address1}</p>
            <p>{this.state.order.shipping_address.address2}</p>
            <p>{this.state.order.shipping_address.fax}</p>
          </div>

          <div className="block">
            <h3>{i18n.t("activerecord.attributes.order.billing_address")}</h3>
            <p>{this.state.order.billing_address.first_name} {this.state.order.billing_address.last_name}</p>
            <p>{this.state.order.billing_address.email}</p>
            <p>{this.state.order.billing_address.phone_number}</p>
            <p>{this.state.order.billing_address.state} {this.state.order.billing_address.city} {this.state.order.billing_address.country} - {this.state.order.billing_address.zip_code}</p>
            <p>{this.state.order.billing_address.address1}</p>
            <p>{this.state.order.billing_address.address2}</p>
            <p>{this.state.order.billing_address.fax}</p>
          </div>
        </div> : null}
      </div>
    )
  },
  createShipment() {
    this.setState({editing: true});
  },
  updateOrder(order) {
    this.setState({order: order, editing: false});
  },
  enableEditing() {
    this.setState({editing: true});
  },
  disableEditing() {
    this.setState({editing: false});
  }
}
