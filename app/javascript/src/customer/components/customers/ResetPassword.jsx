import React from 'react';

export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      globalVars: this.props.globalVars
    };
  }

  render() {
    return ResetPasswordRT.apply(this);
  }

  updateOrder = (order) => {
    var globalVars = this.state.globalVars;

    globalVars.order = order;
    this.setState({globalVars: globalVars});
  }
}
