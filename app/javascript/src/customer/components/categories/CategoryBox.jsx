import React from 'react';

export default class CategoryBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      globalVars: this.props.globalVars,
    }
  }

  updateOrder = (order) => {
    var globalVars = this.state.globalVars;

    globalVars.order = order;
    this.setState({globalVars: globalVars});
  }

  render() {
    return CategoryBoxRT.apply(this);
  }
}
