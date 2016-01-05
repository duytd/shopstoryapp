var OrderBox = React.createClass({
  render: function() {
    var orderList = <OrderList orders={this.props.orders} />;
    return (
      <Box name="order" list={orderList} url={Routes.new_merchant_order_path()}
        title={I18n.t("merchant.admin.orders.title")} />
    );
  }
});
