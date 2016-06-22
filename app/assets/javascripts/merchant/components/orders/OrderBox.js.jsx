var OrderBox = React.createClass({
  render: function() {
    var orderList = (
      <OrderList
        page={this.props.page}
        totalPage={this.props.total_page}
        url={this.props.url}
        orders={this.props.orders} />
    )

    if (this.props.orders.length == 0) {
      orderList = (
        <div className="text-center">
          <p>{I18n.t("merchant.admin.messages.no_order")}</p>
        </div>
      )
    }

    var pagination = (
      <Pagination
        page={this.props.page}
        totalPage={this.props.total_page}
        size={this.props.orders.length}
        total={this.props.total}
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
