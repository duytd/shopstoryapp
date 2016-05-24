var PaymentMethod = React.createClass({
  getInitialState: function() {
    return {
      errors: [],
      payment_method_shop: this.props.payment_method_shop
    }
  },
  render: function() {
    var options = this.state.payment_method_shop.payment_method_option_shops.map(function(option, index){
      return (
        <div className="form-group col-md-6" key={"payment_method_shop_" + index}>
          <label>{option.payment_method_option.title}</label>
          <input type="hidden" name={"payment_method_shop[payment_method_option_shops_attributes][" + index + "][id]"} value={option.id} />
          <input type="text" className="form-control" name={"payment_method_shop[payment_method_option_shops_attributes][" + index + "][value]"} defaultValue={option.value} />
        </div>
      )
    }.bind(this));

    var keyUploader = "";

    if (this.props.payment_method_shop.payment_method.key_required) {
      keyUploader = (
      <div className="form-group col-md-12">
        <label>
          {I18n.t("activerecord.attributes.payment_method_shop.key")}
        </label>
        <p className="small">{(this.state.payment_method_shop.key.url) ? this.state.payment_method_shop.key.url.split("/").pop() : ""}</p>
        <input type="file" name="payment_method_shop[key]" />
      </div>
      )
    }

    return (
      <div className="col-md-12">
        <div className="row">
          <h3 className="title">{this.props.payment_method_shop.payment_method.name}</h3>
          <div className="col-md-12 block">
            <form ref="form" id="paymentMethod" acceptCharset="UTF-8" onSubmit={this.submit}>
              <div className="form-group col-md-12">
                {(this.state.errors.length > 0) ? <Errors errors={this.state.errors} /> : null}
              </div>
              {options}
              {keyUploader}

              <input ref="active" type="hidden" name="payment_method_shop[active]" value={this.state.payment_method_shop.active} />
              {(this.state.payment_method_shop.active) ?
                <div className="form-group col-md-6">
                  <button className="btn btn-danger" onClick={this.disactive}>{I18n.t("merchant.admin.buttons.disactivate")}</button>
                </div> :
                <div className="form-group col-md-6">
                  <SubmitButtons goBack={false} />
                  <button className="btn btn-primary" onClick={this.active}>{I18n.t("merchant.admin.buttons.activate")}</button>
                </div>
              }
            </form>
          </div>
        </div>
      </div>
    )
  },
  disactive: function(e) {
    e.preventDefault();
    this.refs.active.value = false;
    this.submit();
  },
  active: function(e) {
    e.preventDefault();
    this.refs.active.value = true;
    this.submit();
  },
  submit: function(e) {
    if (typeof e !== "undefined")
      e.preventDefault();

    var form = $(this.refs.form);

    $.ajax({
      url: Routes.merchant_payment_method_shop_path(this.state.payment_method_shop.id),
      method: "PUT",
      data: new FormData(form[0]),
      contentType: false,
      processData: false,
      dataType: "json",
      success: function(response) {
        this.setState({payment_method_shop: response, errors: []});
      }.bind(this),
      error: function(xhr) {
        this.setState({errors: xhr.responseJSON});
      }.bind(this)
    });
  }
});
