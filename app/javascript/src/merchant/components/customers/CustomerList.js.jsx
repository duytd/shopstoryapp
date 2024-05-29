export default class CustomerList extends React.Component {
  render() {
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
        page={this.props.page}
        totalPage={this.props.totalPage}
        redirectUrl={this.props.url}
        deleteAllUrl={this.props.url} />
    )
  }
}
