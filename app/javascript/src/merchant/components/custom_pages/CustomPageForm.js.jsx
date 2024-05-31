export default class CustomPageForm extends React.Component {
  mixins: [FormMixin],
  getInitialState() {
    return {
      errors: {},
      errors_en_count: 0,
      errors_ko_count: 0
    };
  },
  componentDidMount() {
    this.loadSummernote();
  },
  render() {
    return (
      <form ref="form" className="custom-page-form" action={this.props.url}
        acceptCharset="UTF-8" method={this.props.method} onSubmit={this.handleSubmit}>

        <div className="block">
          <LocaleNavTab ko_errors_count={this.state.errors_ko_count} en_errors_count={this.state.errors_en_count} />

          <div className="tab-content">
            <div id="ko" className="tab-pane fade in active">
              <div className="form-group">
                <label className="label">{I18n.t("activerecord.attributes.custom_page.title")}</label>
                <FormErrors errors={this.state.errors.title_ko} />
                <input ref="title_ko" type="text" name="custom_page[title_ko]"
                  className="form-control" defaultValue={(this.props.custom_page) ? this.props.custom_page.title_ko : ""} />
              </div>

              <div className="form-group">
                <label className="label">{I18n.t("activerecord.attributes.custom_page.content")}</label>
                <FormErrors errors={this.state.errors.content_ko} />
                <textarea name="custom_page[content_ko]" ref="content_ko"
                  className="form-control summernote" defaultValue={(this.props.custom_page) ? this.props.custom_page.content_ko : ""}>
                </textarea>
              </div>
            </div>
            <div id="en" className="tab-pane fade">
              <div className="form-group">
                <label className="label">{I18n.t("activerecord.attributes.custom_page.title")}</label>
                <FormErrors errors={this.state.errors.title_en} />
                <input ref="title_en" type="text" name="custom_page[title_en]"
                  className="form-control" defaultValue={(this.props.custom_page) ? this.props.custom_page.title_en : ""} />
              </div>

              <div className="form-group">
                <label className="label">{I18n.t("activerecord.attributes.custom_page.content")}</label>
                <FormErrors errors={this.state.errors.content_en} />
                <textarea name="custom_page[content_en]" ref="content_en"
                  className="form-control summernote" defaultValue={(this.props.custom_page) ? this.props.custom_page.content_en : ""}>
                </textarea>
              </div>
            </div>
          </div>

          {(this.props.custom_page && this.props.custom_page.slug) ?
            <div className="form-group">
              <label className="label">{I18n.t("activerecord.attributes.custom_page.slug")}</label>

              <FormErrors errors={this.state.errors.slug} />
              <input type="text" name="custom_page[slug]"
                className="form-control" defaultValue={this.props.custom_page.slug} />
            </div>
          : null}
        </div>

        <SeoTag modelName="custom_page" seo_tag={this.props.seo_tag} errors={this.state.errors} />

        <div className="row">
          <div className="col-md-12">
            <SubmitButtons redirect_url={Routes.merchant_custom_pages_path.localize()} fixed={true} />
          </div>
        </div>
      </form>
    )
  },
  handleSubmit(e) {
    e.preventDefault();
    var formData = $(this.refs.form).serialize();

    this.handleCustomPageSubmit(formData, this.props.url, this.props.method);
  },
  handleCustomPageSubmit(formData, action, method) {
    $.ajax({
      data: formData,
      url: action,
      method: method,
      dataType: "json",
      success: function(data) {
        window.location = Routes.merchant_custom_pages_path.localize();
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
}
