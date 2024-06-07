import React from 'react';
import I18n from 'i18n-js';

export default class PhoneField extends React.Component {
  constructor(props) {
    super(props);

    var arrayValue = [];
    var temp = 0;

    if (this.props.value) {
      this.props.fields.forEach(function(field, index) {
        arrayValue.push(this.props.value.substr(temp, field));
        temp = temp + field;

      }.bind(this))
    }

    this.state = {
      value: this.props.value,
      arrayValue: arrayValue
    };
  }

  updateValue = () => {
    var str = "";

    this.props.fields.forEach(function(field, index) {
      str += this.refs["phone_field_" + index].value;
    }.bind(this))

    this.refs.phone_value.value = str;
  }

  render() {
    return PhoneFieldRT.apply(this);
  }
}
