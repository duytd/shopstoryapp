import React from 'react';

export default class Product extends React.Component {
  constructor(props) {
    super(props);

    let variation = null;

    if (this.props.variations.length == 0) {
      variation = this.props.master;
    }
    else {
      variation = this.props.variations[0];
    }

    this.state = {
      globalVars: this.props.globalVars,
      variation: variation,
      cartErrors: [],
      isCartOpened: false
    };
  }

  render() {
    return ProductRT.apply(this);
  }

  componentDidMount() {
    $.fn.scrollView = function () {
      return this.each(function () {
        $("html, body").animate({
          scrollTop: $(this).offset().top
        }, 1000);
      });
    }
  }

  openCart = () => {
    this.setState({isCartOpened: true});
  }

  closeCart = () => {
    this.setState({isCartOpened: false});
  }

  updateOrder = (order) => {
    var globalVars = this.state.globalVars;

    globalVars.order = order;
    this.setState({globalVars: globalVars});
  }

  updateVariation = (variation) => {
    this.setState({variation: variation});
  }

  addToCart = (e) => {
    e.preventDefault();
    var formData = $(this.refs.form).serialize();

    this.handleAddToCart(formData, this.props.cart_url);
  }

  handleAddToCart = (formData, action) => {
    $.ajax({
      data: formData,
      url: action,
      method: "post",
      dataType: "json",
      success: function(data) {
        this.updateOrder(data);
        this.openCart();
      }.bind(this),
      error: function(xhr) {
        this.setCartErrors(xhr.responseJSON);
        this.openCart();
      }.bind(this)
    });
  }

  setCartErrors = (errors) => {
    this.setState({cartErrors: errors});
  }

  emptyCartErrors = (_errors) => {
    this.setState({cartErrors: []});
  }
}
