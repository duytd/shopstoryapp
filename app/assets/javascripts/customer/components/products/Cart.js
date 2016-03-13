var Cart = React.createClass({
  getInitialState: function() {
    return {
      cartErrors: [],
    }
  },
  render: CartRT,
  checkout: function() {
    var url = (this.props.globalVars.current_customer) ? Routes.new_customer_order_path({locale: I18n.locale}) : Routes.customer_checkout_path({locale: I18n.locale});

    Turbolinks.visit(url);
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
        var cartData = data;

        this.props.updateCart(cartData);
        this.emptyCartErrors();
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
        var cartData = data;

        this.props.updateCart(cartData);
        this.emptyCartErrors();
      }.bind(this),
      error: function(xhr) {
        this.setCartErrors(xhr.responseJSON);
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

module.exports = Cart;
