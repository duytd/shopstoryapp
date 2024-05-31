import React from 'react';
import I18n from 'i18n-js';
import SubmitButtons from '../../components/general/SubmitButtons';

export default class Webmaster extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    };
  }

  renderSeo() {
    return (
      <div className="row">
        <div className="col-md-12 block">
          <div className="form-group col-md-12">
            <label className="label">{I18n.t("activerecord.attributes.shop.meta_title")}</label>
            <input type="text" className="form-control" name="shop[meta_title]" defaultValue={this.props.shop.meta_title} />
          </div>
          <div className="form-group col-md-12">
            <label className="label">{I18n.t("activerecord.attributes.shop.meta_description")}</label>
            <input type="text" className="form-control" name="shop[meta_description]" defaultValue={this.props.shop.meta_description} />
          </div>
          <div className="form-group col-md-12">
            <label className="label">{I18n.t("activerecord.attributes.shop.meta_keywords")}</label>
            <input type="text" className="form-control" name="shop[meta_keywords]" defaultValue={this.props.shop.meta_keywords} />
          </div>
        </div>
      </div>
    )
  }

  renderVerificationCode() {
    return (
      <div className="row">
        <div className="col-md-12 block">
            <div className="form-group col-md-6">
              <label className="label">{I18n.t("activerecord.attributes.shop.google_verification_code")}</label>
              <input type="text" className="form-control" name="shop[google_verification_code]" defaultValue={this.props.shop.google_verification_code} />
            </div>
        </div>
        <div className="col-md-12 block">
            <div className="form-group col-md-6">
              <label className="label">{I18n.t("activerecord.attributes.shop.naver_verification_code")}</label>
              <input type="text" className="form-control" name="shop[naver_verification_code]" defaultValue={this.props.shop.naver_verification_code} />
            </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <form ref="form" id="webmaster-form" className="webmaster-form" action={this.props.url}
        acceptCharset="UTF-8" method={this.props.method} onSubmit={this.submit}>
        <div className="container">
          <h6 className="form-title row">{I18n.t("merchant.admin.webmaster.seo")}</h6>
          {this.renderSeo()}
          <h6 className="form-title row">{I18n.t("merchant.admin.webmaster.verification")}</h6>
          {this.renderVerificationCode()}
        </div>
        <div className="col-md-12 text-right">
          <SubmitButtons goBack={false} />
        </div>
      </form>
    );
  }

  submit = (e) => {
    e.preventDefault();
    var formData = $(this.refs.form).serialize();
    var method = this.props.method;
    var action = this.props.url;

    $.ajax({
      data: formData,
      url: action,
      method: method,
      dataType: "json",
      success: function(data) {
        window.location = this.props.redirect_url;
      }.bind(this),
      error: function(xhr) {
        this.setState({
          errors: xhr.responseJSON
        });
      }.bind(this)
    });
  }
};
