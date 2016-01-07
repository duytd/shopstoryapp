var OrderList = React.createClass({
  render: function () {
    var headers = (
      <div>
        <th>{I18n.t("merchant.admin.orders.order_id")}</th>
        <th>{I18n.t("merchant.admin.orders.order_at")}</th>
        <th>{I18n.t("merchant.admin.orders.bill_to_name")}</th>
        <th>{I18n.t("merchant.admin.orders.ship_to_name")}</th>
        <th>{I18n.t("merchant.admin.orders.payment_status")}</th>
        <th>{I18n.t("merchant.admin.orders.order_status")}</th>
        <th>{I18n.t("merchant.admin.orders.total")}</th>
      </div>
    );

    return (
      <List
        type="order"
        items={this.props.orders}
        headers={headers}
        deleteAllUrl={Routes.merchant_orders_path()}
      />
    )
  }
});
