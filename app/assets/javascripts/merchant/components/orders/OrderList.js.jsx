var OrderList = React.createClass({
  render: function () {
    var orderNodes = this.props.orders.map(function(order) {
      return <Order order={order} key={"order_" + order.id} />
    }.bind(this));

    return (
      <div className="order-list">
        <table className="table order-list">
          <thead>
            <tr>
              <th>{I18n.t("merchant.admin.orders.order_id")}</th>
              <th>{I18n.t("merchant.admin.orders.order_at")}</th>
              <th>{I18n.t("merchant.admin.orders.bill_to_name")}</th>
              <th>{I18n.t("merchant.admin.orders.ship_to_name")}</th>
              <th>{I18n.t("merchant.admin.orders.payment_status")}</th>
              <th>{I18n.t("merchant.admin.orders.order_status")}</th>
              <th>{I18n.t("merchant.admin.orders.total")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orderNodes}
          </tbody>
        </table>
      </div>
    );
  },
});
