var LoginForm = React.createClass({
  getInitialState: function() {
    return {
      error: ""
    }
  },
  render: function() {
    var errorNode = <ul className="alert alert-danger"><li>{this.state.error}</li></ul>;

    return (
      <form ref="form" method="post" acceptCharset="UTF-8" action={this.url} onSubmit={this.submit}>
        <div className="form-group">
          {(this.state.error != "") ? errorNode : ""}
        </div>
        <div className="form-group">
          <label htmlFor="customer_email">
            {I18n.t("customers.login.fields.email")}
          </label>
          <input type="email" id="customer_email" name="customer[email]" className="form-control"
            autoFocus="autofocus" />
        </div>

        <div className="form-group">
          <label htmlFor="customer_password">
            {I18n.t("customers.login.fields.password")}
          </label>
          <input type="password" id="customer_password" name="customer[password]"
            className="form-control" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="customer_remember_me" className="styled-cb">
            <input type="hidden" value="0" name="customer[remember_me]" />
            <input type="checkbox" id="customer_remember_me" name="customer[remember_me]" value="1" />
            <i className="fa"></i>
            {I18n.t("customers.login.texts.remember")}
          </label>
          <input type="submit" className="btn btn-lg btn-primary pull-right" value={I18n.t("buttons.login")} />
          <p className="small">
            {I18n.t("customers.login.texts.new_customer")}
            <a href="/register/signup">{I18n.t("buttons.register")}</a>
          </p>
        </div>
      </form>
    );
  },
  submit: function(e) {
    e.preventDefault();
    var formData = $(this.refs.form.getDOMNode()).serialize();

    this.handleSubmit(formData);
  },
  handleSubmit: function(formData) {
    var url = Routes.customer_session_path();

    if (this.props.redirect_url) {
      if (url.indexOf("?") != -1)
        url += "&redirect_url=" + encodeURIComponent(this.props.redirect_url);
      else
        url += "?redirect_url=" + encodeURIComponent(this.props.redirect_url);
    }

    $.ajax({
      data: formData,
      url: url,
      method: "post",
      dataType: "json",
      success: function(data) {
        if (data.status == "success") {
          Turbolinks.visit(data.redirect_url);
        }
        else {
          this.setState({
            error: data.error
          });
        }
      }.bind(this)
    });
  }
});
