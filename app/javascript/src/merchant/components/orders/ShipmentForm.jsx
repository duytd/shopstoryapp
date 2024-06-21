import React from 'react';
import I18n from 'i18n-js';


import FormErrors from '../../components/general/FormErrors';
import { translate } from '../../../functions';

export default class ShipmentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };
  }

  renderShippingMethod(method, index) {
    return (
      <option value={method.id} key={"shipping_method_" + index}>{translate(method, "name")}</option>
    )
  }

  renderStatus(status, index) {
    return (
      <option value={status} key={"status_" + index}>{status.capitalize()}</option>
    )
  }

  renderShipment() {
    return (
      <div className="block">
        <h3>{I18n.t("activerecord.attributes.order.shipment")}</h3>
        <a className="btn btn-primary pull-right" onClick={this.props.enableEditing}>{I18n.t("merchant.admin.buttons.edit")}</a>
        <p>{this.props.shipment.status.toUpperCase()}</p>
        <p>{translate(this.props.shipment.shipping_method, "name")}</p>
        <p>{this.props.shipment.tracking_code}</p>
      </div>
    )
  }

  renderForm() {
    return (
      <div className="block">
        <h3>{I18n.t("activerecord.attributes.order.shipment")}</h3>
        <form ref="form" id="shipment-form" className="shipment-form" action={Routes.merchant_order_path(this.props.order)}
          acceptCharset="UTF-8" method="put" onSubmit={this.submit}>

          {(this.props.shipment) ?
          <div className="mb-3">
            <input type="hidden" className="form-control" name="order[shipment_attributes][order_id]" defaultValue={this.props.order.id}/>
            <label className="form-label">{I18n.t("activerecord.attributes.shipment.status")}</label>
            <FormErrors errors={this.state.errors.status} />

            <div className="select">
              <select className="form-control" name="order[shipment_attributes][status]" defaultValue={this.props.shipment.status}>
                {this.props.shipmentStatuses.map(function(status, index) {
                  return this.renderStatus(status, index);
                }.bind(this))}
              </select>
            </div>
          </div> : null}

          <div className="mb-3">
            <label className="form-label">{I18n.t("activerecord.attributes.shipment.shipping_method_id")}</label>
            <div className="select">
              <select className="form-control" name="order[shipment_attributes][shipping_method_id]" defaultValue={this.props.shipment ? this.props.shipment.shipment_method_id : ""}>
                {this.props.shippingMethods.map(function(method, index) {
                  return this.renderShippingMethod(method, index);
                }.bind(this))}
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">{I18n.t("activerecord.attributes.shipment.tracking_code")}</label>
            <input type="text" className="form-control" name="order[shipment_attributes][tracking_code]" defaultValue={(this.props.shipment) ? this.props.shipment.tracking_code : ""}/>
          </div>

          <div className="mb-3 text-end">
            <button type="submit" className="btn btn-success" onClick={this.submit}>{I18n.t("merchant.admin.buttons.save")}</button>
          </div>
        </form>
      </div>
    )
  }

  render() {
    if (this.props.editing) {
      return this.renderForm();
    }
    else if (!this.props.editing && this.props.shipment) {
      return this.renderShipment();
    }
    else {
      return <span></span>
    }
  }

  submit = (e) => {
    e.preventDefault();

    var formData = $(this.refs.form).serialize();
    var url = $(this.refs.form).attr("action");

    $.ajax({
      url: url,
      method: "put",
      data: formData,
      success: function(order) {
        this.setState({errors: []}, this.props.updateOrder(order));
      }.bind(this),
      errors: function(xhr) {
        this.setState({errors: xhr.responseJSON});
      }.bind(this)
    })
  }
}
