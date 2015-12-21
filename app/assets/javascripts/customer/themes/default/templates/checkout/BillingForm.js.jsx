var BillingForm = React.createClass({
  getInitialState: function() {
    var paymentMethod = (this.props.order.payment) ?
      this.props.order.payment.payment_method :
      this.props.payment_methods[0]

    return {
      billingAddress: this.props.order.billing_address,
      errors: {},
      useShippingAddress: true,
      paymentMethod: paymentMethod
    }
  },
  render: function() {
    var countryNodes = this.props.countries.map(function(country, index) {
      return <option key={"country" + index} value={country[0]}>{country[1]}</option>
    });

    var paymentMethodNodes = this.props.payment_methods.map(function(method, index) {
      return <option key={"method" + index} value={method.id} onClick={this.changePaymentMethod.bind(this, index)}>{method.name}</option>
    }.bind(this))

    var englishName = (
      <div className="form-group row">
        <div className="col-sm-4">
          <label className="required">{I18n.t("checkout.billing.first_name")}</label>
          <Errors errors={this.state.errors["billing_address.first_name"] || []} />
          <input name="order[billing_address_attributes][first_name]" type="text"
            defaultValue={(this.state.billingAddress) ? this.state.billingAddress.first_name : ""} className="form-control" />
        </div>
        <div className="col-sm-4">
          <label>{I18n.t("checkout.billing.last_name")}</label>
          <Errors errors={this.state.errors["billing_address.last_name"] || []} />
          <input name="order[billing_address_attributes][last_name]" type="text"
            defaultValue={(this.state.billingAddress) ? this.state.billingAddress.last_name : ""} className="form-control" />
        </div>
      </div>
    );

    var koreaName = (
      <div className="form-group row">
        <div className="col-sm-8">
          <label className="required">{I18n.t("checkout.billing.name")}</label>
          <Errors errors={this.state.errors["billing_address.first_name"] || []} />
          <input name="order[billing_address_attributes][first_name]" type="text"
            defaultValue={(this.state.billingAddress) ? this.state.billingAddress.first_name : ""} className="form-control" />
        </div>
      </div>
    );

    var mobileSubmethods = this.state.paymentMethod.mobile_submethods.split("|").map(function(method, index) {
        var checked = false;

        if ((this.props.order.payment && this.props.order.payment.submethod == method) || index == 0) {
          checked = true
        }

        return (
          <span>
            <input type="radio" name="order[payment_attributes][submethod]" value={method}
              defaultChecked={checked} />
            {method.toUpperCase()}
          </span>
        );
    }.bind(this))

    var paymentMethods = (
      <div>
        {(this.props.order.payment) ? <input type="hidden" name="order[payment_attributes][id]" value={this.props.order.payment.id} /> : ""}
        <div className="form-group row">
          <div className="col-sm-8">
            <select name="order[payment_attributes][payment_method_id]"
              defaultValue={(this.props.order.payment) ? this.props.order.payment.payment_method.id : this.props.payment_methods[0].id}>
              {paymentMethodNodes}
            </select>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-8">
            {(this.props.mobile) ? mobileSubmethods : ""}
          </div>
        </div>
      </div>
    )

    var billingForm = (
      <form ref="form" id="billingForm">
        <input name="order[billing_address_attributes][order_id]" value={this.props.order.id} type="hidden" />
        {(this.props.lang == "ko" ? koreaName : englishName)}
        <div className="form-group row">
          <div className="col-sm-8">
            <label className="required">{I18n.t("checkout.billing.email")}</label>
            <Errors errors={this.state.errors["billing_address.email"] || []} />
            <input name="order[billing_address_attributes][email]" type="email"
              defaultValue={(this.state.billingAddress) ? this.state.billingAddress.email : ""} className="form-control" />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-8">
            <label className="required">{I18n.t("checkout.billing.address1")}</label>
            <Errors errors={this.state.errors["billing_address.address1"] || []} />
            <input ref="address" name="order[billing_address_attributes][address1]" type="text"
              defaultValue={(this.state.billingAddress) ? this.state.billingAddress.address1 : ""}
              onClick={this.streetClick} className="form-control" />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-8">
            <label>{I18n.t("checkout.billing.address2")}</label>
            <Errors errors={this.state.errors["billing_address.address2"] || []} />
            <input name="order[billing_address_attributes][address2]" type="text"
              defaultValue={(this.state.billingAddress) ? this.state.billingAddress.address2 : ""} className="form-control"/>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-4">
            <label>{I18n.t("checkout.billing.city")}</label>
            <Errors errors={this.state.errors["billing_address.city"] || []} />
            <input name="order[billing_address_attributes][city]" type="text"
              defaultValue={(this.state.billingAddress) ? this.state.billingAddress.city : ""} className="form-control" />
          </div>
          <div className="col-sm-4">
            <label className="required">{I18n.t("checkout.billing.zip_code")}</label>
            <Errors errors={this.state.errors["billing_address.zip_code"] || []} />
            <input ref="zipcode" name="order[billing_address_attributes][zip_code]" type="text"
              defaultValue={(this.state.billingAddress) ? this.state.billingAddress.zip_code : ""} className="form-control" />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-8">
            <label className="required">{I18n.t("checkout.billing.state")}</label>
            <Errors errors={this.state.errors["billing_address.state"] || []} />
            <input name="order[billing_address_attributes][state]" type="text"
              defaultValue={(this.state.billingAddress) ? this.state.billingAddress.state : ""} className="form-control" />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-8">
            <label className="required">{I18n.t("checkout.billing.country")}</label>
            <Errors errors={this.state.errors["billing_address.country"] || []} />
            <div className="select">
              <select className="form-control" name="order[billing_address_attributes][country]"
                defaultValue={(this.props.order.billing_address) ? this.props.order.billing_address.country : this.props.default_country}>
                {countryNodes}
              </select>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-8">
            <label className="required">{I18n.t("checkout.billing.phone_number")}</label>
            <Errors errors={this.state.errors["billing_address.phone_number"] || []} />
            <input name="order[billing_address_attributes][phone_number]" type="text"
              defaultValue={(this.state.billingAddress) ? this.state.billingAddress.phone_number : ""} className="form-control" />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-8">
            <label>{I18n.t("checkout.billing.fax")}</label>
            <Errors errors={this.state.errors["billing_address.fax"] || []} />
            <input name="order[billing_address_attributes][fax]" type="text"
              defaultValue={(this.state.billingAddress) ? this.state.billingAddress.fax : ""} className="form-control" />
          </div>
        </div>

        {paymentMethods}

        <div className="form-group row">
          <div className="col-sm-8">
            <input type="submit" className="btn btn-lg btn-primary pull-right" value={I18n.t("checkout.buttons.place_order")} onClick={this.updateOrder} />
          </div>
        </div>
      </form>
    );

    var billingAutoFilledForm = (
      <form ref="form" id="billingForm">
        <input name="order[billing_address_attributes][order_id]" value={this.props.order.id} type="hidden" />
        <input name="order[billing_address_attributes][first_name]" value={this.props.order.shipping_address.first_name} type="hidden" />
        <input name="order[billing_address_attributes][last_name]" value={this.props.order.shipping_address.last_name} type="hidden" />
        <input name="order[billing_address_attributes][email]" value={this.props.order.shipping_address.email} type="hidden" />
        <input name="order[billing_address_attributes][phone_number]" value={this.props.order.shipping_address.phone_number} type="hidden" />
        <input name="order[billing_address_attributes][country]" value={this.props.order.shipping_address.country} type="hidden" />
        <input name="order[billing_address_attributes][city]" value={this.props.order.shipping_address.city} type="hidden" />
        <input name="order[billing_address_attributes][state]" value={this.props.order.shipping_address.state} type="hidden" />
        <input name="order[billing_address_attributes][address1]" value={this.props.order.shipping_address.address1} type="hidden" />
        <input name="order[billing_address_attributes][address2]" value={this.props.order.shipping_address.address2} type="hidden" />
        <input name="order[billing_address_attributes][zip_code]" value={this.props.order.shipping_address.zip_code} type="hidden" />
        <input name="order[billing_address_attributes][fax]" value={this.props.order.shipping_address.fax} type="hidden" />

        <p>{this.props.order.shipping_address.first_name}{this.props.order.shipping_address.last_name}</p>
        <p>{this.props.order.shipping_address.email}</p>
        <p>{this.props.order.shipping_address.phone_number}</p>
        <p>{this.props.order.shipping_address.fax}</p>
        <p>{this.props.order.shipping_address.city}</p>
        <p>{this.props.order.shipping_address.state}</p>
        <p>{this.props.order.shipping_address.zip_code}</p>
        <p>{this.props.order.shipping_address.address1}
          <i>{(this.props.order.shipping_address.address2 != "") ? "("+this.props.order.shipping_address.address2+")" : ""}</i>
        </p>

        <hr/>
        {paymentMethods}
        <hr/>

        <input type="submit" className="btn btn-lg btn-primary pull-right" value={I18n.t("checkout.buttons.place_order")} onClick={this.updateOrder} />
        <div className="clearfix"></div>
        <hr/>
      </form>
    );

    return (
      <div className="billing-address">
        <label className="styled-cb">
          <input ref="useShippingAddress" type="checkbox" defaultChecked={true} onChange={this.switchBilling}/>
          <i className="fa"></i>
          {I18n.t("checkout.billing.user_shipping_address")}
        </label>
        {(this.state.useShippingAddress) ? billingAutoFilledForm : billingForm}
      </div>
    )
  },
  switchBilling: function() {
    var checkbox = $(this.refs.useShippingAddress.getDOMNode());
    if (checkbox.is(":checked"))
      this.setState({useShippingAddress: true})
    else
      this.setState({useShippingAddress: false})
  },
  changePaymentMethod: function(index) {
    this.setState({paymentMethod: this.props.payment_methods[index]})
  },
  streetClick: function() {
    if (this.props.lang == "ko") {
      openDaumPostcode(function(data) {
        var address = data.address,
          zipcode = data.zonecode;

        this.setAddress(address, zipcode);
      }.bind(this))
    }
  },
  setAddress: function(address, zipcode) {
    address = typeof address !== "undefined" ? address : "";
    zipcode = typeof zipcode !== "undefined" ? zipcode : "";

    this.refs.address.getDOMNode().value = address;
    this.refs.zipcode.getDOMNode().value = zipcode;
  },
  updateOrder: function(e) {
    e.preventDefault();

    var formData = $(this.refs.form.getDOMNode()).serialize();

    $.ajax({
      data: formData,
      method: "PUT",
      url: Routes.customer_order_path(this.props.order.id),
      success: function(order) {
        location.href = Routes.customer_order_payment_path(order.id);
      }.bind(this),
      error: function(xhr) {
        this.setState({errors: xhr.responseJSON});
      }.bind(this)
    })
  }
})
