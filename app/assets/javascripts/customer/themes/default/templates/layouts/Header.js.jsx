var Header = React.createClass({
  getInitialState: function() {
    return {
      isCartOpened: false
    }
  },
  render: function() {
    var logInRegisterLink = (
      <span>
        <a href="/auth/doindie">{I18n.t("buttons.login")}</a>
        <a href="/register/signup">{I18n.t("buttons.register")}</a>
      </span>
    );

    var logOutLink = <a href="/logout">{I18n.t("buttons.logout")}</a>;
    var itemCount = 0;
    var isCartOpened = this.props.isCartOpened || this.state.isCartOpened;

    this.props.globalVars.cart.forEach(function(item) {
      itemCount += item.quantity;
    });

    return (
      <header className="header">
        <div className="container-fluid top">
          <div className="pull-left">
            {(this.props.globalVars.current_customer) ? logOutLink : logInRegisterLink}
          </div>

          <div className="pull-right languages">
            <a href="?locale=ko">{I18n.t("languages.korean")}</a>
            <a href="?locale=en">{I18n.t("languages.english")}</a>
          </div>
        </div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                data-target="#shopstory-navbar-collapse" aria-expanded="false">
                <span className="sr-only"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">{this.props.globalVars.shop_name}</a>
            </div>

            <div className="collapse navbar-collapse" id="shopstory-navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li className="cart">
                  <a href="#" onClick={this.openCart}>
                    <i className="fa fa-shopping-cart"></i>
                    {"(" + itemCount + ")"}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Cart
          globalVars = {this.props.globalVars}
          isCartOpened = {isCartOpened}
          openCart = {this.openCart}
          closeCart = {this.closeCart}
          updateCart = {this.props.updateCart}
          cartErrors = {this.props.cartErrors}
          setCartErrors = {this.props.setCartErrors}
          emptyCartErrors = {this.props.emptyCartErrors}
        />
      </header>
    );
  },
  openCart: function() {
    this.setState({isCartOpened: true});
  },
  closeCart: function() {
    this.setState({isCartOpened: false});

    if (this.props.closeCart) {
      this.props.closeCart();
    }
  }
});
