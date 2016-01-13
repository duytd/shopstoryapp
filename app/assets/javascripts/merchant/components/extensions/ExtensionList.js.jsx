var ExtensionList = React.createClass({
  render: function() {
    var extensionItems = this.props.extensions.map(function(extension, index) {
      return (
        <ExtensionItem 
          extension={extension} 
          key={"extension_" + index}
        />
      )
    }.bind(this))

    return (
      <div className="row">
        {extensionItems}
      </div>
    )
  },
})
