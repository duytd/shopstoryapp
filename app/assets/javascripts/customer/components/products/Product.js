var Product = React.createClass({
  mixins: [CartMixin],
  getInitialState: function() {
    return {
      cartErrors: [],
      isCartOpened: false
    };
  },
  render: ProductRT,
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
  addToCart: function(e) {
    e.preventDefault();
    var formData = $(this.refs.form).serialize();

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

module.exports = Product;