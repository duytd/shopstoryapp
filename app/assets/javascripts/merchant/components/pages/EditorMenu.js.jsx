var EditorMenu = React.createClass({
  render: function() {
    var javascriptNodes = this.props.javascripts.map(function(javascript, index) {
      return <li key={"javascript_" + index}><a onClick={this.updateAsset.bind(this, javascript.id)}>{javascript.name}</a></li>
    }.bind(this))

    var stylesheetNodes = this.props.stylesheets.map(function(stylesheet, index) {
      return <li key={"stylesheet_" + index}><a onClick={this.updateAsset.bind(this, stylesheet.id)}>{stylesheet.name}</a></li>
    }.bind(this))

    var localeNodes = this.props.locales.map(function(locale, index) {
      return <li key={"locale_" + index}><a onClick={this.updateAsset.bind(this, locale.id)}>{locale.name}</a></li>
    }.bind(this))

    var templateNodes = [];
    var temp = null;

    if (this.props.templates.templates) {
      temp = this.props.templates["templates"];
      delete this.props.templates["templates"]
      this.props.templates["templates"] = temp;
    }

    $.each(this.props.templates, function(key,value){
      var templateGroup = (
        <li key={"group_template_" + key}>
          {(key != "templates") ?
          <a><span><i className="fa fa-folder"></i></span>{key}</a> : null}
          <ul>
            {value.map(function(template) {
              return <li><a onClick={this.updateTemplate.bind(this, template.id)}>{template.name}</a></li>
            }.bind(this))}
          </ul>
        </li>
      )

      templateNodes.push(templateGroup);
    }.bind(this))

    return (
      <div className="editor-menu">
        <h4>
          <span><i className="fa fa-folder-o"></i></span>
          {I18n.t("merchant.admin.assets.stylesheets")}
        </h4>
        <ul>
          {stylesheetNodes}
        </ul>
        <h4>
          <span><i className="fa fa-folder-o"></i></span>
          {I18n.t("merchant.admin.assets.javascripts")}
        </h4>
        <ul>
          {javascriptNodes}
        </ul>
        <h4>
          <span><i className="fa fa-folder-o"></i></span>
          {I18n.t("merchant.admin.assets.translations")}
        </h4>
        <ul>
          {localeNodes}
        </ul>
        <h4>
          <span><i className="fa fa-folder-o"></i></span>
          {I18n.t("merchant.admin.templates.title")}
        </h4>
        <ul>
          {templateNodes}
        </ul>
      </div>
    )
  },
  updateAsset: function(assetId) {
    $.get(Routes.edit_merchant_asset_path(assetId), function(response) {
      var mode = "javascript";

      if (response.data.type == "asset/stylesheet")
        mode = "css"

      if (response.data.type == "asset/locale")
        mode = "json"

      this.props.updateFile(response.data, response.url, response.reset_url, mode);
    }.bind(this))
  },
  updateTemplate: function(templateId) {
    $.get(Routes.edit_merchant_template_path(templateId), function(response) {
      this.props.updateFile(response.data, response.url, response.reset_url, "html");
    }.bind(this))
  }
})
