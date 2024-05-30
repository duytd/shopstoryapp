export default class LocaleNavTab extends React.Component {
  render() {
    return (
      <ul className="nav nav-tabs">
        <li className="active">
          <a data-toggle="tab" href={this.props.koTabId ? "#" + this.props.koTabId : "#ko"}>
            {i18n.t("merchant.admin.forms.ko_lang")}
            {(this.props.ko_errors_count > 0) ? <span className="badge badge-danger">{this.props.ko_errors_count}</span> : null}
          </a>
        </li>
        <li>
          <a data-toggle="tab" href={this.props.enTabId ? "#" + this.props.enTabId : "#en"}>
            {i18n.t("merchant.admin.forms.en_lang")}
            {(this.props.en_errors_count > 0) ? <span className="badge badge-danger">{this.props.en_errors_count}</span> : null}
          </a>
        </li>
      </ul>
    );
  }
}
