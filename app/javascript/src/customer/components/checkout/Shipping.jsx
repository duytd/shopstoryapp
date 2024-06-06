import React from 'react';
import I18n from 'i18n-js';

export default class Shipping extends React.Component {
  constructor() {
    super(props);

    this.state = {
      isEditing: false,
    };
  }

  render() {
    return ShippingRT.apply(this);
  }

  enableEditing = () => {
    this.setState({isEditing: true});
  }

  disableEditing = () => {
    this.setState({isEditing: false});
  }
}
