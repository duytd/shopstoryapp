var Filter = React.createClass({
  render: FilterRT,
  updateVendor: function(e) {
    var target = e.target;

    if (target.checked) {
      this.addVendor(target.value);
    }
    else {
      this.removeVendor(target.value);
    }
  },
  updatePrice: function(e) {
    var priceRange = e.target.value;

    this.props.updatePrice(priceRange.split("|"));
  },
  addVendor: function(v) {
    var vendor = this.props.vendor;
    vendor.push(v);

    this.props.updateVendor(vendor);
  },
  removeVendor: function(v) {
    var vendor = this.props.vendor,
      index = vendor.indexOf(v);

    vendor.splice(index, 1);

    this.props.updateVendor(vendor);
  }
})

module.exports = Filter;
