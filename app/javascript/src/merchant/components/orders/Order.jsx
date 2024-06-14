import React from 'react';
import Item from '../../components/general/Item';
import I18n from 'i18n-js';

export default class Order extends React.Component {
  renderPaymentStatus(payment) {
    var paymentStatus = null;

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
          {this.props.order.payment.state.capitalize()}
        </div>
      )
    }

    return paymentStatus;
  }

  renderShipmentStatus(shipment) {
    var shipmentStatus = null;

    if (shipment) {
      switch(shipment.status) {
        case "shipping":
          shipmentStatusKlass = "label-primary";
          break;
        case "shipped":
          shipmentStatusKlass = "label-success";
          break;
        case "returned":
          shipmentStatusKlass = "label-danger";
          break;
        default:
          break;
      }

      shipmentStatus = (
        <div className={"label " + shipmentStatusKlass}>
          {this.props.order.shipment.status.capitalize()}
        </div>
      )
    }

    return shipmentStatus;
  }

  renderOrderStatus() {
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
      case "cancelled":
        statusKlass = "label-danger";
        break;
      default:
        break;
    }

    return (
      <div className={"label " + statusKlass}>
        {this.props.order.status.capitalize()}
      </div>
    )
  }

  render() {
    var shippingAddress = this.props.order.shipping_address,
      billingAddress = this.props.order.billing_address;

    return (
      <Item item={this.props.order} deleteUrl={this.props.deleteUrl} handleSelect={this.props.handleSelect}
          handleDeleteItem={this.props.handleDeleteItem} check={this.props.order.checked}>
        <td>
          <a href={Routes.edit_merchant_order_path.localize(this.props.order)}>
            {"#" + this.props.order.id}
          </a>
        </td>
        <td>
          {(this.props.order.paid_at) ? I18n.l("time.formats.short", this.props.order.paid_at) : null}
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
          {this.renderOrderStatus()}
        </td>
        <td>
          {this.renderPaymentStatus(this.props.order.payment)}
        </td>
        <td>
          {this.renderShipmentStatus(this.props.order.shipment)}
        </td>
        <td>
          {I18n.toCurrency(this.props.order.total, {precision: 0, unit: ""})}
        </td>
      </Item>
    );
  }
};
