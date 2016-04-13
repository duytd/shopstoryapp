var CartPopup = React.createClass({
  getInitialState: function() {
    return {
      cartErrors: [],
    }
  },
  render: CartPopupRT,
  checkout: function() {
    Turbolinks.visit(Routes.customer_cart_path());
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
    if (typeof this.props.cartErrors !== "undefined") {
      this.props.setCartErrors(errors);
    }
    else {
      this.setState({cartErrors: errors});
    }
  },
  emptyCartErrors: function() {
    if (typeof this.props.cartErrors !== "undefined") {
      this.props.emptyCartErrors();
    }
    else {
      this.setState({cartErrors: []})
    }
  }
})

module.exports = CartPopup;
