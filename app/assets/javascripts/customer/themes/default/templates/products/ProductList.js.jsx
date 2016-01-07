var ProductList = React.createClass({
  render: function() {
    var productNodes = this.props.products.map(function(product) {
      return (
        <ProductListItem 
          product={product} 
          key={"product_" + product.id} 
          currency={this.props.currency}
        />
      )
    }.bind(this))

    return (
      <div className="row">
        <div className="col-sm-12">
          {productNodes}
        </div>
      </div>
    )
  }
})
