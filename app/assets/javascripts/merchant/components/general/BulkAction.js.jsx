var BulkAction = React.createClass({
  render: function() {
    return (
      <div className={(this.props.checkCount > 0) ? "btn-group bulk-action" : "hide"} role="group">
        <button type="button" className="btn btn-default disabled">
          {this.props.checkCount + " " + I18n.t("merchant.admin.forms.selected")}
        </button>
        <button type="button" className="btn btn-default" onClick={this.props.deleteAllHandler}>
          {I18n.t("merchant.admin.buttons.delete_selected")}
        </button>
      </div>
    );
  }
});
