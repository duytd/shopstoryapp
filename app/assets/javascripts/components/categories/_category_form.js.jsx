var CategoryForm = React.createClass({
  getInitialState: function () {
    return {
      en_category: this.props.en_data,
      ko_category: this.props.ko_data,
      errors: {name_ko: [], name_en: []},
      name_ko_count: 0,
      name_en_count: 0
    };
  },
  render: function () {
    return (
      <form ref="form" className="category-form" action={this.props.url}
        accept-charset="UTF-8" method={this.props.method} onSubmit={this.handleSubmit}>
        <ul className="nav nav-tabs">
          <li className="active">
            <a data-toggle="tab" href="#ko">
              {I18n.t("merchant.admin.forms.ko_lang")}
              {(this.state.name_ko_count > 0) ? <span className="badge badge-danger">{this.state.name_ko_count}</span> : ""}
            </a>
          </li>
          <li>
            <a data-toggle="tab" href="#en">
              {I18n.t("merchant.admin.forms.en_lang")}
              {(this.state.name_en_count > 0) ? <span className="badge badge-danger">{this.state.name_en_count}</span> : ""}
            </a>
          </li>
        </ul>

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
                className="form-control" defaultValue={(this.state.ko_category) ? this.state.ko_category.name : ""} />
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
                className="form-control" defaultValue={(this.state.en_category) ? this.state.en_category.name : ""} />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-sm btn-success">{I18n.t("merchant.admin.buttons.save")}</button>
      </form>
    )
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var name_ko = this.refs.name_ko.getDOMNode().value.trim();
    var name_en = this.refs.name_en.getDOMNode().value.trim();
    var formData = $(this.refs.form.getDOMNode()).serialize();

    this.handleCategorySubmit(formData, this.props.url, this.props.method);
  },
  handleCategorySubmit: function(formData, action, method) {
    $.ajax({
      data: formData,
      url: action,
      method: method,
      dataType: "json",
      success: function(data) {
        if (data.status == "success") {
          Turbolinks.visit(this.props.redirect_url);
        }
        else {
          var name_ko_count = (data.data.name_ko) ? data.data.name_ko.length : 0;
          var name_en_count = (data.data.name_en) ? data.data.name_en.length : 0;

          this.setState({
            errors: data.data, 
            name_ko_count: name_ko_count,
            name_en_count: name_en_count
          });
        }
      }.bind(this)
    });
  },
});
