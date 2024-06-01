import React from 'react';
import I18n from 'i18n-js';

import List from '../../components/general/List';

export default class CustomPageList extends React.Component {
  render() {
    var headers = [
      I18n.t("activerecord.attributes.custom_page.title")
    ];

    return (
      <List
        type="custom_page"
        items={this.props.custom_pages}
        headers={headers}
        page={this.props.page}
        totalPage={this.props.totalPage}
        redirectUrl={this.props.url}
        deleteAllUrl={this.props.url} />
    )
  }
};
