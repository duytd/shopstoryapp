import React from 'react';
import I18n from 'i18n-js';


export default class ThemeList extends React.Component {
  renderTheme(theme, key, isCurrent) {
    return (
      <div className="col-sm-3 theme" key={key}>
        <div className="block">
          <div className="overlay"></div>
          <a className="btn btn-lg btn-primary" href={Routes.merchant_design_theme_path.localize(theme.id)}>{I18n.t("merchant.admin.buttons.view")}</a>
          <img className="img-thumbnail" src={theme.image.thumb.url} />
          {(isCurrent) ? <span className="label label-lg label-success pull-right">{I18n.t("merchant.admin.themes.current")}</span> : null}
          <h3>
            {theme.name} - {theme.version}
          </h3>
        </div>
      </div>
    )
  }

  render() {
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
}
