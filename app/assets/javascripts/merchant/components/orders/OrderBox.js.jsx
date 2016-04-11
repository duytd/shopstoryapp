var OrderBox = React.createClass({
  render: function() {
    var orderList = (
      <OrderList
        orders={this.props.orders} />
    )

    return (
      <Box
        name="order"
        list={orderList}
        url={this.props.url}
        title={I18n.t("merchant.admin.orders.title")} />
    );
  }
})
