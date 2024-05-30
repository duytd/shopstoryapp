export default class CustomerOrderList extends React.Component {
  render: function() {
    var headers = [
      i18n.t("merchant.admin.orders.order_id"),
      i18n.t("merchant.admin.orders.order_at"),
      i18n.t("merchant.admin.orders.bill_to_name"),
      i18n.t("merchant.admin.orders.ship_to_name"),
      i18n.t("merchant.admin.orders.payment_status"),
      i18n.t("merchant.admin.orders.order_status"),
      i18n.t("merchant.admin.orders.total")
    ];

    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              {headers.map(function(header, index) {
                return <th key={"header_" + index}>{header}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {this.props.orders.map(function(order, index) {
              return <CustomerOrder key={"order_" + index} order={order} />
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
