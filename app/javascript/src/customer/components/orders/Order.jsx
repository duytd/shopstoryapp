import React from 'react';

export default class Order extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      globalVars: this.props.globalVars
    };
  }

  render() {
    return OrderRT.apply(this);
  }

  updateOrder = (order) => {
    var globalVars = this.state.globalVars;

    globalVars.order = order;
    this.setState({globalVars: globalVars});
  }
}
