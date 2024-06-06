import React from 'react';
import I18n from 'i18n-js';

export default class Filter extends React.Component {
  render() {
    return FilterRT.apply(this);
  }

  updateVendor = (e) => {
    var target = e.target;

    if (target.checked) {
      this.addVendor(target.value);
    }
    else {
      this.removeVendor(target.value);
    }
  }

  updatePrice = (e) => {
    var priceRange = e.target.value;

    this.props.updatePrice(priceRange.split("|"));
  }

  addVendor = (v) => {
    var vendor = this.props.vendor;
    vendor.push(v);

    this.props.updateVendor(vendor);
  }

  removeVendor = (v) => {
    var vendor = this.props.vendor,
      index = vendor.indexOf(v);

    vendor.splice(index, 1);

    this.props.updateVendor(vendor);
  }
}
