var ProductList = React.createClass({
  render: function() {
    var headers = [
      I18n.t("activerecord.attributes.product.name")
    ];

    return (
      <List
        type="product"
        items={this.props.products}
        headers={headers}
        deleteAllUrl={Routes.merchant_products_path()} />
    )
  }
});
