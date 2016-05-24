var CustomerBox = React.createClass({
  render: function() {
    var customPageList = (
      <CustomerList
        page={this.props.page}
        totalPage={this.props.total_page}
        url={this.props.url}
        customers={this.props.customers} />
    )

    var pagination = (
      <Pagination
        page={this.props.page}
        totalPage={this.props.total_page}
        url={this.props.url} />
    )

    return (
      <Box name="custom-page"
        list={customPageList}
        pagination={pagination}
        title={I18n.t("merchant.admin.customers.title")} />
    );
  }
})
