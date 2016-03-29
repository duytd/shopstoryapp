var ShippingRateForm = React.createClass({
  getInitialState: function () {
    var type = (this.props.types) ? this.props.types[0] : null;

    if (this.props.shipping_rate) {
      switch(this.props.shipping_rate.type) {
        case "shipping/flat_rate":
          type = "flat_rate";
          break;
        case "shipping/free_shipping":
          type = "free";
          break;
        case "shipping/free_shipping_by_price":
          type = "free_by_price";
          break;
      }
    }

    return {
      type: type,
      errors: {},
      name_ko_count: 0,
      name_en_count: 0
    };
  },
  render: function () {
    return (
      <form ref="form" className="shipping-rate-form" action={this.props.url}
        acceptCharset="UTF-8" method={this.props.method} onSubmit={this.handleSubmit}>

        <div className="col-sm-12">
          {(!this.props.shipping_rate && this.props.types) ?
          <div className="block">
            <div className="form-group row">
              <div className="col-sm-6">
                <label className="label">{I18n.t("activerecord.attributes.shipping_rate.type")}</label>
                <div className="select">
                  <select name="type" className="form-control" onChange={this.switchType}>
                    {this.props.types.map(function(type, index) {
                      return <option value={type} key={"type_" + index}>{I18n.t("merchant.admin.shipping_rates.types."+type)}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div> : null}

          <div className="block">
            <LocaleNavTab ko_errors_count={this.state.name_ko_count} en_errors_count={this.state.name_en_count} />

            <div className="tab-content">
              <div id="ko" className="tab-pane fade in active">
                <div className="form-group">
                  <label className="label">{I18n.t("activerecord.attributes.shipping_rate.name")}</label>
                  <div className="form-errors">
                    { (this.state.errors.name_ko) ? this.state.errors.name_ko.map(function(object){
                      return object;
                    }) : ""}
                  </div>
                  <input ref="name_ko" type="text" name="shipping_rate[name_ko]"
                    className="form-control" defaultValue={(this.props.ko_shipping_rate) ? this.props.ko_shipping_rate.name : ""} />
                </div>
              </div>
              <div id="en" className="tab-pane fade">
                <div className="form-group">
                  <label className="label">{I18n.t("activerecord.attributes.shipping_rate.name")}</label>
                  <div className="form-errors">
                    {(this.state.errors.name_en) ? this.state.errors.name_en.map(function(object){
                      return object;
                    }) : ""}
                  </div>
                  <input ref="name_en" type="text" name="shipping_rate[name_en]"
                    className="form-control" defaultValue={(this.props.en_shipping_rate) ? this.props.en_shipping_rate.name : null} />
                </div>
              </div>
            </div>
          </div>

          {(this.state.type == "free_by_price") ?
          <div className="block">
            <div className="form-group row">
              <div className="col-sm-6">
                <label className="label">{I18n.t("activerecord.attributes.shipping_rate.min_price")}</label>
                <input type="text" name="shipping_rate[min_price]" defaultValue={(this.props.shipping_rate) ? this.props.shipping_rate.min_price : null} className="form-control" />
              </div>
            </div>
          </div> : null}

        {(this.state.type == "flat_rate") ?
          <div className="block">
            <div className="form-group row">
              <div className="col-sm-6">
                <label className="label">{I18n.t("activerecord.attributes.shipping_rate.rate")}</label>
                <input type="text" name="shipping_rate[rate]" defaultValue={(this.props.shipping_rate) ? this.props.shipping_rate.rate : null} className="form-control" />
              </div>
            </div>
          </div> : null}

          <div className="row">
            <div className="col-md-12">
              <SubmitButtons redirect_url={Routes.merchant_shipping_rates_path()} />
            </div>
          </div>
        </div>
      </form>
    )
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var formData = $(this.refs.form).serialize();

    this.handleShippingRateSubmit(formData, this.props.url, this.props.method);
  },
  handleShippingRateSubmit: function(formData, action, method) {
    $.ajax({
      data: formData,
      url: action,
      method: method,
      dataType: "json",
      success: function(data) {
        Turbolinks.visit(Routes.merchant_shipping_rates_path());
      },
      error: function(xhr) {
        var errors = xhr.responseJSON;
        var name_ko_count = (errors.name_ko) ? errors.name_ko.length : 0;
        var name_en_count = (errors.name_en) ? errors.name_en.length : 0;

        this.setState({
          errors: errors,
          name_ko_count: name_ko_count,
          name_en_count: name_en_count
        });
      }.bind(this)
    });
  },
  switchType: function(e) {
    this.setState({type: e.target.value});
  }
});
