export default class SubmitButtons extends React.Component {
  render() {
    var goBackButton = <button onClick={this.goBack} className="btn btn-default">
      {I18n.t("merchant.admin.buttons.cancel")}</button>
    goBackButton = (this.props.goBack == true) ? goBackButton : "";

    return (
      <div className={(this.props.fixed == true) ? "form-submit fixed" : "form-submit"}>
        {goBackButton}
        <button type="submit" className="btn btn-success">
          {I18n.t("merchant.admin.buttons.save")}
        </button>
        {this.props.children}
      </div>
    );
  },
  getDefaultProps() {
    return {
      goBack: true
    }
  },
  goBack(e) {
    e.preventDefault();
    Turbolinks.visit(this.props.redirect_url);
  }
}
