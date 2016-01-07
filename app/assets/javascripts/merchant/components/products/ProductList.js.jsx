var ProductList = React.createClass({
  render: function() {
    var headers = (
      <th>{I18n.t("activerecord.attributes.product.name")}</th>
    );

    return (
      <List
        type="product"
        items={this.props.products}
        headers={headers}
        deleteAllUrl={Routes.merchant_products_path()}
      />
    ) 
  }
});
