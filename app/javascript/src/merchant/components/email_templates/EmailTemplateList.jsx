import React from 'react';
import * as Routes from '../../../routes';

export default class EmailTemplateList extends React.Component {
  render() {
    var templateNodes = this.props.email_templates.map(function(template, index) {
      return <li key={"locale_" + index}><a onClick={this.updateEmailTemplate.bind(this, template.id)}>{template.name}</a></li>
    }.bind(this))

    return (
      <div className="editor-menu">
        <h4>
          {I18n.t("merchant.admin.email_templates.title")}
        </h4>
        <ul>
          {templateNodes}
        </ul>
      </div>
    )
  }

  updateEmailTemplate = (templateId) => {
    $.get(Routes.edit_merchant_email_template_path.localize(templateId), function(response) {
      this.props.updateFile(response.data, response.url, response.reset_url, "html");
    }.bind(this))
  }
}
