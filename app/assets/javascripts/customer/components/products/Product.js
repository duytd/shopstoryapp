var Product = React.createClass({
  mixins: [CartMixin],
  componentDidMount: function() {
    $.fn.scrollView = function () {
      return this.each(function () {
        $("html, body").animate({
          scrollTop: $(this).offset().top
        }, 1000);
      });
    }
  },
  getInitialState: function() {
    if (this.props.variations.length == 0) {
      variation = this.props.master;
    }
    else {
      variation = this.props.variations[0];
    }

    return {
      variation: variation,
      cartErrors: [],
      isCartOpened: false
    }
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
        this.updateOrder(data);
        this.openCart();
      }.bind(this),
      error: function(xhr) {
        this.setCartErrors(xhr.responseJSON);
        this.openCart();
      }.bind(this)
    });
  },
  updateVariation: function(variation) {
    this.setState({variation: variation});
  }
})

module.exports = Product;
