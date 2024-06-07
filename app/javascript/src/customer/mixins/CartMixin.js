import React from 'react';

const withCartMixins = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return <WrappedComponent updateOrder={this.updateOrder} {...this.props} />;
    }

    updateOrder = (order) => {
      var globalVars = this.state.globalVars;

      globalVars.order = order;
      this.setState({globalVars: globalVars});
    }
  }
}

export default withCartMixins;
