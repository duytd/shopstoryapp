import React from 'react';
import I18n from 'i18n-js';

import List from '../../components/general/List';

export default class CategoryList extends React.Component {
  render() {
    var headers = [
      I18n.t("activerecord.attributes.category.name")
    ];

    return (
      <List
        type="category"
        items={this.props.categories}
        headers={headers}
        page={this.props.page}
        totalPage={this.props.totalPage}
        redirectUrl={this.props.url}
        deleteAllUrl={this.props.url} />
    )
  }
};
