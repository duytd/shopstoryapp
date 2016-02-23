var PaymentMethod = React.createClass({
  getInitialState: function() {
    return {
      payment_method_shop: this.props.payment_method_shop
    }
  },
  render: function() {
    var options = this.state.payment_method_shop.payment_method_option_shops.map(function(option, index){
      var value = this.getDefaultValue(option.id);

      return (
        <div className="form-group col-md-6">
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
              {options}
              {keyUploader}
              <div className="form-group col-md-12">
                <label>
                  {I18n.t("activerecord.attributes.payment_method_shop.active")}
                </label>
                <input type="hidden" name="payment_method_shop[active]" value="0" />
                <label className="styled-cb">
                  <input type="checkbox" name="payment_method_shop[active]" value="1" defaultChecked={this.props.payment_method_shop.active} />
                  <i className="fa"></i>
                </label>
              </div>
              <div className="form-group col-md-6">
                <SubmitButtons goBack={false} />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  },
  submit: function(e) {
    e.preventDefault();

    var form = $(this.refs.form.getDOMNode());

    $.ajax({
      url: Routes.merchant_payment_method_shop_path(this.state.payment_method_shop.id),
      method: "PUT",
      data: new FormData(form[0]),
      contentType: false,
      processData: false,
      dataType: "json",
      success: function(response) {
        this.setState({payment_method_shop: response});
      }.bind(this)
    });
  }
});
