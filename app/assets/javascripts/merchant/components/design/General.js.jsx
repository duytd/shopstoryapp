var design = {};

design.GeneralForm = React.createClass({
  getInitialState: function() {
    return {
      general: this.props.general,
    }
  },
  render: function() {
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
              {this.props.pages.map(function(page, index) {
                return <option key={"term_page_"+ index} value={page.id}>{page.title_ko ? page.title_ko : page.title_en}</option>
              })}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="label">{I18n.t("activerecord.attributes.shop.privacy_id")}</label>
          <div className="select">
            <select name="shop[privacy_id]" className="form-control" defaultValue={this.state.general.privacy_id}>
              {this.props.pages.map(function(page, index) {
                return <option key={"privacy_page_"+ index} value={page.id}>{page.title_ko ? page.title_ko : page.title_en}</option>
              })}
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
  submit: function(e) {
    e.preventDefault();

    var form = $(this.refs.form);

    $.ajax({
      url: Routes.merchant_design_general_path(),
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
})
