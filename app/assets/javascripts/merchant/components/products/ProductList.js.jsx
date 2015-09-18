var ProductList = React.createClass({
  getInitialState: function() {
    var products = JSON.parse(this.props.products).map(function(product) {

      product.checked = false;
      return product;
    })
    return {products: products, checkCount: 0, isSelectAll: false};
  },
  render: function () {
    var productNodes = this.state.products.map(function (product) {
      return <Product product={product} key={product.id} handleSelect={this.handleSelect} 
        handleDeleteProduct={this.deleteProduct} check={product.checked} />
    }.bind(this));

    return (
      <div className="product-list"> 
        <BulkAction checkCount={this.state.checkCount} deleteAllHandler={this.handleDeleteAll} />
        <table className="table product-list">
          <thead>
            <tr>
              <th>
                <SelectAllCb isSelectAll={this.state.isSelectAll} selectAllHandler={this.handleSelectAll} 
                  isDisabled={this.state.products.length == 0} />
              </th>
              <th>{I18n.t("activerecord.attributes.product.name")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productNodes}
          </tbody>
        </table>
      </div>
    );
  },
  deleteProduct: function(product) {
    var products = this.state.products;
    var index = products.indexOf(product);

    products.splice(index, 1);
    this.replaceState({products: products});
  },
  deleteAllProduct: function(product_ids) {
    var products = this.state.products;

    products = products.filter(function(product) {
      return (product_ids.indexOf(product.id) == -1)
    });
    this.replaceState({products: products, checkCount: products.length, isSelectAll: false});
  },
  handleDeleteAll: function(e) {
    e.preventDefault();
    var product_ids = this.state.products.map(function(product) {
      if (product.checked == true) {
        return product.id;
      }
    });

    $.ajax({
      url: "/admin/products",
      method: "DELETE",
      data: {product_ids: product_ids},
      dataType: "json",
      success: function(data) {
        if (data.status == "success") {
          this.deleteAllProduct(product_ids);
        }
      }.bind(this)
    });
  },
  handleSelectAll: function(checked) {
    var products = this.state.products.map(function(product) {

      product.checked = checked;
      return product;
    });
    var checkCount = (checked) ? products.length : 0;

    this.replaceState({products: products, checkCount: checkCount, isSelectAll: checked});
  },
  handleSelect: function(product, checked) {
    var products = this.state.products;
    var index = products.indexOf(product);
    var currentChecked = products[index].checked;
    var checkCount = (checked && !currentChecked) ? this.state.checkCount + 1 : this.state.checkCount - 1;
    var isSelectAll = (checkCount < products.length) ? false : true;

    products[index].checked = checked;
    this.replaceState({products: products, checkCount: checkCount, isSelectAll: isSelectAll});
  }
});
