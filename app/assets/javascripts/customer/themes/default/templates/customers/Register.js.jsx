/* Customer registration form */

var Register = React.createClass({
  getInitialState: function() {
    return {
      errors: []
    }
  },
  render: function() {
    var errorNodes = this.state.errors.map(function(error) {
      return <li>{error}</li>;
    })

    return (
      <Layout globalVars={this.props.globalVars}>
        <div className="register col-md-6 col-md-offset-3">
          <h1 className="title">{I18n.t("customers.register.title")}</h1>
          <form ref="form" method="post" acceptCharset="UTF-8" action={this.url} onSubmit={this.submit}>
            <ul className="alert alert-danger">
              {errorNodes}
            </ul>
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
              <p className="small pull-left">
                {I18n.t("customers.register.texts.return_customer")}
                <a href="/login">{I18n.t("buttons.login")}</a>
              </p>
              <input type="submit" className="btn btn-lg btn-primary pull-right" value={I18n.t("buttons.register")} />
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
            errors: data.errors
          });
        }
      }.bind(this)
    });
  }
});
