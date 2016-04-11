var AssetForm = React.createClass({
  getInitialState: function () {
    return {
      errors: {},
    };
  },
  componentDidMount: function() {
    var editor = ace.edit("editor");
    var JavaScriptMode = ace.require("ace/mode/javascript").Mode;
    var CssMode = ace.require("ace/mode/css").Mode;

    editor.$blockScrolling = Infinity;
    editor.setOptions({fontSize: "14px", fontFamily: "Inconsolata"});
    editor.setValue(this.props.data[this.props.file], -1);
    editor.setTheme("ace/theme/tomorrow");
    editor.getSession().setUseWorker(false);

    if (this.props.file == "stylesheet") {
      editor.getSession().setMode(new CssMode());
    }
    else {
      editor.getSession().setMode(new JavaScriptMode());
    }

    $(".ace_scroller").perfectScrollbar();

    this.setState({editor: editor});
  },
  render: function () {
    var files = [
      {
        "file": "style.scss",
        "key": "stylesheet",
        "role": "assets"
      },
      {
        "file": "shop.js",
        "key": "javascript",
        "role": "assets"
      },
      {
        "file": "en.js",
        "key": "en_locale",
        "role": "translations"
      },
      {
        "file": "ko.js",
        "key": "ko_locale",
        "role": "translations"
      }
    ];

    var assetNodes = [];
    var translationNodes = [];

    files.map(function(file, index) {
      if (file.role == "assets") {
        assetNodes.push(
          <li className={(this.props.file == file.key) ? "active" : ""} key={index}>
            <a href={"?file="+file.key}>{file.file}</a>
          </li>
        );
      }
      else if (file.role == "translations") {
        translationNodes.push(
          <li className={(this.props.file == file.key) ? "active" : ""} key={index}>
            <a href={"?file="+file.key}>{file.file}</a>
          </li>
        );
      }
    }.bind(this));

    return (
      <div className="row theme-editors">
        <div className="col-md-3 col-md-push-9 files">
          <div className="block">
            <h4>
              <span><i className="fa fa-folder-o"></i></span>
              {I18n.t("merchant.admin.assets.assets")}
            </h4>
            <ul>
              {assetNodes}
            </ul>
            <h4>
              <span><i className="fa fa-folder-o"></i></span>
              {I18n.t("merchant.admin.assets.translations")}
            </h4>
            <ul>
              {translationNodes}
            </ul>
          </div>
        </div>

        <div className="col-md-9 col-md-pull-3">
          <form ref="form" id="asset-form" action={this.props.url}
            acceptCharset="UTF-8" method={this.props.method} onSubmit={this.submit} >
            <div className="form-group">
              <div id="editor" ref="editor" className="code-editor">
              </div>
              <input ref="code" type="hidden" name={"asset["+this.props.file+"]"} />
            </div>
            <div className="text-right">
              <SubmitButtons redirect_url={this.props.redirect_url} fixed={true}>
                <button onClick={this.reset} className="btn btn-danger">{I18n.t("merchant.admin.assets.reset")}</button>
              </SubmitButtons>
            </div>
          </form>
        </div>
      </div>
    );
  },
  submit: function(e) {
    e.preventDefault();
    this.refs.code.value = this.state.editor.getValue();

    var formData = $(this.refs.form).serialize();

    this.handleSubmit(formData, this.props.url, this.props.method);
  },
  reset: function(e) {
    e.preventDefault();
    var url = this.props.reset_url + "&file=" + this.props.file;

    $.get(url, function(data) {
      this.state.editor.setValue(data.data);
    }.bind(this))
  },
  handleSubmit: function(formData, action, method) {
    $.ajax({
      data: formData,
      url: action,
      method: method,
      dataType: "json",
      success: function(data) {
        Turbolinks.visit(window.location.href);
      },
      error: function(xhr) {
        this.setState({
          errors: xhr.responseJSON
        });
      }.bind(this)
    });
  }
})
