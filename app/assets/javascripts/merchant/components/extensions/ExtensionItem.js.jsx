var ExtensionItem = React.createClass({
  render: function() {
    return(
      <div className="col-sm-3">
        <div className="block">
          <h3>{this.props.extension.title}</h3>
          <a className="btn btn-primary" href={Routes.merchant_extension_path(this.props.extension.id)}>
            {I18n.t("merchant.admin.buttons.view")}
          </a>
        </div>
      </div>
    )
  }
})
