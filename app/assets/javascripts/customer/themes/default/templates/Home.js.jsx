var Home = React.createClass({
  render: function() {
    return (
      <Layout globalVars={this.props.globalVars}>
        <div className="home">
          <ProductList products={this.props.products} currency={this.props.globalVars.currency} />
        </div>
      </Layout>
    );
  }
});
