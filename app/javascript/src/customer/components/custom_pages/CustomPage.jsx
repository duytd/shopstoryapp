import React from 'react';
import withCartMixins from '../../mixins/CartMixin';

class CustomPageComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      globalVars: this.props.globalVars,
    };
  }

  render() {
    return CustomPageRT.apply(this);
  }
}

const CustomPage = withCartMixins(CustomPageComponent);
export default CustomPage;
