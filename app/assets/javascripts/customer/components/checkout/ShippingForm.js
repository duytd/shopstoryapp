var ShippingForm = React.createClass({
  getInitialState: function() {
    return {
      errors: {},
      country: "KR"
    }
  },
  render: ShippingFormRT,
  streetClick: function() {
    if (this.state.country == "KR") {
      openDaumPostcode(function(data) {
        var address = data.address,
          zipcode = data.zonecode;

        this.setAddress(address, zipcode);
      }.bind(this));
    }
  },
  updateCountry: function(e) {
    this.setState({country: e.target.value});
  },
  setAddress: function(address, zipcode) {
    address = typeof address !== "undefined" ? address : "";
    zipcode = typeof zipcode !== "undefined" ? zipcode : "";

    this.refs.address.value = address;
    this.refs.zipcode.value = zipcode;
  },
  updateOrder: function(e) {
    e.preventDefault();

    var formData = $(this.refs.form).serialize();

    $.ajax({
      data: formData,
      method: "PUT",
      url: Routes.customer_product_order_path(this.props.order.id, {locale: I18n.locale}),
      success: function(order) {
        this.setState({errors: []});
        this.props.updateOrder(order);

        if (this.props.disableEditing)
          this.props.disableEditing();
      }.bind(this),
      error: function(xhr) {
        this.setState({errors: xhr.responseJSON});
      }.bind(this)
    })
  }
})

module.exports = ShippingForm;
