var CustomerOrderList = React.createClass({
  render: function() {
    var headers = [
      I18n.t("merchant.admin.orders.order_id"),
      I18n.t("merchant.admin.orders.order_at"),
      I18n.t("merchant.admin.orders.bill_to_name"),
      I18n.t("merchant.admin.orders.ship_to_name"),
      I18n.t("merchant.admin.orders.payment_status"),
      I18n.t("merchant.admin.orders.order_status"),
      I18n.t("merchant.admin.orders.total")
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
})
