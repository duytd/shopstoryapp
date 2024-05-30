export default class PaymentMethod extends React.Component {
  getInitialState() {
    return {
      errors: [],
      payment_method_shop: this.props.payment_method_shop
    }
  },
  componentDidMount() {
    $(this.refs.activator).bootstrapSwitch({
      size: "small",
      onSwitchChange: function(event, state) {
        if (state) {
          this.active();
        }
        else {
          this.disactive();
        }
      }.bind(this)
    });
  },
  render() {
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
      <div className="row">
        <div className="col-sm-2">
          <h3 className="title">{this.props.payment_method_shop.payment_method.name}</h3>
          <p className="small">{this.props.payment_method_shop.payment_method.description}</p>
          <input ref="activator" type="checkbox" name="payment_method_shop[active]" defaultChecked={this.state.payment_method_shop.active} onChange={this.activate} />
        </div>
        <div className="col-sm-10">
          <div className="block">
            <form ref="form" id="paymentMethod" acceptCharset="UTF-8" onSubmit={this.submit}>
              <input type="hidden" ref="active" name="payment_method_shop[active]" value={this.state.payment_method_shop.active} />
              <div className="row">
                <div className="form-group col-md-12">
                  {(this.state.errors.length > 0) ? <Errors errors={this.state.errors} /> : null}
                </div>
              </div>
              <div className="row">
                {options}
              </div>
              <div className="row">
                {keyUploader}
              </div>
              <div className="row">
                <div className="form-group col-md-12">
                  <button type="submit" className="btn btn-success">
                    {I18n.t("merchant.admin.buttons.save")}
                    <span ref="loading" className="hide">
                      <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>
                      <span className="sr-only">Loading...</span>
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  },
  disactive() {
    this.refs.active.value = false;
    this.submit();
  },
  active() {
    this.refs.active.value = true;
    this.submit();
  },
  submit(e) {
    if (typeof e !== "undefined")
      e.preventDefault();

    var loading = $(this.refs.loading),
      form = $(this.refs.form);


    $.ajax({
      url: Routes.merchant_payment_method_shop_path.localize(this.state.payment_method_shop.id),
      method: "PUT",
      data: new FormData(form[0]),
      contentType: false,
      processData: false,
      dataType: "json",
      beforeSend: function() {
        loading.removeClass("hide");
      },
      complete: function() {
        loading.addClass("hide");
      },
      success: function(response) {
        this.setState({payment_method_shop: response, errors: []});
      }.bind(this),
      error: function(xhr) {
        this.setState({errors: xhr.responseJSON}, function() {
          var state = this.state.payment_method_shop.active;
          $(this.refs.activator).bootstrapSwitch("state", state, true);
        }.bind(this));
      }.bind(this)
    });
  }
};