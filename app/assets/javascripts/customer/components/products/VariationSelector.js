var VariationSelector = React.createClass({
  getInitialState: function() {
    var options = this.props.options;

    options.map(function(option) {
      var defaultValue = this.getDefaultValue(option);
      option["default"] = defaultValue;

      return option;
    }.bind(this))

    return {
      options: options
    }
  },
  render: VariationSelectorRT,
  updateVariation: function(optionId, e) {
    var options = this.state.options;
    var values = [];

    options.forEach(function(option) {
      values.push($(this.refs["option_" + option.id]).val());
    }.bind(this))

    var newVariation = this.props.variations.map(function(variation) {
      var checked = true;

      variation.values.forEach(function(value) {
        if (values.indexOf(value.toString()) == -1) {
          checked = false;
        }
      })

      if (checked) {
        return variation;
      }
    }).filter(function(x) {
      return typeof x !== "undefined"
    })[0]

    this.updateOptions(optionId, e.target.value);
    this.props.updateVariation(newVariation);
  },
  getDefaultValue: function(option) {
    var optionValues = option.option_values;
    var defaultValue = optionValues[0].id;

    optionValues.forEach(function(value) {
      if (this.props.variation.values.indexOf(value.id) != -1) {
        defaultValue = value.id;
      }
    }.bind(this))

    return defaultValue;
  },
  updateOptions: function(optionId, value) {

  }
})

module.exports = VariationSelector;
