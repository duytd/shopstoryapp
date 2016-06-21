window.design = window.design || {};

design.Theme = React.createClass({
  getInitialState: function() {
    return {
      current: this.props.current
    }
  },
  render: function() {
    return (
      <div className="theme row">
        <div className="col-sm-6">
          <img className="img-responsive"src={this.props.theme.image.url} />
        </div>
        <div className="col-sm-6">
          <h2>{this.props.theme.name}</h2>
          <p>{this.props.theme.version}</p>
          <p>{this.props.theme.author}</p>
          <p>{this.props.theme.description}</p>
          {(this.state.current) ?
            <button className="btn btn-success disabled">{I18n.t("merchant.admin.buttons.current")}</button> :
            <button className="btn btn-primary" onClick={this.install}>
              {I18n.t("merchant.admin.buttons.choose")}
              <i ref="loading" className="fa fa-circle-o-notch fa-spin fa-fw hide"></i>
            </button>
          }
        </div>
      </div>
    )
  },
  install: function() {
    var loading = $(this.refs.loading);
    var url = this.props.install_url;
    var themeId = this.props.theme.id;

    $.ajax({
      url: url,
      data: {theme_id: themeId},
      method: "POST",
      beforeSend: function() {
        loading.removeClass("hide");
      },
      complete: function() {
        loading.addClass("hide");
      },
      success: function() {
        this.setState({current: true});
      }.bind(this)
    })
  }
})
