import React from 'react';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      globalVars: this.props.globalVars,
      cartErrors: []
    };
  }

  render() {
    return CartRT.apply(this);
  }

  checkout = () => {
    var url = (this.props.globalVars.current_customer) ?
      Routes.new_customer_order_path.localize() :
      Routes.customer_checkout_path.localize();

    window.location = url;
  }

  updateOrder = (order) => {
    var globalVars = this.state.globalVars;

    globalVars.order = order;
    this.setState({globalVars: globalVars});
  }

  removeItem = (e) => {
    e.preventDefault();
    var itemId = parseInt(e.target.getAttribute("data-item"));

    this.handleRemoveItem(itemId);
  }

  handleRemoveItem = (itemId) => {
    $.ajax({
      url: "/order_products/" + itemId,
      method: "delete",
      dataType: "json",
      success: function(data) {
        this.updateOrder(data);
        this.emptyCartErrors();
      }.bind(this)
    });
  }

  addItemQuantity = (e) => {
    var quantity = parseInt(e.target.getAttribute("data-quantity"));
    var itemId = parseInt(e.target.getAttribute("data-item"));
    var newQuantity = quantity + 1;

    this.updateItemQuantity(itemId, newQuantity);
  }

  substractItemQuantity = (e) => {
    var quantity = parseInt(e.target.getAttribute("data-quantity"));
    var itemId = parseInt(e.target.getAttribute("data-item"));
    var newQuantity = quantity - 1;

    if (newQuantity == 0) {
      this.handleRemoveItem(itemId);
    }
    else {
      this.updateItemQuantity(itemId, newQuantity);
    }
  }

  updateItemQuantity = (itemId, quantity) => {
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
  }

  setCartErrors = (errors) => {
    this.setState({cartErrors: errors});
  }

  emptyCartErrors = () => {
    this.setState({cartErrors: []})
  }
}
