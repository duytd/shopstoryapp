import React from 'react';
import I18n from 'i18n-js';

export default class Sorter extends React.Component {
  updateSorter = (e) => {
    e.preventDefault();

    this.props.updateSorter(e.target.value.split(","));
  }

  render() {
    return SorterRT.apply(this);
  }
}
