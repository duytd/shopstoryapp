import React from 'react';
import I18n from 'i18n-js';

export default class LocaleNavTab extends React.Component {
  render() {
    return (
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <a className="nav-link active" data-bs-toggle="tab" href={this.props.enTabId ? "#" + this.props.enTabId : "#en"}>
            {I18n.t("merchant.admin.forms.en_lang")}
            {(this.props.en_errors_count > 0) ? <span className="badge badge-danger">{this.props.en_errors_count}</span> : null}
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link" data-bs-toggle="tab" href={this.props.koTabId ? "#" + this.props.koTabId : "#ko"}>
            {I18n.t("merchant.admin.forms.ko_lang")}

            {(this.props.ko_errors_count > 0) ? <span className="badge badge-danger">{this.props.ko_errors_count}</span> : null}
          </a>
        </li>
      </ul>
    );
  }
}
