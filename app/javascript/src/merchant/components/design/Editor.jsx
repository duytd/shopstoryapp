import React from 'react';
import I18n from 'i18n-js';

import * as ace from 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-json';
import PerfectScrollbar from 'perfect-scrollbar';
import EditorMenu from './EditorMenu';
import FormErrors from '../../components/general/FormErrors';
import SubmitButtons from '../../components/general/SubmitButtons';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: this.props.url,
      reset_url: this.props.reset_url,
      error: [],
    };
  }

  componentDidMount() {
    var editor = ace.edit("editor");
    var CssMode = ace.require("ace/mode/css").Mode;

    editor.$blockScrolling = Infinity;
    editor.setOptions({
      fontSize: "14px",
      fontFamily: "monospace",
      tabSize: 2,
      useSoftTabs: true
    });
    editor.setTheme("ace/theme/solarized_light");
    editor.getSession().setUseWorker(false);
    editor.getSession().setMode(new CssMode());
    editor.setValue(this.props.data.content, -1);
    editor.searchBox.show();

    const ps = new PerfectScrollbar('.ace_scroller');

    this.setState({editor: editor});
  }

  render() {
    return (
      <div className="row theme-editors">
        <div className="col-md-3 col-md-push-9 files">
          <div className="block">
            <EditorMenu
              stylesheets={this.props.stylesheets}
              javascripts={this.props.javascripts}
              templates={this.props.templates}
              updateFile={this.updateFile}
              locales={this.props.locales} />
          </div>
        </div>

        <div className="col-md-9 col-md-pull-3">
          <form ref="form" id="asset-form" action={this.props.url}
            acceptCharset="UTF-8" method={this.props.method} onSubmit={this.submit} >
            <FormErrors errors={this.state.errors} />
            <div className="mb-3">
              <div id="editor" ref="editor" className="code-editor">
              </div>
              <input ref="code" type="hidden" name={"asset[content]"} />
            </div>
            <div className="text-end">
              <SubmitButtons redirect_url={Routes.merchant_root_path.localize()} fixed={true}>
                <button onClick={this.reset} className="btn btn-danger">{I18n.t("merchant.admin.assets.reset")}</button>
              </SubmitButtons>
            </div>
          </form>
        </div>
      </div>
    );
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

  updateFile = (data, url, reset_url, mode) => {
    var JavascriptMode = ace.require("ace/mode/javascript").Mode;
    var CssMode = ace.require("ace/mode/css").Mode;
    var HtmlMode = ace.require("ace/mode/html").Mode;
    var JsonMode = ace.require("ace/mode/json").Mode;

    this.state.editor.setValue(data.content, -1);

    switch(mode) {
      case "html":
        this.state.editor.getSession().setMode(new HtmlMode());
      case "css":
        this.state.editor.getSession().setMode(new CssMode());
      case "javascript":
        this.state.editor.getSession().setMode(new JavascriptMode());
      case "json":
        this.state.editor.getSession().setMode(new JsonMode());
    }

    this.setState({url: url, reset_url: reset_url, errors: []})
  }

  handleSubmit(formData, action, method) {
    $.ajax({
      data: formData,
      url: action,
      method: method,
      dataType: "json",
      success: function(data) {
        this.setState({errors: []});
      }.bind(this),
      error: function(xhr) {
        this.setState({
          errors: [xhr.responseJSON.message]
        });
      }.bind(this)
    });
  }
}
