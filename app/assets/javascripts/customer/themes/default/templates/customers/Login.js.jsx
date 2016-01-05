var Login = React.createClass({
  render: function() {
    return (
      <Layout globalVars={this.props.globalVars}>
        <div className="login col-md-6 col-md-offset-3">
          <h1 className="title">{I18n.t("customers.login.title")}</h1>
          <LoginForm />
        </div>
      </Layout>
    )
  }
})
