var Credentials = React.createClass({
  getInitialState: function() {
    return {
      credentials: this.props.credentials
    }
  },
  render: function() {
    var credentials = (
      <div className="block">
        <div className="row">
          <div className="col-sm-9">
            <div className="col-sm-3">
              <label>{I18n.t("shopstory_ticket.admin.settings.client_id")}</label>
            </div>
            <div className="col-sm-9">
              {this.state.credentials ? this.state.credentials.client_id : ""}
            </div>
          </div>
        </div>

        <hr/>

        <div className="row">
          <div className="col-sm-9">
            <div className="col-sm-3">
              <label>{I18n.t("shopstory_ticket.admin.settings.api_key")}</label>
            </div>
            <div className="col-sm-9">
             {this.state.credentials ? this.state.credentials.api_key : ""}
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <h3 className="title">
          {I18n.t("shopstory_ticket.admin.settings.title")}
        </h3>

        <div className="setting-information">
          {credentials}
          <hr/>

          <button className="btn btn-primary" onClick={this.regenerateAPIKey}>{I18n.t("shopstory_ticket.admin.buttons.regenerate_api_key")}</button>
        </div>
      </div>
    );
  },
  regenerateAPIKey: function(e) {
    e.preventDefault();

    $.ajax({
      method: "PUT",
      url: Routes.shopstory_ticket_admin_setting_path() + "?type=regenerate_key",
      data: null,
      success: function(credentials) {
        this.updateCredentials(credentials);
      }.bind(this),
      error: function(xhr) {
        console.log(xhr.responseText);
      }
    });
  },
  updateCredentials: function(credentials) {
    this.setState({credentials: credentials});
  },
})
