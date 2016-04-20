var OrderBox = React.createClass({
  render: function() {
    var orderList = (
      <OrderList
        page={this.props.page}
        totalPage={this.props.total_page}
        url={this.props.url}
        orders={this.props.orders} />
    )

    var pagination = (
      <Pagination
        page={this.props.page}
        totalPage={this.props.total_page}
        url={this.props.url} />
    )

    return (
      <Box
        name="order"
        pagination={pagination}
        list={orderList}
        title={I18n.t("merchant.admin.orders.title")} />
    );
  }
})
