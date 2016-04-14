var CustomerList = React.createClass({
  render: function() {
    var headers = [
      I18n.t("activerecord.attributes.customer.email"),
      I18n.t("activerecord.attributes.customer.total_orders"),
      I18n.t("activerecord.attributes.customer.total_spent")
    ];

    return (
      <List
        type="customer"
        items={this.props.customers}
        headers={headers}
        deleteAllUrl={Routes.merchant_customers_path()} />
    )
  }
})