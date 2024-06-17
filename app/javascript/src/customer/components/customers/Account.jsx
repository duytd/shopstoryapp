import React from 'react';

export default class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      globalVars: this.props.globalVars
    };
  }

  render() {
    return AccountRT.apply(this);
  }

  updateOrder = (order) => {
    var globalVars = this.state.globalVars;

    globalVars.order = order;
    this.setState({globalVars: globalVars});
  }
}
