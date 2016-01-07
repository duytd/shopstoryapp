var ProductBox = React.createClass({
  render: function() {
    var productList = (
      <ProductList 
        products={this.props.products}
      />
    )

    return (
      <Box name="product" 
        list={productList} 
        url={this.props.url}
        title={I18n.t("merchant.admin.products.title")} 
      />
    );
  }
});
