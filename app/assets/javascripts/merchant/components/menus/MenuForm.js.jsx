var MenuForm = React.createClass({
  getInitialState: function () {
  },
  render: function () {
    return (
      <form ref="form" className="menu-form" action={this.props.url}
        acceptCharset="UTF-8" method={this.props.method} onSubmit={this.submit}>
      </form>
    )
  },
  submit: function(e) {
    e.preventDefault();
    var formData = $(this.refs.form).serialize(),
      url = this.props.url,
      method = this.props.method;

    $.ajax({
      data: formData,
      url: action,
      method: method,
      dataType: "json",
      success: function(data) {
        Turbolinks.visit(Routes.merchant_menus_path());
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
  }
});
