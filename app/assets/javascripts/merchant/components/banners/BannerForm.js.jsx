var BannerForm = React.createClass({
  getInitialState: function () {
    var bannerItems = this.props.banner_items ? this.props.banner_items : [];

    return {
      errors: {},
      bannerItems: bannerItems
    };
  },
  render: function () {
    return (
      <form ref="form" className="banner-form" action={this.props.url}
        acceptCharset="UTF-8" method={this.props.method} onSubmit={this.handleSubmit}>
        <div className="block">
          <div className="form-group">
            <label className="label">{I18n.t("activerecord.attributes.banner.name")}</label>
            <FormErrors errors={this.state.errors.name_ko} />
            <input ref="name_ko" type="text" name="banner[name_ko]"
              className="form-control" defaultValue={(this.props.ko_banner) ? this.props.ko_banner.name : ""} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <SubmitButtons redirect_url={this.props.redirect_url}>
              <a className="btn btn-primary" onClick={this.addBannerItem}>{I18n.t("merchant.admin.buttons.add_banner_item")}</a>
            </SubmitButtons>
          </div>
        </div>
      </form>
    )
  },
  addBannerItem: function(e) {
    e.preventDefault();
    var bannerItems = this.state.bannerItems;

    bannerItems.push({});
    this.setState({bannerItems: bannerItems});
  },
  removeBannerItem: function(item) {
    if (typeof item.id != "undefined") {

    }
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var formData = $(this.refs.form).serialize();

    this.handleBannerSubmit(formData, this.props.url, this.props.method);
  },
  handleBannerSubmit: function(formData, action, method) {
    $.ajax({
      data: formData,
      url: action,
      method: method,
      dataType: "json",
      success: function(data) {
        Turbolinks.visit(Routes.merchant_banners_path());
      },
      error: function(xhr) {
        var errors = xhr.responseJSON;

        this.setState({
          errors: errors,
        });
      }.bind(this)
    });
  }
})
