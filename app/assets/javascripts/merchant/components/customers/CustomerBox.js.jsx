var CustomerBox = React.createClass({
  render: function() {
    var customPageList = (
      <CustomerList
        customers={this.props.customers} />
    )

    return (
      <Box name="custom-page"
        list={customPageList}
        url={Routes.new_merchant_customer_path()}
        title={I18n.t("merchant.admin.customers.title")} />
    );
  }
})
