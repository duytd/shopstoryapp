import React from 'react';
import I18n from 'i18n-js';
import * as Routes from '../../../routes';
import * as ace from 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-solarized_light';
import PerfectScrollbar from 'perfect-scrollbar';

import EmailTemplatePreview from './EmailTemplatePreview';
import EmailTemplateList from './EmailTemplateList';
import SubmitButtons from '../../components/general/SubmitButtons';

export default class EmailTemplateEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previewData: null,
      url: this.props.url,
      reset_url: this.props.reset_url,
      errors: {},
      preview: false
    };
  }

  componentDidMount() {
    var editor = ace.edit("editor");
    var HtmlMode = ace.require("ace/mode/html").Mode;

    editor.$blockScrolling = Infinity;
    editor.setOptions({
      fontSize: "14px",
      fontFamily: "Inconsolata",
      tabSize: 2,
      useSoftTabs: true
    });
    editor.setTheme("ace/theme/solarized_light");
    editor.getSession().setUseWorker(false);
    editor.getSession().setMode(new HtmlMode());
    editor.setValue(this.props.data.content, -1);

    const ps = new PerfectScrollbar('.ace_scroller');

    this.setState({editor: editor});
  }

  render() {
    return (
      <div className="row theme-editors">
        <EmailTemplatePreview
          data={this.state.previewData}
          preview={this.state.preview}
          closePreview={this.closePreview} />
        <div className="col-md-3 col-md-push-9 files">
          <div className="block">
            <EmailTemplateList
              email_templates={this.props.email_templates}
              updateFile={this.updateFile} />
          </div>
        </div>

        <div className="col-md-9 col-md-pull-3">
          <form ref="form" id="asset-form" action={this.props.url}
            acceptCharset="UTF-8" method={this.props.method} onSubmit={this.submit} >
            <div className="mb-3">
              <div id="editor" ref="editor" className="code-editor">
              </div>
              <input ref="code" type="hidden" name={"email_template[content]"} />
            </div>
            <div className="text-right">
              <SubmitButtons redirect_url={Routes.merchant_root_path.localize()} fixed={true}>
                <button onClick={this.reset} className="btn btn-danger">{I18n.t("merchant.admin.buttons.reset")}</button>
                <button onClick={this.preview} className="btn btn-primary">{I18n.t("merchant.admin.buttons.preview")}</button>
              </SubmitButtons>
            </div>
          </form>
        </div>
      </div>
    );
  }

  preview = (e) => {
    e.preventDefault();

    var url = this.props.preview_url;
    var data = this.state.editor.getValue();

    $.ajax({
      url: url,
      method: "POST",
      data: {content: data},
      success: function(response) {
        this.setState({previewData: response.data, preview: true});
      }.bind(this)
    })
  }

  closePreview() {
    this.setState({preview: false});
  }

  submit = (e) => {
    e.preventDefault();
    this.refs.code.value = this.state.editor.getValue();

    var formData = $(this.refs.form).serialize();

    this.handleSubmit(formData, this.state.url, "put");
  }

  reset = (e) => {
    e.preventDefault();
    var url = this.state.reset_url;

    $.get(url, function(data) {
      this.state.editor.setValue(data.data);
    }.bind(this))
  }

  updateFile(data, url, reset_url, mode) {
    this.state.editor.setValue(data.content, -1);
    this.setState({url: url, reset_url: reset_url})
  }

  handleSubmit(formData, action, method) {
    $.ajax({
      data: formData,
      url: action,
      method: method,
      dataType: "json",
      success: function(data) {
      },
      error: function(xhr) {
        this.setState({
          errors: xhr.responseJSON
        });
      }.bind(this)
    });
  }
}
