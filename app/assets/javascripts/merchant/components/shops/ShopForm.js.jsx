var ShopForm = React.createClass({
  getInitialState: function () {
    var koreanMode = (!this.props.shop.country ||
      (this.props.shop.country == this.props.config.default_country)) ? true : false;
    return {
      koreanMode: koreanMode,
      errors: {},
    };
  },
  render: function () {
    var countryNodes = this.props.countries.map(function (country, index) {
      return <option key={index} value={country[0]}>{country[1]}</option>
    }.bind(this));

    var currencyNodes = this.props.currencies.map(function (currency, index) {
      return <option key={index} value={currency[0]}>{currency[1]}</option>
    }.bind(this));

    var timeZoneNodes = this.props.time_zones.map(function (timeZone, index) {
      return <option key={index} value={timeZone[0]}>{timeZone[1]}</option>
    }.bind(this));

    return (
      <form ref="form" id="shop-form" className="shop-form" action={this.props.url}
        acceptCharset="UTF-8" method={this.props.method} onSubmit={this.submit} >
        <div className="col-md-12">
          <h4 className="form-title">{I18n.t("merchant.admin.shops.basic_information")}</h4>
          <div className="row">
            <div className="col-md-12 block">
              <div className="form-group col-md-6">
                <label className="label">{I18n.t("activerecord.attributes.shop.name")}</label>
                <input type="text" className="form-control" name="shop[name]" defaultValue={this.props.shop.name} />
                <div className="form-errors">
                  {(this.state.errors.name) ? this.state.errors.name.map(function(object){
                    return object;
                  }) : ""}
                </div>
              </div>
              <div className="form-group col-md-6">
                <label className="label">{I18n.t("activerecord.attributes.shop.email")}</label>
                <input type="text" className="form-control" name="shop[email]" defaultValue={this.props.shop.email} />
                <div className="form-errors">
                  {(this.state.errors.email) ? this.state.errors.email.map(function(object){
                    return object;
                  }) : ""}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <h4 className="form-title">{I18n.t("merchant.admin.shops.contact")}</h4>
          <div className="row">
            <div className="col-md-12 block">
              <div className="form-group col-md-6">
                <label className="label">{I18n.t("activerecord.attributes.shop.legal_name")}</label>
                <input type="text" className="form-control" name="shop[legal_name]" defaultValue={this.props.shop.legal_name} />
              </div>
              <div className="form-group col-md-6">
                <label className="label">{I18n.t("activerecord.attributes.shop.phone")}</label>
                <input type="text" className="form-control" name="shop[phone]" defaultValue={this.props.shop.phone} />
              </div>
              <div className="form-group col-md-4">
                <label className="label">{I18n.t("activerecord.attributes.shop.country")}</label>
                <div className="select">
                  <select ref="country" className="form-control" name="shop[country]" onChange={this.countryChange}
                    defaultValue={(this.props.shop.country) ? this.props.shop.country : this.props.config.default_country}>
                    {countryNodes}
                  </select>
                </div>
              </div>
              <div className="form-group col-md-4">
                <label className="label">{I18n.t("activerecord.attributes.shop.city")}</label>
                <input type="text" className="form-control" name="shop[city]" defaultValue={this.props.shop.city} />
              </div>
              <div className="form-group col-md-4">
                <label className="label">
                  {I18n.t("activerecord.attributes.shop.zip_code")}
                  <span className="hint">
                    {(this.state.koreanMode == true) ? I18n.t("merchant.admin.shops.zipcode_hint") : ""}
                  </span>
                </label>
                <input type="text" ref="zip_code" readOnly={this.state.koreanMode == true} className="form-control" 
                  name="shop[zip_code]" defaultValue={this.props.shop.zip_code} />
              </div>
              <div className={(this.state.koreanMode) ? "form-group col-md-12" : "hide"}>
                <label className="label">{I18n.t("activerecord.attributes.shop.street_ko")}</label>
                <input type="text" ref="street_ko" className="form-control" name="shop[street_ko]" 
                  onClick={this.streetClick} defaultValue={this.props.shop.street_ko} />
              </div>
              <div className="form-group col-md-12">
                <label className="label">
                  {(this.state.koreanMode) ? I18n.t("activerecord.attributes.shop.street_en") : I18n.t("activerecord.attributes.shop.street")}
                </label>
                <input type="text" ref="street_en" className="form-control" name="shop[street_en]" 
                  onClick={this.streetClick} defaultValue={this.props.shop.street_en} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <h4 className="form-title">{I18n.t("merchant.admin.shops.format")}</h4>
          <div className="row">
            <div className="col-md-12 block">
              <div className="form-group col-md-6">
                <label className="label">{I18n.t("activerecord.attributes.shop.time_zone")}</label>
                <div className="select">
                  <select className="form-control" name="shop[time_zone]"
                    defaultValue={(this.props.shop.time_zone) ? this.props.shop.time_zone : this.props.config.default_timezone}>
                    {timeZoneNodes}
                  </select>
                </div>
              </div>
              <div className="form-group col-md-6">
                <label className="label">{I18n.t("activerecord.attributes.shop.currency")}</label>
                <div className="select">
                  <select className="form-control" name="shop[currency]"
                    defaultValue={(this.props.shop.currency) ? this.props.shop.currency : this.props.config.default_currency}>
                    {currencyNodes}
                  </select>
                </div>
              </div>
              <div className="form-group col-md-6">
                <label className="label">{I18n.t("activerecord.attributes.shop.weight_unit")}</label>
                <div className="select">
                  <select ref="weight_unit" className="form-control" name="shop[weight_unit]"
                    defaultValue={(this.props.shop.weight_unit) ? this.props.shop.weight_unit : "kg"}>
                    <option value="kg">
                      {I18n.t("merchant.admin.shops.kilogram")}
                    </option>
                    <option value="g">
                      {I18n.t("merchant.admin.shops.gram")}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <h4 className="form-title">{I18n.t("merchant.admin.shops.social")}</h4>
          <div className="row">
            <div className="col-md-12 block">
              <div className="form-group col-md-12">
                <label className="label">{I18n.t("activerecord.attributes.shop.facebook_url")}</label>
                <input type="text" className="form-control" name="shop[facebook_url]" 
                  defaultValue={this.props.shop.facebook_url} />
              </div>
              <div className="form-group col-md-12">
                <label className="label">{I18n.t("activerecord.attributes.shop.instagram_url")}</label>
                <input type="text" className="form-control" name="shop[instagram_url]" 
                  defaultValue={this.props.shop.instagram_url} />
              </div>
              <div className="form-group col-md-12">
                <label className="label">{I18n.t("activerecord.attributes.shop.pinterest_url")}</label>
                <input type="text" className="form-control" name="shop[pinterest_url]" 
                  defaultValue={this.props.shop.pinterest_url} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 text-right">
          <SubmitButtons goBack={false} />
        </div>
      </form>
    );
  },
  submit: function(e) {
    e.preventDefault();
    if (!this.state.koreanMode) {
      this.refs.street_ko.getDOMNode().value = this.refs.street_en.getDOMNode().value;
    }

    var formData = $(this.refs.form.getDOMNode()).serialize();

    this.handleShopSubmit(formData, this.props.url, this.props.method);
  },
  handleShopSubmit: function(formData, action, method) {
    $.ajax({
      data: formData,
      url: action,
      method: method,
      dataType: "json",
      success: function(data) {
        if (data.status == "success") {
          Turbolinks.visit(this.props.redirect_url);

          this.setState({
            errors: [],
          })
        }
        else {
          this.setState({
            errors: data.data, 
          });
        }
      }.bind(this)
    });
  },
  streetClick: function() {
    if (this.state.koreanMode == true) {
      openDaumPostcode(this.handleStreetClick);
    }
  },
  handleStreetClick: function(data) {
    this.setAddress(data.address, data.addressEnglish, data.zonecode);
  },
  countryChange: function() {
    var country = this.refs.country.getDOMNode().value;

    this.setAddress();

    if (country == this.props.config.default_country) {
      this.setState({koreanMode: true});
    }
    else {
      this.setState({koreanMode: false});
    }
  },
  setAddress: function(address, englishAddress, zipcode) {
    address = typeof address !== "undefined" ? address : "";
    englishAddress = typeof englishAddress !== "undefined" ? englishAddress : "";
    zipcode = typeof zipcode !== "undefined" ? zipcode : "";

    this.refs.street_ko.getDOMNode().value = address;
    this.refs.street_en.getDOMNode().value = englishAddress;
    this.refs.zip_code.getDOMNode().value = zipcode;
  }
});
