import React from 'react';

const withCartMixins = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        globalVars: this.props.globalVars
      };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }

    updateOrder = (order) => {
      var globalVars = this.state.globalVars;

      globalVars.order = order;
      this.setState({globalVars: globalVars});
    }
  }
}

export default withCartMixins;
