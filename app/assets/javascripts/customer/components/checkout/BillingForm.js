var BillingForm = React.createClass({
  getInitialState: function() {
    return {
      errors: {},
      country: "KR"
    }
  },
  render: BillingFormRT,
  updateCountry: function(e) {
    this.setState({country: e.target.value})
  },
  streetClick: function() {
    if (this.state.country == "KR") {
      openDaumPostcode(function(data) {
        var address = data.address,
          zipcode = data.zonecode;

        this.setAddress(address, zipcode);
      }.bind(this))
    }
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
      url: Routes.customer_order_path(this.props.order.id, {locale: I18n.locale}),
      beforeSend: function() {
        $(this.refs.loading).removeClass('hide');
      }.bind(this),
      success: function(order) {
        this.props.updateOrder(order);
      }.bind(this),
      error: function(xhr) {
        this.setState({errors: xhr.responseJSON});
      }.bind(this)
    })
  }
})

module.exports = BillingForm;
