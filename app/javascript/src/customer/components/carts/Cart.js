var Cart = React.createClass({
  mixins: [CartMixin],
  getInitialState: function() {
    return {
      cartErrors: []
    }
  },
  render: CartRT,
  checkout: function() {
    var url = (this.props.globalVars.current_customer) ?
      Routes.new_customer_product_order_path.localize() :
      Routes.customer_checkout_path.localize();

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
        this.updateOrder(data);
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
        this.updateOrder(data);
        this.emptyCartErrors();
      }.bind(this),
      error: function(xhr) {
        this.setCartErrors(xhr.responseJSON);
      }.bind(this)
    });
  },
  setCartErrors: function(errors) {
    this.setState({cartErrors: errors});
  },
  emptyCartErrors: function() {
    this.setState({cartErrors: []})
  }
})

module.exports = Cart;
