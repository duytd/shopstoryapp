var CategoryForm = React.createClass({
  getInitialState: function () {
    return {
      errors: {},
      name_ko_count: 0,
      name_en_count: 0
    };
  },
  render: function () {
    return (
      <form ref="form" className="category-form" action={this.props.url}
        acceptCharset="UTF-8" method={this.props.method} onSubmit={this.handleSubmit}>
        <LocaleNavTab ko_errors_count={this.state.name_ko_count} en_errors_count={this.state.name_en_count} />

        <div className="tab-content">
          <div id="ko" className="tab-pane fade in active">
            <div className="form-group">
              <label className="label">{I18n.t("activerecord.attributes.category.name")}</label>
              <div className="form-errors">
                { (this.state.errors.name_ko) ? this.state.errors.name_ko.map(function(object){
                  return object;
                }) : ""}
              </div>
              <input ref="name_ko" type="text" name="category[name_ko]"
                className="form-control" defaultValue={(this.props.ko_category) ? this.props.ko_category.name : ""} />
            </div>
          </div>
          <div id="en" className="tab-pane fade">
            <div className="form-group">
              <label className="label">{I18n.t("activerecord.attributes.category.name")}</label>
              <div className="form-errors">
                {(this.state.errors.name_en) ? this.state.errors.name_en.map(function(object){
                  return object;
                }) : ""}
              </div>
              <input ref="name_en" type="text" name="category[name_en]"
                className="form-control" defaultValue={(this.props.en_category) ? this.props.en_category.name : ""} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <SubmitButtons redirect_url={this.props.redirect_url} />
          </div>
        </div>
      </form>
    )
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var formData = $(this.refs.form).serialize();

    this.handleCategorySubmit(formData, this.props.url, this.props.method);
  },
  handleCategorySubmit: function(formData, action, method) {
    $.ajax({
      data: formData,
      url: action,
      method: method,
      dataType: "json",
      success: function(data) {
        Turbolinks.visit(Routes.merchant_categories_path());
      },
      error: function(xhr) {
        var errors = xhr.responseJSON;
        var name_ko_count = (errors.name_ko) ? errors.name_ko.length : 0;
        var name_en_count = (errors.name_en) ? errors.name_en.length : 0;

        this.setState({
          errors: errors,
          name_ko_count: name_ko_count,
          name_en_count: name_en_count
        });
      }.bind(this)
    });
  },
});
