var Header = React.createClass({
  render: function() {
    var logInRegisterLink = <span><a href="/login">{I18n.t("buttons.login")}</a>
      <a href="/register/signup">{I18n.t("buttons.register")}</a></span>;
    var logOutLink = <a href="/logout">{I18n.t("buttons.logout")}</a>;

    return (
      <header className="header">
        <div className="container-fluid top">
          <div className="pull-left">
            {(this.props.globalVars.logged_in) ? logOutLink : logInRegisterLink}
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
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
});
