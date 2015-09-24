var SubmitButtons = React.createClass({
  render: function() {
    var goBackButton = <button onClick={this.goBack} className="btn btn-sm btn-default">
      {I18n.t("merchant.admin.buttons.cancel")}</button>
    goBackButton = (this.props.goBack == true) ? goBackButton : "";

    return (
      <div className="form-submit">
        {goBackButton}
        <button type="submit" className="btn btn-sm btn-success">{I18n.t("merchant.admin.buttons.save")}</button>
      </div>
    );
  },
  getDefaultProps: function() {
    return {
      goBack: true
    }
  },
  goBack: function(e) {
    e.preventDefault();
    Turbolinks.visit(this.props.redirect_url);
  },
});
