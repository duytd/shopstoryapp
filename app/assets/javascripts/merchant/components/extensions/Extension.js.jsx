var Extension = React.createClass({
  getInitialState: function() {
    return {
      installed_ids: this.props.installed_ids
    }
  },
  render: function() {
    var actionBtn = "";

    if (this.state.installed_ids.indexOf(this.props.extension.id) == -1) {
      actionBtn = (
        <a className="btn btn-success" href="#" onClick={this.install}>
          {I18n.t("merchant.admin.buttons.install")}
        </a>
      )
    
    } else {
      actionBtn = (
        <button className="btn btn-default" disabled>
          {I18n.t("merchant.admin.buttons.installed")}
        </button>
      )
    }
    
    return (
      <div className="block">
        <h1 className="title">{this.props.extension.title}</h1>
        <p>{this.props.extension.description}</p>
        {actionBtn}
     </div>
    )
  },
  install: function(e) {
    e.preventDefault();

    var url = Routes.merchant_extension_shop_extension_path(this.props.extension.id);

    $.ajax({
      url: url,
      method: "POST",
      success: function(extension) {
        var installed_ids = this.state.installed_ids;
    
        installed_ids.push(this.props.extension.id);
        this.setState({installed_ids: installed_ids});
      }.bind(this),
      error: function(xhr) {
        console.log(xhr.responseText);
      }
    });
  }
})
