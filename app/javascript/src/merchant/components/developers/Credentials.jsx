import React from 'react';
import I18n from 'i18n-js';

export default class Credentials extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: this.props.credentials
    };
  }

  render() {
    var credentials = (
      <div className="block">
        <div className="row">
          <div className="col-sm-9">
            <div className="col-sm-3">
              <label>{I18n.t("merchant.admin.developers.credentials.api_key")}</label>
            </div>
            <div className="col-sm-9">
             {this.state.credentials ? this.state.credentials.api_key : ""}
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <h3 className="title">
          {I18n.t("merchant.admin.developers.credentials.title")}
        </h3>

        <div className="setting-information">
          {credentials}
        </div>
      </div>
    );
  }
}
