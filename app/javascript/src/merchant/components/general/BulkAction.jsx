import React from 'react';
import I18n from 'i18n-js';

export default class BulkAction extends React.Component {
  render() {
    return (
      <div className={(this.props.checkCount > 0) ? "btn-group bulk-action" : "hide"} role="group">
        <button type="button" className="btn btn-default disabled">
          {this.props.checkCount + " " + I18n.t("merchant.admin.forms.selected")}
        </button>
        <div className="dropdown">
          <button className="btn btn-default dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" type="button">{I18n.t("merchant.admin.buttons.bulk_actions")}
          <span className="caret"></span></button>
          <ul className="dropdown-menu">
            <li><a data-confirm={I18n.t("merchant.admin.forms.confirm")} onClick={this.props.deleteAllHandler}>{I18n.t("merchant.admin.buttons.delete_selected")}</a></li>

            {(this.props.exportable) ?
              <li><a onClick={this.props.exportHandler}>{I18n.t("merchant.admin.buttons.export_selected")}</a></li>
            : null}
          </ul>
        </div>
      </div>
    );
  }
};
