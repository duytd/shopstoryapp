/* Below are props of layout:
* - globalVars: including shop_name (Shop Name), currency (Shop Currency),
*     current_customer (Authentication Status) and cart (Current Shopping Cart)
*
* - isCartOpened: check whether cart popup is opening or not. If this prop is
*     set (not undefined), parent component can invoke action to open the cart popup
*
* - closeCart: invoke action to close cart popup (set isCartOpened state in parent component to false)
*
* - updateCart: update globalVars state of parent component. If this prop is set (not undefined), parent
*     component can invoke action to update cart content.
*
* - cartErrors: list errors of shopping cart. If this prop is set (not undefined), parent
*     component can invoke action to show cart errors in cart popup if any (after updating cart).
* - setCartErrors: invoke action to set value for cartErrors
*
* - emptyCartErrors: invoke action to empty the list of cart errors
* */

var Layout = React.createClass({
  getInitialState: function() {
    return {
      globalVars: this.props.globalVars
    }
  },
  render: function() {
    return (
      <div className="main-wrapper">
        <Header
          globalVars = {this.state.globalVars}
          isCartOpened = {this.props.isCartOpened}
          closeCart = {this.props.closeCart}
          updateCart = {this.updateCart}
          cartErrors = {this.props.cartErrors}
          setCartErrors = {this.props.setCartErrors}
          emptyCartErrors = {this.props.emptyCartErrors}
        />
        <div className="container">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  },
  updateCart: function(cartData) {
    if (this.props.updateCart) {
      this.props.updateCart(cartData);
    }
    else {
      var globalVars = this.state.globalVars;
      globalVars.cart = cartData;

      this.setState({globalVars: globalVars});
    }
  }
});
