import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      globalVars: this.props.globalVars
    };
  }

  render() {
    return LoginRT.apply(this);
  }

  updateOrder = (order) => {
    var globalVars = this.state.globalVars;

    globalVars.order = order;
    this.setState({globalVars: globalVars});
  }
}
