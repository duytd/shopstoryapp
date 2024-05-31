import React from 'react';
import I18n from 'i18n-js';
import FormErrors from '../../components/general/FormErrors'

export default class Setup extends React.Component {
  constructor(props) {
    super(props);

    var currentStep = this.props.current_step;

    this.state = {
      currentStep: currentStep,
      errors: []
    };
  }

  renderProvideBusinessInfo() {
    return (
      <form ref="shop_form">
        <h4 className="form-title">{I18n.t("merchant.admin.shops.business_information")}</h4>
        <div className="row">
          <div className="form-group col-md-12">
            <label className="label">{I18n.t("activerecord.attributes.shop.legal_name")}</label>
            <FormErrors errors={this.state.errors.legal_name} />
            <input type="text" className="form-control" name="shop[legal_name]" defaultValue={this.props.shop.legal_name} />
          </div>
          <div className="form-group col-md-6">
            <label className="label">{I18n.t("activerecord.attributes.shop.business_number")}</label>
            <input type="text" className="form-control" name="shop[business_number]" defaultValue={this.props.shop.business_number} />
          </div>
          <div className="form-group col-md-6">
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
      </form>
    )
  }

  renderGenerateSampleData() {
    return (
      <p>{I18n.t("merchant.admin.after_signup.generate_sample_data")}</p>
    )
  }

  renderDone() {
    return (
      <p><i className="fa fa-check text-green"></i> {I18n.t("merchant.admin.after_signup.done")}</p>
    )
  }

  skip = (e) => {
    e.preventDefault();

    var url = this.props.skip_url;

    $.ajax({
      method: "POST",
      url: url,
      success: function(response) {
        var step = response.current_step;

        this.setState({currentStep: step});
        if (step == "done") {
          this.setState({currentStep: step, errors: []}, function() {
            window.location = response.redirect_url;
          });
        }
        else {
          this.setState({currentStep: step, errors: []});
        }
      }.bind(this),
      error: function(xhr) {
        alert(xhr.responseText);
      }
    })
  }

  next = (e) => {
    e.preventDefault();

    var url = this.props.next_url;
    var data = null;

    if (this.state.currentStep == "provide_business_info") {
      data = $(this.refs.shop_form).serialize();
    }

    $.ajax({
      method: "PUT",
      url: url,
      data: data,
      success: function(response) {
        var step = response.current_step;

        if (step == "done") {
          this.setState({currentStep: step, errors: []}, function() {
            window.location = response.redirect_url;
          });
        }
        else {
          this.setState({currentStep: step, errors: []});
        }
      }.bind(this),
      error: function(xhr) {
        this.setState({errors: xhr.responseJSON});
      }.bind(this)
    })
  }

  render() {
    var form = null;

    switch(this.state.currentStep) {
      case "provide_business_info":
        form = this.renderProvideBusinessInfo();
        break;
      case "generate_sample_data":
        form = this.renderGenerateSampleData();
        break;
      default:
        form = this.renderDone();
        break;
    }

    return (
      <div className="col-md-8 col-md-offset-2">
        <div className="block">
          {form}
          {(this.state.currentStep != "done") ?
          <div className="mt-3">
            <button className="btn btn-success" onClick={this.skip}>{I18n.t("merchant.admin.buttons.skip")}</button>
            <button className="btn btn-danger" onClick={this.next}>{I18n.t("merchant.admin.buttons.next")}</button>
          </div> : null}
        </div>
      </div>
    )
  }
}
