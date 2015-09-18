var SubmitButtons = React.createClass({
  render: function() {
    return (
      <div className="form-submit">
        <button onClick={this.goBack} className="btn btn-sm btn-default">{I18n.t("merchant.admin.buttons.cancel")}</button>
        <button type="submit" className="btn btn-sm btn-success">{I18n.t("merchant.admin.buttons.save")}</button>
      </div>
    );
  },
  goBack: function() {
    Turbolinks.visit(this.props.redirect_url);
  },
});
