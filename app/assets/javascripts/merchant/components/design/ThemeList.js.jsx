window.design = window.design || {};

design.ThemeList = React.createClass({
  renderTheme: function(theme, key, isCurrent) {
    return (
      <div className="col-sm-3 theme" key={key}>
        <div className="block">
          <div className="overlay"></div>
          <button className="btn btn-lg btn-primary">{I18n.t("merchant.admin.buttons.view")}</button>
          <img className="img-responsive" src={theme.image.thumb.url} />
          {(isCurrent) ? <span className="label label-lg label-success pull-right">{I18n.t("merchant.admin.themes.current")}</span> : null}
          <h3>
            {theme.name} - {theme.version}
          </h3>
        </div>
      </div>
    )
  },
  render: function() {
    return (
      <div className="row">
        {this.props.themes.map(function(theme, index) {
          var isCurrent = false;

          if (this.props.current_theme.id == theme.id) {
            isCurrent = true
          }

          return this.renderTheme(theme, "theme_" + index, isCurrent);
        }.bind(this))}
      </div>
    )
  }
})
