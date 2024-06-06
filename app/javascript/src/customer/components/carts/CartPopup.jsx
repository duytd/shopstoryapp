import React from 'react';
import I18n from 'i18n-js';

export default class CartPopup extends React.Component {
  constructor() {
    super(props);

    this.state = {
      cartErrors: []
    };
  }

  render() {
    return CartPopupRT.apply(this);
  }

  checkout() {
    window.location = Routes.customer_cart_path.localize();
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
        this.props.updateOrder(data);
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
        this.props.updateOrder(data);
        this.emptyCartErrors();
      }.bind(this),
      error: function(xhr) {
        this.setCartErrors(xhr.responseJSON);
      }.bind(this)
    });
  }

  setCartErrors = (errors) => {
    if (typeof this.props.cartErrors !== "undefined") {
      this.props.setCartErrors(errors);
    }
    else {
      this.setState({cartErrors: errors});
    }
  }

  emptyCartErrors= () => {
    if (typeof this.props.cartErrors !== "undefined") {
      this.props.emptyCartErrors();
    }
    else {
      this.setState({cartErrors: []})
    }
  }
}
