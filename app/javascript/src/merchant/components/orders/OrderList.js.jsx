export default class OrderList extends React.Component {
  render() {
    var headers = [
      i18n.t("merchant.admin.orders.order_id"),
      i18n.t("merchant.admin.orders.order_at"),
      i18n.t("merchant.admin.orders.bill_to_name"),
      i18n.t("merchant.admin.orders.ship_to_name"),
      i18n.t("merchant.admin.orders.order_status"),
      i18n.t("merchant.admin.orders.payment_status"),
      i18n.t("merchant.admin.orders.shipment_status"),
      i18n.t("merchant.admin.orders.total")
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
