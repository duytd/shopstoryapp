var Product = React.createClass({
  getInitialState: function() {
    return {
      globalVars: this.props.globalVars,
      cartErrors: [],
      isCartOpened: false
    };
  },
  render: function() {
    var inStock = I18n.t("products.out_of_order").toUpperCase();

    if (this.props.product.in_stock > 0) {
      inStock = I18n.t("products.in_stock") + ": "+ this.props.product.in_stock;
    }

    return (
      <Layout
        globalVars = {this.state.globalVars}
        isCartOpened = {this.state.isCartOpened}
        closeCart = {this.closeCart}
        updateCart = {this.updateCart}
        cartErrors = {this.state.cartErrors}
        setCartErrors = {this.setCartErrors}
        emptyCartErrors = {this.emptyCartErrors}>

        <div className="product col-md-12">
          <div className="col-md-6 col-sm-6 image-slider">
            <ProductSlider images={this.props.product.images} />
          </div>

          <div className="col-md-6 col-sm-6">
            <h2>{this.props.product.name}</h2>
            <p>{this.props.product.sku}</p>
            <p>
              <strong>{I18n.toCurrency(this.props.product.price, {precision: 0, unit: this.props.globalVars.currency})}</strong>
            </p>
            <p>
              {inStock}
            </p>
            <form ref="form" action={this.props.cart_url} method="post">
              <input type="hidden" name="order_product[product_id]" value={this.props.product.id} />
              <input type="hidden" name="order_product[quantity]" value="1" />
              <button className="btn btn-primary" onClick={this.addToCart}>
                {I18n.t("products.add_to_cart")}
              </button>
            </form>
          </div>
        </div>

      </Layout>
    );
  },
  openCart: function() {
    this.setState({isCartOpened: true});
  },
  closeCart: function() {
    this.setState({isCartOpened: false});
  },
  setCartErrors: function(errors) {
    this.setState({cartErrors: errors});
  },
  emptyCartErrors: function(errors) {
    this.setState({cartErrors: []});
  },
  updateCart: function(cartData) {
    var globalVars = this.state.globalVars;
    
    globalVars.cart = cartData;
    this.setState({globalVars: globalVars});
  },
  addToCart: function(e) {
    e.preventDefault();
    var formData = $(this.refs.form.getDOMNode()).serialize();

    this.handleAddToCart(formData, this.props.cart_url);
  },
  handleAddToCart: function(formData, action) {
    $.ajax({
      data: formData,
      url: action,
      method: "post",
      dataType: "json",
      success: function(data) {
        var cartData = data;
 
        this.updateCart(cartData);
        this.openCart();
      }.bind(this),
      error: function(xhr) {
        this.setCartErrors(xhr.responseJSON);
        this.openCart();
      }.bind(this)
    });
  }
});
