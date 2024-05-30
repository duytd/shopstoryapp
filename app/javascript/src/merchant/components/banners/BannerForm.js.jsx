export default class BannerForm extends React.Component {
  getInitialState() {
    var bannerItems = this.props.banner_items ? this.props.banner_items : [];

    return {
      errors: {},
      bannerItems: bannerItems
    };
  },
  renderBannerItem(item, index) {
    return (
      <div className={"block " + ((item.destroy) ? "hide" : "")} id={"banner_item_" + index} key={"banner_item_" + index}>
        <a onClick={this.removeBannerItem.bind(this, item)} className="pull-right">
          <i className="fa fa-times-circle-o"></i>
        </a>
        {(typeof item.id !== "undefined") ?
          <input className="hidden" readOnly name={"banner[banner_items_attributes][" + index + "][id]"} value={item.id} /> : null}
        {(item.destroy) ?
        <input className="hidden" className="destroy" name={"banner[banner_items_attributes][" + index + "][_destroy]"} value={true} /> : null}
        <div className="form-group">
          <label className="label">{i18n.t("activerecord.attributes.banner_item.image")}</label>
          <input type="file" name={"banner[banner_items_attributes][" + index + "][image]"} />
            {(item.image) ? <img src={item.image.thumb.url} /> : null}
        </div>
        <div className="form-group">
          <label className="label">{i18n.t("activerecord.attributes.banner_item.text")}</label>
          <input type="text" name={"banner[banner_items_attributes][" + index + "][text]"} className="form-control" defaultValue={item.text} />
        </div>
        <div className="form-group">
          <label className="label">{i18n.t("activerecord.attributes.banner_item.link")}</label>
          <input type="text" name={"banner[banner_items_attributes][" + index + "][link]"} className="form-control" defaultValue={item.link} />
        </div>
        <div className="form-group">
          <label className="styled-cb">
            <input type="hidden" name={"banner[banner_items_attributes][" + index + "][show_image]"} value="0" />
            <input ref="checkbox" type="checkbox" name={"banner[banner_items_attributes][" + index + "][show_image]"} value="1"
              defaultChecked={(typeof item.show_image !== "undefined") ? item.show_image : true} />
            <i className="fa"></i>
            {i18n.t("activerecord.attributes.banner_item.show_image")}
          </label>
        </div>
      </div>
    )
  },
  render() {
    return (
      <form ref="form" className="banner-form" action={this.props.url}
        acceptCharset="UTF-8" method={this.props.method} onSubmit={this.handleSubmit}>
        <div className="block">
          <div className="form-group">
            <label className="label">{i18n.t("activerecord.attributes.banner.name")}</label>
            <FormErrors errors={this.state.errors.name} />
            <input ref="name" type="text" name="banner[name]"
              className="form-control" defaultValue={(this.props.banner) ? this.props.banner.name : ""} />
          </div>
        </div>

        {this.state.bannerItems.map(function(item, index) {
          return this.renderBannerItem(item, index);
        }.bind(this))}

        <div className="row">
          <div className="col-md-12">
            <SubmitButtons redirect_url={this.props.redirect_url}>
              <a className="btn btn-primary" onClick={this.addBannerItem}>{i18n.t("merchant.admin.buttons.add_banner_item")}</a>
            </SubmitButtons>
          </div>
        </div>
      </form>
    )
  },
  addBannerItem(e) {
    e.preventDefault();
    var bannerItems = this.state.bannerItems;

    bannerItems.push({});
    this.setState({bannerItems: bannerItems});
  },
  removeBannerItem(item) {
    var bannerItems = this.state.bannerItems;
    var index = bannerItems.indexOf(item);

    if (typeof item.id != "undefined") {
      item.destroy = true;
      bannerItems[index] = item;
    }
    else {
      bannerItems.splice(index, 1);
    }

    this.setState({bannerItems: bannerItems});
  },
  handleSubmit(e) {
    e.preventDefault();
    var form = $(this.refs.form);

    this.handleBannerSubmit(form, this.props.url, this.props.method);
  },
  handleBannerSubmit(form, action, method) {
    $.ajax({
      url: action,
      method: method,
      data: new FormData(form[0]),
      contentType: false,
      processData: false,
      dataType: "json",
      success: function(data) {
        Turbolinks.visit(Routes.merchant_banners_path.localize());
      },
      error: function(xhr) {
        var errors = xhr.responseJSON;

        this.setState({
          errors: errors,
        });
      }.bind(this)
    });
  }
}
