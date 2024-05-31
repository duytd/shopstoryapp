import React from 'react';
import I18n from 'i18n-js';
import FormErrors from '../../components/general/FormErrors';
import SubmitButtons from '../../components/general/SubmitButtons'

export default class ShopForm extends React.Component {
  constructor(props) {
    super(props);

    var koreanMode = (!this.props.shop.country ||
      (this.props.shop.country == this.props.config.default_country)) ? true : false;

    this.state = {
      koreanMode: koreanMode,
      errors: {},
    };
  }

  render() {
    var countryNodes = this.props.countries.map(function (country, index) {
      return <option key={index} value={country[0]}>{country[1]}</option>
    }.bind(this));

    var currencyNodes = this.props.currencies.map(function (currency, index) {
      return <option key={index} value={currency[0]}>{currency[1]}</option>
    }.bind(this));

    var timeZoneNodes = this.props.time_zones.map(function (timeZone, index) {
      return <option key={index} value={timeZone[0]}>{timeZone[1]}</option>
    }.bind(this));

    var socialAccountNodes = ["facebook_url", "instagram_url", "pinterest_url"].map(function(account, index) {
      return (
        <div className="form-group col-sm-6" key={"social" + index}>
          <label className="label">{I18n.t("activerecord.attributes.shop." + account)}</label>
          <input type="text" className="form-control" name={"shop[" + account +"]"}
            defaultValue={this.props.shop[account]} />
        </div>
      )
    }.bind(this))

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
                <FormErrors errors={this.state.errors.name} />
              </div>
              <div className="form-group col-md-6">
                <label className="label">{I18n.t("activerecord.attributes.shop.email")}</label>
                <input type="text" className="form-control" name="shop[email]" defaultValue={this.props.shop.email} />
                <FormErrors errors={this.state.errors.email} />
              </div>

              <div className="form-group col-md-6">
                <label className="label">{I18n.t("activerecord.attributes.shop.domain")}</label>
                <div className="input-group">
                  <span className="input-group-addon" id="basic-addon1">http://</span>
                  <input type="text" className="form-control" placeholder="yourdomain.com" name="shop[domain]" defaultValue={this.props.shop.domain} />
                </div>
                <FormErrors errors={this.state.errors.domain} />
              </div>

            </div>
          </div>
        </div>

        <div className="col-md-12">
          <h4 className="form-title">{I18n.t("merchant.admin.shops.business_information")}</h4>
          <div className="row">
            <div className="col-md-12 block">
              <div className="form-group col-md-4">
                <label className="label">{I18n.t("activerecord.attributes.shop.legal_name")}</label>
                <input type="text" className="form-control" name="shop[legal_name]" defaultValue={this.props.shop.legal_name} />
              </div>
              <div className="form-group col-md-4">
                <label className="label">{I18n.t("activerecord.attributes.shop.business_number")}</label>
                <input type="text" className="form-control" name="shop[business_number]" defaultValue={this.props.shop.business_number} />
              </div>
              <div className="form-group col-md-4">
                <label className="label">{I18n.t("activerecord.attributes.shop.ceo")}</label>
                <input type="text" className="form-control" name="shop[ceo]" defaultValue={this.props.shop.ceo} />
              </div>
              <div className="form-group col-md-6">
                <label className="label">{I18n.t("activerecord.attributes.shop.service_phone")}</label>
                <input type="text" className="form-control" name="shop[service_phone]" defaultValue={this.props.shop.service_phone} />
              </div>
              <div className="form-group col-md-6">
                <label className="label">{I18n.t("activerecord.attributes.shop.online_retail_number")}</label>
                <input type="text" className="form-control" name="shop[online_retail_number]" defaultValue={this.props.shop.online_retail_number} />
              </div>
              <div className="form-group col-md-6">
                <label className="label">{I18n.t("activerecord.attributes.shop.privacy_manager")}</label>
                <input type="text" className="form-control" name="shop[privacy_manager]" defaultValue={this.props.shop.privacy_manager} />
              </div>
              <div className="form-group col-md-6">
                <label className="label">{I18n.t("activerecord.attributes.shop.privacy_email")}</label>
                <input type="text" className="form-control" name="shop[privacy_email]" defaultValue={this.props.shop.privacy_email} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <h4 className="form-title">{I18n.t("merchant.admin.shops.contact")}</h4>
          <div className="row">
            <div className="col-md-12 block">
              <div className="form-group col-md-4">
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

              {(!this.state.koreanMode) ?
              <div className="form-group col-md-4">
                <label className="label">{I18n.t("activerecord.attributes.shop.city")}</label>
                <input type="text" className="form-control" name="shop[city]" defaultValue={this.props.shop.city} />
              </div> : null}

              <div className="form-group col-md-4">
                <label className="label">
                  {I18n.t("activerecord.attributes.shop.zip_code")}
                  <span className="hint">
                    {(this.state.koreanMode) ? I18n.t("merchant.admin.shops.zipcode_hint") : ""}
                  </span>
                </label>
                <input type="text" ref="zip_code" readOnly={this.state.koreanMode} className="form-control"
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

              <div className="form-group col-md-6">
                <label className="label">{I18n.t("activerecord.attributes.shop.exchange_rate")}</label>
                <input type="text" className="form-control" name="shop[exchange_rate]"
                  defaultValue={this.props.shop.exchange_rate} />
              </div>

            </div>
          </div>
        </div>

        <div className="col-md-12">
          <h4 className="form-title">{I18n.t("merchant.admin.shops.social")}</h4>
          <div className="row">
            <div className="col-md-12 block">
              {socialAccountNodes}
            </div>
          </div>
        </div>
        <div className="col-md-12 text-right">
          <SubmitButtons goBack={false} />
        </div>
      </form>
    );
  }

  submit = (e) => {
    e.preventDefault();
    if (!this.state.koreanMode) {
      this.refs.street_ko.value = this.refs.street_en.value;
    }

    var formData = $(this.refs.form).serialize();

    this.handleShopSubmit(formData, this.props.url, this.props.method);
  }

  handleShopSubmit(formData, action, method) {
    $.ajax({
      data: formData,
      url: action,
      method: method,
      dataType: "json",
      success: function(data) {
        window.location = Routes.merchant_root_path.localize();

        this.setState({
          errors: [],
        })
      }.bind(this),
      error: function(xhr) {
        this.setState({
          errors: xhr.responseJSON,
        });
      }.bind(this)
    });
  }

  streetClick = () => {
    if (this.state.koreanMode) {
      openDaumPostcode(this.handleStreetClick);
    }
  }

  handleStreetClick(data) {
    this.setAddress(data.address, data.addressEnglish, data.zonecode);
  }

  countryChange = () => {
    var country = this.refs.country.value;

    this.setAddress();

    if (country == this.props.config.default_country) {
      this.setState({koreanMode: true});
    }
    else {
      this.setState({koreanMode: false});
    }
  }

  setAddress(address, englishAddress, zipcode) {
    address = typeof address !== "undefined" ? address : "";
    englishAddress = typeof englishAddress !== "undefined" ? englishAddress : "";
    zipcode = typeof zipcode !== "undefined" ? zipcode : "";

    this.refs.street_ko.value = address;
    this.refs.street_en.value = englishAddress;
    this.refs.zip_code.value = zipcode;
  }
};
