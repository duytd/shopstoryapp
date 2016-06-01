var Coupon = React.createClass({
  getInitialState: function() {
    return {
      error: []
    }
  },
  render: CouponRT,
  submit: function(e) {
    e.preventDefault();

    var url = Routes.verify_coupon_customer_product_orders_path.localize();
    var code = this.refs.code.value;

    $.ajax({
      url: url,
      data: {
        code: code
      },
      method: "POST",
      success: function(order) {
        this.setState({errors: []}, this.props.updateOrder(order));
      }.bind(this),
      error: function(xhr) {
        this.setState({error: [xhr.responseJSON.message]})
      }.bind(this)
    })
  },
  remove: function(e) {
    e.preventDefault();
    var url = Routes.remove_coupon_customer_product_orders_path.localize();

    $.ajax({
      url: url,
      method: "DELETE",
      success: function(order) {
        this.setState({errors: []}, this.props.updateOrder(order));
      }.bind(this),
      error: function(xhr) {
        alert(xhr.responseText)
      }.bind(this)
    })
  }
})

module.exports = Coupon;
