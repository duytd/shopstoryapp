var Category = React.createClass({
  render: function() {
    var productNodes = this.props.products.map(function(product, index) {
      return <ProductItem key={index} product={product} currency={this.props.globalVars.currency} />
    }.bind(this));

    return (
      <Layout globalVars={this.props.globalVars}>
        <div className="category">
          <div className="row">
            <div className="col-md-12">
              {productNodes}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
});
