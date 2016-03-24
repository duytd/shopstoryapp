var PhoneField = React.createClass({
  getInitialState: function() {
    var arrayValue = [];
    var temp = 0;

    if (this.props.value) {
      this.props.fields.forEach(function(field, index) {
        arrayValue.push(this.props.value.substr(temp, field));
        temp = temp + field;

      }.bind(this))
    }

    return {
      value: this.props.value,
      arrayValue: arrayValue
    }
  },
  updateValue: function() {
    var str = "";

    this.props.fields.forEach(function(field, index) {
      str += this.refs["phone_field_" + index].value;
    }.bind(this))

    this.refs.phone_value.value = str;
  },
  render: PhoneFieldRT
})

module.exports = PhoneField;
