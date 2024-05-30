export default class Editor extends React.Component {
  getInitialState() {
    return {
      url: this.props.url,
      reset_url: this.props.reset_url,
      error: [],
    };
  },
  componentDidMount() {
    var editor = ace.edit("editor");
    var CssMode = ace.require("ace/mode/css").Mode;

    editor.$blockScrolling = Infinity;
    editor.setOptions({
      fontSize: "14px",
      fontFamily: "Inconsolata",
      tabSize: 2,
      useSoftTabs: true
    });
    editor.setTheme("ace/theme/solarized_light");
    editor.getSession().setUseWorker(false);
    editor.getSession().setMode(new CssMode());
    editor.setValue(this.props.data.content, -1);

    $(".ace_scroller").perfectScrollbar();

    this.setState({editor: editor});
  },
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
            <div className="form-group">
              <div id="editor" ref="editor" className="code-editor">
              </div>
              <input ref="code" type="hidden" name={"asset[content]"} />
            </div>
            <div className="text-right">
              <SubmitButtons redirect_url={Routes.merchant_root_path.localize()} fixed={true}>
                <button onClick={this.reset} className="btn btn-danger">{i18n.t("merchant.admin.assets.reset")}</button>
              </SubmitButtons>
            </div>
          </form>
        </div>
      </div>
    );
  },
  submit(e) {
    e.preventDefault();
    this.refs.code.value = this.state.editor.getValue();

    var formData = $(this.refs.form).serialize();

    this.handleSubmit(formData, this.state.url, "put");
  },
  reset(e) {
    e.preventDefault();
    var url = this.state.reset_url;

    $.get(url, function(data) {
      this.state.editor.setValue(data.data);
    }.bind(this))
  },
  updateFile(data, url, reset_url, mode) {
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
  },
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
