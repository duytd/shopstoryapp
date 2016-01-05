var Checkout = React.createClass({
  componentWillMount: function() {
    if (this.props.globalVars.current_customer)
      Turbolinks.visit(Routes.new_customer_order_path());
  },
  render: function() {
    return (
      <Layout globalVars={this.props.globalVars}>
        <div className="row checkout">
          <div className="col-sm-6">
            <h2>{I18n.t("checkout.texts.returning_customer")}</h2>
            <h3>{I18n.t("buttons.login")}</h3>
            <LoginForm redirect_url={Routes.new_customer_order_path()} />
          </div>

          <div className="col-sm-6 text-center">
            <h2>{I18n.t("checkout.texts.new_customer")}</h2>

            <a className="btn btn-lg btn-default" href={Routes.new_customer_registration_path()}>
              {I18n.t("buttons.register")}
            </a>

            <h3>{I18n.t("checkout.texts.or")}</h3>

            <a className="btn btn-lg btn-primary" href={Routes.new_customer_order_path()}>
              {I18n.t("checkout.texts.checkout_as_guest")}
            </a>
          </div>
        </div>
      </Layout>
    )
  }
})
