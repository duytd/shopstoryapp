var ShippingForm = React.createClass({
  getInitialState: function() {
    return {
      isEditing: false,
      errors: {}
    }
  },
  render: function() {
    var countryNodes = this.props.countries.map(function (country, index) {
      return <option key={index} value={country[0]}>{country[1]}</option>
    });

    var containerKlass = "col-sm-8",
      halfContainerKlass = "col-sm-4",
      btnKlass = "btn-lg",
      btnName = I18n.t("checkout.buttons.next"),
      inputKlass = "form-control",
      labelKlass = "",
      shippingTitle = "",
      cancelBtn = "";

    if (this.props.editing) {
      containerKlass = "col-sm-12";
      halfContainerKlass = "col-sm-6";
      btnKlass = "btn-sm";
      btnName = I18n.t("checkout.buttons.save");
      inputKlass = "form-control input-sm input-dashed";
      labelKlass = "small";
      shippingTitle = <h3>{I18n.t("checkout.texts.shipping_info")}<i className="fa fa-edit pull-right" onClick={this.enableEditing}></i></h3>;
      cancelBtn = <input type="button" className={"btn " + btnKlass + " btn-default pull-right"} value={I18n.t("checkout.buttons.cancel")} onClick={this.disableEditing} />;
    }

    var englishName = (
      <div className="form-group row">
        <div className={halfContainerKlass}>
          <label className={labelKlass + " required"}>{I18n.t("checkout.shipping.first_name")}</label>
          <Errors errors={this.state.errors["shipping_address.first_name"] || []} />
          <input name="order[shipping_address_attributes][first_name]" type="text"
            defaultValue={(this.props.order.shipping_address) ? this.props.order.shipping_address.first_name : ""} className={inputKlass} />
        </div>
        <div className={halfContainerKlass}>
          <label>{I18n.t("checkout.shipping.last_name")}</label>
          <Errors errors={this.state.errors["shipping_address.last_name"] || []} />
          <input name="order[shipping_address_attributes][last_name]" type="text"
            defaultValue={(this.props.order.shipping_address) ? this.props.order.shipping_address.last_name : ""} className={inputKlass} />
        </div>
      </div>
    );

    var koreaName = (
      <div className="form-group row">
        <div className={containerKlass}>
          <label className={labelKlass + " required"}>{I18n.t("checkout.shipping.name")}</label>
          <Errors errors={this.state.errors["shipping_address.first_name"] || []} />
          <input name="order[shipping_address_attributes][first_name]" type="text"
            defaultValue={(this.props.order.shipping_address) ? this.props.order.shipping_address.first_name : ""} className={inputKlass} />
        </div>
      </div>
    );

    var shippingInfo = (
      <div className="row">
        <div className="col-sm-12">
          <p>
            {(this.props.order.shipping_address) ? this.props.order.shipping_address.first_name : ""}
            {(this.props.order.shipping_address) ? this.props.order.shipping_address.last_name : ""}</p>
          <p>{(this.props.order.shipping_address) ? this.props.order.shipping_address.email : ""}</p>
          <p>{(this.props.order.shipping_address) ? this.props.order.shipping_address.phone_number : ""}</p>
          <p>{(this.props.order.shipping_address) ? this.props.order.shipping_address.fax : ""}</p>
          <p>{(this.props.order.shipping_address) ? this.props.order.shipping_address.city : ""}</p>
          <p>{(this.props.order.shipping_address) ? this.props.order.shipping_address.state : ""}</p>
          <p>{(this.props.order.shipping_address) ? this.props.order.shipping_address.zip_code : ""}</p>
          <p>{(this.props.order.shipping_address) ? this.props.order.shipping_address.address1 : ""}
            <i>{(this.props.order.shipping_address && this.props.order.shipping_address.address2 != "") ? "("+this.props.order.shipping_address.address2+")" : ""}</i>
          </p>
        </div>
      </div>
    )

    var shippingForm = (
      <form ref="form" id="shippingForm">
        <input name="order[shipping_address_attributes][order_id]" value={this.props.order.id} type="hidden" />
        {(this.props.lang == "ko" ? koreaName : englishName)}
        <div className="form-group row">
          <div className={containerKlass}>
            <label className={labelKlass + " required"}>{I18n.t("checkout.shipping.email")}</label>
            <Errors errors={this.state.errors["shipping_address.email"] || []} />
            <input name="order[shipping_address_attributes][email]" type="email"
              defaultValue={(this.props.order.shipping_address) ? this.props.order.shipping_address.email : ""} className={inputKlass} />
          </div>
        </div>
        <div className="form-group row">
          <div className={containerKlass}>
            <label className={labelKlass + " required"}>{I18n.t("checkout.shipping.address1")}</label>
            <Errors errors={this.state.errors["shipping_address.address1"] || []} />
            <input ref="address" name="order[shipping_address_attributes][address1]" type="text"
              defaultValue={(this.props.order.shipping_address) ? this.props.order.shipping_address.address1 : ""}
              onClick={this.streetClick} className={inputKlass} />
          </div>
        </div>
        <div className="form-group row">
          <div className={containerKlass}>
            <label className={labelKlass}>{I18n.t("checkout.shipping.address2")}</label>
            <Errors errors={this.state.errors["shipping_address.address2"] || []} />
            <input name="order[shipping_address_attributes][address2]" type="text"
              defaultValue={(this.props.order.shipping_address) ? this.props.order.shipping_address.address2 : ""} className={inputKlass} />
          </div>
        </div>
        <div className="form-group row">
          <div className={halfContainerKlass}>
            <label className={labelKlass}>{I18n.t("checkout.shipping.city")}</label>
            <Errors errors={this.state.errors["shipping_address.city"] || []} />
            <input name="order[shipping_address_attributes][city]" type="text"
              defaultValue={(this.props.order.shipping_address) ? this.props.order.shipping_address.city : ""} className={inputKlass} />
          </div>
          <div className={halfContainerKlass}>
            <label className={labelKlass + " required"}>{I18n.t("checkout.shipping.zip_code")}</label>
            <Errors errors={this.state.errors["shipping_address.zip_code"] || []} />
            <input ref="zipcode" name="order[shipping_address_attributes][zip_code]" type="text"
              defaultValue={(this.props.order.shipping_address) ? this.props.order.shipping_address.zip_code : ""} className={inputKlass} />
          </div>
        </div>
        <div className="form-group row">
          <div className={containerKlass}>
            <label className={labelKlass + " required"}>{I18n.t("checkout.shipping.state")}</label>
            <Errors errors={this.state.errors["shipping_address.state"] || []} />
            <input name="order[shipping_address_attributes][state]" type="text"
              defaultValue={(this.props.order.shipping_address) ? this.props.order.shipping_address.state : ""} className={inputKlass} />
          </div>
        </div>
        <div className="form-group row">
          <div className={containerKlass}>
            <label className={labelKlass + " required"}>{I18n.t("checkout.shipping.country")}</label>
            <Errors errors={this.state.errors["shipping_address.country"] || []} />
            <div className="select">
              <select className={inputKlass} name="order[shipping_address_attributes][country]"
                defaultValue={(this.props.order.shipping_address) ? this.props.order.shipping_address.country : this.props.default_country}>
                {countryNodes}
              </select>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className={containerKlass}>
            <label className={labelKlass + " required"}>{I18n.t("checkout.shipping.phone_number")}</label>
            <Errors errors={this.state.errors["shipping_address.phone_number"] || []} />
            <input name="order[shipping_address_attributes][phone_number]" type="text"
              defaultValue={(this.props.order.shipping_address) ? this.props.order.shipping_address.phone_number : ""} className={inputKlass} />
          </div>
        </div>
        <div className="form-group row">
          <div className={containerKlass}>
            <label className={labelKlass}>{I18n.t("checkout.shipping.fax")}</label>
            <Errors errors={this.state.errors["shipping_address.fax"] || []} />
            <input name="order[shipping_address_attributes][fax]" type="text"
              defaultValue={(this.props.order.shipping_address) ? this.props.order.shipping_address.fax : ""} className={inputKlass} />
          </div>
        </div>
        <div className="form-group row">
          <div className={containerKlass}>
            <input type="submit" className={"btn " + btnKlass + " btn-primary pull-right"} value={btnName} onClick={this.updateOrder} />
            {cancelBtn}
          </div>
        </div>
      </form>
    );

    return (
      <div className="row">
        <div className="col-sm-12">
          {shippingTitle}
          {(this.state.isEditing || !this.props.editing) ? shippingForm : shippingInfo}
        </div>
      </div>
    );
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
  enableEditing: function() {
    this.setState({isEditing: true});
  },
  disableEditing: function() {
    this.setState({isEditing: false});
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
        this.setState({errors: []});
        this.props.updateOrder(order);
        this.disableEditing();
      }.bind(this),
      error: function(xhr) {
        this.setState({errors: xhr.responseJSON});
      }.bind(this)
    })
  }
})
