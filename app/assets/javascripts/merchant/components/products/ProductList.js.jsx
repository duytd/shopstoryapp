var ProductList = React.createClass({
  render: function() {
    var headers = [
      I18n.t("activerecord.attributes.product.id"),
      "",
      I18n.t("activerecord.attributes.product.name"),
      I18n.t("activerecord.attributes.product.price"),
      I18n.t("activerecord.attributes.product.sku"),
      I18n.t("activerecord.attributes.product.vendor"),
      I18n.t("activerecord.attributes.product.in_stock"),
      I18n.t("activerecord.attributes.product.visibility")
    ];

    return (
      <List
        type="product"
        items={this.props.products}
        headers={headers}
        deleteAllUrl={Routes.merchant_products_path()} />
    )
  }
})
