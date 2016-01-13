var ExtensionBox = React.createClass({
  render: function() {
    var extensionList = (
      <ExtensionList
        extensions={this.props.extensions}
        installed_ids={this.props.installed_ids}
      />
    )

    return (
      <Box name="extension"
        wrapper="block transparent"
        list={extensionList} 
        url={this.props.url}
        title={I18n.t("merchant.admin.extensions.title")} 
      />
    );
  }
});
