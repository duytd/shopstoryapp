export default class DiscountList extends React.Component {
  render() {
    var headers = [
      i18n.t("activerecord.attributes.discount.code"),
      i18n.t("activerecord.attributes.discount.discount_type"),
      i18n.t("activerecord.attributes.discount.amount"),
      i18n.t("activerecord.attributes.discount.start_date"),
      i18n.t("activerecord.attributes.discount.expiry_date")
    ];

    return (
      <List
        type="discount"
        items={this.props.discounts}
        headers={headers}
        page={this.props.page}
        totalPage={this.props.totalPage}
        redirectUrl={this.props.url}
        deleteAllUrl={this.props.url} />
    )
  }
};
