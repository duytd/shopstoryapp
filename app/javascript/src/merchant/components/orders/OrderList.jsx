import React from 'react';
import I18n from 'i18n-js';

import List from '../../components/general/List';

export default class OrderList extends React.Component {
  render() {
    var headers = [
      I18n.t("merchant.admin.orders.order_id"),
      I18n.t("merchant.admin.orders.order_at"),
      I18n.t("merchant.admin.orders.bill_to_name"),
      I18n.t("merchant.admin.orders.ship_to_name"),
      I18n.t("merchant.admin.orders.order_status"),
      I18n.t("merchant.admin.orders.payment_status"),
      I18n.t("merchant.admin.orders.shipment_status"),
      I18n.t("merchant.admin.orders.total")
    ];

    return (
      <List
        type="order"
        items={this.props.orders}
        headers={headers}
        page={this.props.page}
        totalPage={this.props.totalPage}
        redirectUrl={this.props.url}
        deleteAllUrl={this.props.url} />
    )
  }
};
