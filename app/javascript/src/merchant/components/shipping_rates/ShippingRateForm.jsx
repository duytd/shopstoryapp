import LocaleNavTab from '../../components/general/LocaleNavTab';

export default class ShippingRateForm extends React.Component {
  constructor(props) {
    super(props);

    var type = (this.props.types) ? "free" : null;

    if (this.props.shipping_rate) {
      switch(this.props.shipping_rate.type) {
        case "shipping/flat_rate_per_order":
          type = "flat_rate_per_order";
          break;
        case "shipping/flat_rate_per_product":
          type = "flat_rate_by_product";
          break;
        case "shipping/free_shipping":
          type = "free";
          break;
        case "shipping/free_shipping_by_price":
          type = "free_by_price";
          break;
      }
    }

    this.state = {
      generalType: "free_shipping",
      type: type,
      errors: {},
      name_ko_count: 0,
      name_en_count: 0
    };
  }

  render() {
    return (
      <form ref="form" className="shipping-rate-form" action={this.props.url}
        acceptCharset="UTF-8" method={this.props.method} onSubmit={this.handleSubmit}>

        {(!this.props.shipping_rate && this.props.types) ?
        <div className="block">
          <div className="form-group row">
            <div className="col-sm-6">
              <label className="label">{I18n.t("merchant.admin.shipping_rates.choose_shipping_type")}</label>
              <div className="select">
                <FormErrors errors={this.state.errors.type} />
                <select className="form-control" onChange={this.switchGeneralType}>
                  {["free_shipping", "flat_rate"].map(function(type, index) {
                    return <option value={type} key={"general_type_" + index}>{I18n.t("merchant.admin.shipping_rates.general_types." + type)}</option>
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="form-group row">
              {(this.state.generalType == "free_shipping") ?
                <div className="col-sm-6">
                  <p>
                    <input type="radio" name="type" defaultChecked value="free" onChange={this.switchType} /> {I18n.t("merchant.admin.shipping_rates.types.free")}
                  </p>
                  <p>
                    <input type="radio" name="type" value="free_by_price" onChange={this.switchType} /> {I18n.t("merchant.admin.shipping_rates.types.free_by_price")}
                  </p>
                </div> : null}

              {(this.state.generalType == "flat_rate") ?
                <div className="col-sm-6">
                  <p>
                    <input type="radio" name="type" defaultChecked value="flat_rate_per_order" onChange={this.switchType} /> {I18n.t("merchant.admin.shipping_rates.types.flat_rate_per_order")}
                  </p>
                  <p>
                    <input type="radio" name="type" value="flat_rate_per_product" onChange={this.switchType} /> {I18n.t("merchant.admin.shipping_rates.types.flat_rate_per_product")}
                  </p>
                </div> : null}
          </div>
        </div> : null}

        {(this.props.shipping_rate) ?
          <div className="block">
            <div className="form-group row">
              <div className="col-sm-6">
                <label className="label">{I18n.t("activerecord.attributes.shipping_rate.type")}</label>
                <p>{I18n.t("merchant.admin.shipping_rates.type_labels." + this.state.type)}</p>
              </div>
            </div>
          </div> : null}

        <div className="block">
          <LocaleNavTab ko_errors_count={this.state.name_ko_count} en_errors_count={this.state.name_en_count} />

          <div className="tab-content">
            <div id="ko" className="tab-pane fade in active">
              <div className="form-group">
                <label className="label">{I18n.t("activerecord.attributes.shipping_rate.name")}</label>
                <FormErrors errors={this.state.errors.name_ko} />
                <input ref="name_ko" type="text" name="shipping_rate[name_ko]"
                  className="form-control" defaultValue={(this.props.shipping_rate) ? this.props.shipping_rate.name_ko : ""} />
              </div>
            </div>
            <div id="en" className="tab-pane fade">
              <div className="form-group">
                <label className="label">{I18n.t("activerecord.attributes.shipping_rate.name")}</label>
                <FormErrors errors={this.state.errors.name_en} />
                <input ref="name_en" type="text" name="shipping_rate[name_en]"
                  className="form-control" defaultValue={(this.props.shipping_rate) ? this.props.shipping_rate.name_en : ""} />
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

      {(this.state.type == "flat_rate_per_product" || this.state.type == "flat_rate_per_order") ?
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
            <SubmitButtons redirect_url={Routes.merchant_shipping_rates_path.localize()} />
          </div>
        </div>
      </form>
    )
  }

  handleSubmit(e) {
    e.preventDefault();
    var formData = $(this.refs.form).serialize();

    this.handleShippingRateSubmit(formData, this.props.url, this.props.method);
  }

  handleShippingRateSubmit(formData, action, method) {
    $.ajax({
      data: formData,
      url: action,
      method: method,
      dataType: "json",
      success: function(data) {
        window.location = Routes.merchant_shipping_rates_path.localize();
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
  }

  switchType(e) {
    this.setState({type: e.target.value});
  }

  switchGeneralType(e) {
    var type = null;

    if (e.target.value == "free_shipping") {
      type = "free"
    }
    else {
      type = "flat_rate_per_order"
    }

    this.setState({generalType: e.target.value, type: type});
  }
};
