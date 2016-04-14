var LocaleNavTab = React.createClass({
  render: function() {
    return (
      <ul className="nav nav-tabs">
        <li className="active">
          <a data-toggle="tab" href={this.props.koTabId ? "#" + this.props.koTabId : "#ko"}>
            {I18n.t("merchant.admin.forms.ko_lang")}
            {(this.props.ko_errors_count > 0) ? <span className="badge badge-danger">{this.props.ko_errors_count}</span> : null}
          </a>
        </li>
        <li>
          <a data-toggle="tab" href={this.props.enTabId ? "#" + this.props.enTabId : "#en"}>
            {I18n.t("merchant.admin.forms.en_lang")}
            {(this.props.en_errors_count > 0) ? <span className="badge badge-danger">{this.props.en_errors_count}</span> : null}
          </a>
        </li>
      </ul>
    );
  }
})
