import React from 'react';
import I18n from 'i18n-js';

export default class Box extends React.Component {
  render() {
    var wrapper = (this.props.wrapper) ? this.props.wrapper : "block";

    return (
      <div className={this.props.name + "-box " + wrapper}>
        <div className="block-header">
          <div className="row">
            <div className="col-xs-12">
              <span className="title">{this.props.title}</span>
              {(this.props.url) ?
              <a className="btn btn-sm btn-success pull-right" href={this.props.url}>
                {I18n.t("merchant.admin.buttons.add")}
              </a> : null}

              {(this.props.handleExportAll) ?
              <a className="btn btn-sm btn-info pull-right" onClick={this.props.handleExportAll}>
                {I18n.t("merchant.admin.buttons.export")}
              </a> : null}

              {(this.props.handleImport) ?
              <form ref="import_form" className="form-upload pull-right">
                <div className="file-upload">
                    <button className="btn btn-sm btn-warning">
                      {I18n.t("merchant.admin.buttons.import")}
                    </button>
                    <input type="file" className="upload" name="file" onChange={this.handleImport} />
                </div>
              </form> : null}
            </div>
          </div>
        </div>

        <div className="block-body">
          {this.props.list}
          {this.props.pagination ? this.props.pagination : null}
        </div>
      </div>
    );
  }

  handleImport = () => {
    var form = $(this.refs.import_form);
    this.props.handleImport(form);
  }
};
