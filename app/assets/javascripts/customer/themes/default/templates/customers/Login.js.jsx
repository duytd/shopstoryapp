/* Customer login form */

var Login = React.createClass({
  getInitialState: function() {
    return {
      error: ""
    }
  },
  render: function() {
    var errorNode = <ul className="alert alert-danger"><li>{this.state.error}</li></ul>;

    return (
      <Layout globalVars={this.props.globalVars}>
        <div className="login col-md-6 col-md-offset-3">
          <h1 className="title">{I18n.t("customers.login.title")}</h1>
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
        </div>
      </Layout>
    );
  },
  submit: function(e) {
    e.preventDefault();
    var formData = $(this.refs.form.getDOMNode()).serialize();

    this.handleSubmit(formData, this.props.url);
  },
  handleSubmit: function(formData, action, method) {
    $.ajax({
      data: formData,
      url: action,
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
