var CustomerBox = React.createClass({
  render: function() {
    var customerList = (
      <CustomerList
        page={this.props.page}
        totalPage={this.props.total_page}
        url={this.props.url}
        customers={this.props.customers} />
    )

    if (this.props.customers.length == 0) {
      customerList = (
        <div className="text-center">
          <p>{I18n.t("merchant.admin.messages.no_customer")}</p>
        </div>
      )
    }

    var pagination = (
      <Pagination
        page={this.props.page}
        totalPage={this.props.total_page}
        size={this.props.customers.length}
        total={this.props.total}
        url={this.props.url} />
    )

    return (
      <Box name="custom-page"
        list={customerList}
        pagination={pagination}
        title={I18n.t("merchant.admin.customers.title")} />
    );
  }
})
