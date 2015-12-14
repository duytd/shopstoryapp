var Cart = React.createClass({
  getInitialState: function() {
    return {
      cartErrors: [],
    }
  },
  render: function() {
    var cart = this.props.globalVars.cart;
    var cartItems = cart.map(function(item, index) {

      return (
        <div className="row item" key={index}>
          <div className="col-xs-3">
            <img src={item.product.images[0].image.thumb.url} className="img-responsive image" />
          </div>

          <div className="col-xs-3">
            <strong>{item.product.name.toUpperCase()}</strong>
          </div>

          <div className="col-xs-3">
            <p className="price">{item.unit_price}</p>
          </div>

          <div className="col-xs-3">
            <i className="fa fa-minus" data-item={item.id} data-quantity={item.quantity}
              onClick={this.substractItemQuantity}></i>
            <span className="quantity">{item.quantity}</span>
            <i className="fa fa-plus" data-item={item.id} data-quantity={item.quantity}
              onClick={this.addItemQuantity}></i>
            <p className="small">
              <a href="#" data-item={item.id} onClick={this.removeItem}>{I18n.t("cart.remove")}</a>
            </p>
          </div>
        </div>
      )
    }.bind(this));

    var continueBtn = (
      <button className="btn btn-default" onClick={this.closeCart}>
        {I18n.t("cart.continue_shopping")}
      </button>
    );

    var buyBtn = <button className="btn btn-primary" onClick={this.checkout}>{I18n.t("cart.buy_now")}</button>;
    var cartErrors = this.props.cartErrors || this.state.cartErrors;

    return (
      <div id="#cart" className={this.props.isCartOpened ? "cart-container open" : "cart-container"}>
        <div className="col-xs-12">
          <div className="row text-right">
            <a href="#" onClick={this.closeCart}>
              <i className="fa fa-2x fa-times-circle-o"></i>
            </a>
          </div>
          {(cartErrors.length == 0) ? "" : <Errors errors={cartErrors} />}
          {(cartItems.length == 0) ? I18n.t("cart.empty") : cartItems}
        </div>

        <div className="col-xs-12 text-center cart-buttons">
          {(cartItems.length == 0) ? "" : buyBtn}
          {continueBtn}
        </div>
      </div>
    );
  },
  checkout: function() {
    var url = (this.props.globalVars.current_customer) ? Routes.new_customer_order_path() : Routes.customer_checkout_path();

    Turbolinks.visit(url);
   },
  closeCart: function(e) {
    e.preventDefault();

    this.props.closeCart();
  },
  removeItem: function(e) {
    e.preventDefault();
    var itemId = parseInt(e.target.getAttribute("data-item"));

    this.handleRemoveItem(itemId);
  },
  handleRemoveItem: function(itemId) {
    $.ajax({
      url: "/order_products/" + itemId,
      method: "delete",
      dataType: "json",
      success: function(data) {
        if (data.status == "success") {
          var cartData = data.data;

          this.props.updateCart(cartData);
          this.emptyCartErrors();
        }
      }.bind(this)
    });
  },
  addItemQuantity: function(e) {
    var quantity = parseInt(e.target.getAttribute("data-quantity"));
    var itemId = parseInt(e.target.getAttribute("data-item"));
    var newQuantity = quantity + 1;

    this.updateItemQuantity(itemId, newQuantity);
  },
  substractItemQuantity: function(e) {
    var quantity = parseInt(e.target.getAttribute("data-quantity"));
    var itemId = parseInt(e.target.getAttribute("data-item"));
    var newQuantity = quantity - 1;

    if (newQuantity == 0) {
      this.handleRemoveItem(itemId);
    }
    else {
      this.updateItemQuantity(itemId, newQuantity);
    }
  },
  updateItemQuantity: function(itemId, quantity) {
    $.ajax({
      data: "order_product[quantity]=" + quantity,
      url: "/order_products/" + itemId,
      method: "put",
      dataType: "json",
      success: function(data) {
        if (data.status == "success") {
          var cartData = data.data;

          this.props.updateCart(cartData);
          this.emptyCartErrors();
        }
        else {
          this.setCartErrors(data.errors);
        }
      }.bind(this)
    });
  },
  setCartErrors: function(errors) {
    if (this.props.cartErrors) {
      this.props.setCartErrors(errors);
    }
    else {
      this.setState({cartErrors: errors});
    }
  },
  emptyCartErrors: function() {
    if (this.props.cartErrors) {
      this.props.emptyCartErrors();
    }
    else {
      this.setState({cartErrors: []})
    }
  }
});
