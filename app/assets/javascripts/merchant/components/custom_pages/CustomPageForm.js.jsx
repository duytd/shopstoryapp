var CustomPageForm = React.createClass({
  getInitialState: function () {
    return {
      errors: {},
      errors_en_count: 0,
      errors_ko_count: 0
    };
  },
  render: function () {
    return (
      <form ref="form" className="custom-page-form" action={this.props.url}
        acceptCharset="UTF-8" method={this.props.method} onSubmit={this.handleSubmit}>

        <LocaleNavTab ko_errors_count={this.state.errors_ko_count} en_errors_count={this.state.errors_en_count} />

        <div className="tab-content">
          <div id="ko" className="tab-pane fade in active">
            <div className="form-group">
              <label className="label">{I18n.t("activerecord.attributes.custom_page.title")}</label>
              <div className="form-errors">
                { (this.state.errors.title_ko) ? this.state.errors.title_ko.map(function(object){
                  return object;
                }) : ""}
              </div>
              <input ref="title_ko" type="text" name="custom_page[title_ko]"
                className="form-control" defaultValue={(this.props.custom_page_ko) ? this.props.custom_page_ko.title : ""} />
            </div>

            <div className="form-group">
              <label className="label">{I18n.t("activerecord.attributes.custom_page.content")}</label>
              <div className="form-errors">
                { (this.state.errors.content_ko) ? this.state.errors.content_ko.map(function(object){
                  return object;
                }) : ""}
              </div>
              <textarea name="custom_page[content_ko]"
                className="form-control summernote" defaultValue={(this.props.custom_page_ko) ? this.props.custom_page_ko.content : ""}>
              </textarea>
            </div>
          </div>
          <div id="en" className="tab-pane fade">
            <div className="form-group">
              <label className="label">{I18n.t("activerecord.attributes.custom_page.title")}</label>
              <div className="form-errors">
                {(this.state.errors.title_en) ? this.state.errors.title_en.map(function(object){
                  return object;
                }) : ""}
              </div>
              <input ref="title_en" type="text" name="custom_page[title_en]"
                className="form-control" defaultValue={(this.props.custom_page_en) ? this.props.custom_page_en.title : ""} />
            </div>

            <div className="form-group">
              <label className="label">{I18n.t("activerecord.attributes.custom_page.content")}</label>
              <div className="form-errors">
                { (this.state.errors.content_en) ? this.state.errors.content_en.map(function(object){
                  return object;
                }) : ""}
              </div>
              <textarea name="custom_page[content_en]"
                className="form-control summernote" defaultValue={(this.props.custom_page_en) ? this.props.custom_page_en.content : ""}>
              </textarea>
            </div>
          </div>
        </div>

        {(this.props.slug) ?
          <div className="form-group">
            <label className="label">{I18n.t("activerecord.attributes.custom_page.slug")}</label>
            <div className="form-errors">
              { (this.state.errors.slug) ? this.state.errors.slug.map(function(object){
                return object;
              }) : ""}
            </div>
            <input type="text" name="custom_page[slug]"
              className="form-control" defaultValue={this.props.slug} />
          </div>
        : ""}

        <div className="row">
          <div className="col-md-12">
            <SubmitButtons redirect_url={Routes.merchant_custom_pages_path()} />
          </div>
        </div>
      </form>
    )
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var formData = $(this.refs.form.getDOMNode()).serialize();

    this.handleCustomPageSubmit(formData, this.props.url, this.props.method);
  },
  handleCustomPageSubmit: function(formData, action, method) {
    $.ajax({
      data: formData,
      url: action,
      method: method,
      dataType: "json",
      success: function(data) {
        Turbolinks.visit(Routes.merchant_custom_pages_path());
      },
      error: function(xhr) {
        var errors = xhr.responseJSON,
          title_en_count = (errors.title_en) ? errors.title_en.length : 0,
          title_ko_count = (errors.title_ko) ? errors.title_ko.length : 0,
          content_en_count = (errors.content_en) ? errors.content_en.length : 0,
          content_ko_count = (errors.content_ko) ? errors.content_ko.length : 0;

        this.setState({
          errors: errors,
          errors_en_count: title_en_count + content_en_count,
          errors_ko_count: title_ko_count + content_ko_count
        });
      }.bind(this)
    });
  },
});
