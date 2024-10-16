import React from 'react';
import I18n from 'i18n-js';


export default class CustomerOrder extends React.Component {
  render() {
    var shippingAddress = this.props.order.shipping_address,
      billingAddress = this.props.order.billing_address,
      payment = this.props.order.payment,
      paymentStatus = "";

    if (payment) {
      let paymentStatusKlass = "";

      switch(payment.state) {
        case "pending":
          paymentStatusKlass = "label-default";
          break;
        case "paid":
          paymentStatusKlass = "label-success";
          break;
        case "refunded":
          paymentStatusKlass = "label-danger";
          break;
        default:
          break;
      }

      paymentStatus = (
        <div className={"label " + paymentStatusKlass}>
          {payment ? this.props.order.payment.state.capitalize() : ""}
        </div>
      )
    }

    let statusKlass = "";

    switch(this.props.order.status) {
      case "incompleted":
        statusKlass = "label-default";
        break;
      case "pending":
        statusKlass = "label-warning";
        break;
      case "processing":
        statusKlass = "label-success";
        break;
      case "processed":
        statusKlass = "label-success";
        break;
      case "shipping":
        statusKlass = "label-info";
        break;
      case "shipped":
        statusKlass = "label-primary";
        break;
      case "returned":
        statusKlass = "label-danger";
        break;
      case "cancelled":
        statusKlass = "label-danger";
        break;
      default:
        break;
    }

    return (
      <tr>
        <td>
          <a href={Routes.edit_merchant_order_path.localize(this.props.order.id)}>
            {"#" + this.props.order.id}
          </a>
        </td>
        <td>
          {I18n.l("time.formats.short", this.props.order.created_at)}
        </td>
        <td>
          {billingAddress ? (billingAddress.first_name || "") + " " +
            (billingAddress.last_name || "") : ""}
        </td>
        <td>
          {shippingAddress ? (shippingAddress.first_name || "") + " " +
            (shippingAddress.last_name || "") : ""}
        </td>
        <td>
          {paymentStatus}
        </td>
        <td>
          <div className={"label " + statusKlass}>
            {this.props.order.status.capitalize()}
          </div>
        </td>
        <td>
          {I18n.toCurrency(this.props.order.total, {precision: 2, unit: ""})}
        </td>
      </tr>
    );
  }
}
