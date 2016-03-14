var Shipping = React.createClass({
  getInitialState: function() {
    return {
      isEditing: false,
    }
  },
  render: ShippingRT,
  enableEditing: function() {
    this.setState({isEditing: true});
  },
  disableEditing: function() {
    this.setState({isEditing: false});
  }
})

module.exports = Shipping;
