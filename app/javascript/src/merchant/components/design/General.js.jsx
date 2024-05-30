window.design = window.design || {};

export default class design.GeneralForm extends React.Component {
  getInitialState() {
    return {
      general: this.props.general,
    }
  },
  renderPages(type) {
    return (
      this.props.pages.map(function(page, index) {
        return (
          <option key={"page_" + type + "_" + index} value={page.id}>
            {translate(page, "title")}
          </option>
        )
      })
    )
  },
  render() {
    return (
      <form ref="form" className="design-general-form" action={this.props.url}
        acceptCharset="UTF-8" method="put" onSubmit={this.submit} encType="multipart/form-data">

        <div className="form-group">
          <label className="label">{I18n.t("activerecord.attributes.shop.logo")}</label>
          <input type="file" name="shop[logo]" />
          <img src={this.state.general.logo.thumb.url} height="30" />
        </div>

        <div className="form-group">
          <label className="label">{I18n.t("activerecord.attributes.shop.term_id")}</label>
          <div className="select">
            <select name="shop[term_id]" className="form-control" defaultValue={this.state.general.term_id}>
              {this.renderPages("term")}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="label">{I18n.t("activerecord.attributes.shop.privacy_id")}</label>
          <div className="select">
            <select name="shop[privacy_id]" className="form-control" defaultValue={this.state.general.privacy_id}>
              {this.renderPages("privacy")}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <SubmitButtons goBack={false} />
          </div>
        </div>
      </form>
    )
  },
  submit(e) {
    e.preventDefault();

    var form = $(this.refs.form);

    $.ajax({
      url: Routes.merchant_design_general_path.localize(),
      data: new FormData(form[0]),
      method: "put",
      contentType: false,
      processData: false,
      success: function(general) {
        this.setState({general: general});
      }.bind(this),
      error: function(xhr) {
        console.log(xhr.responseText);
      }
    })
  }
}