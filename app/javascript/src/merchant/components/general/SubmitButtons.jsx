import React from 'react';
import I18n from 'i18n-js';

class SubmitButtons extends React.Component {
  render() {
    var goBackButton = <button onClick={this.goBack} className="btn btn-secondary">
      {I18n.t("merchant.admin.buttons.cancel")}</button>
    goBackButton = (this.props.goBack == true) ? goBackButton : "";

    return (
      <div className={(this.props.fixed == true) ? "form-submit fixed" : "form-submit"}>
        {goBackButton}
        <button type="submit" className="btn btn-success">
          {I18n.t("merchant.admin.buttons.save")}
        </button>
        {this.props.children}
      </div>
    );
  }

  goBack = (e) => {
    e.preventDefault();

    window.location = this.props.redirect_url;
  }
}

SubmitButtons.defaultProps = {
  goBack: true
}

export default SubmitButtons
