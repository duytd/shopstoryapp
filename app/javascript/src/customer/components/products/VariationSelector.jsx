import React from 'react';
import I18n from 'i18n-js';

export default class VariationSelector extends React.Component {
  constructor() {
    super(props);

    var options = this.props.options;

    options.map(function(option) {
      var defaultValue = this.getDefaultValue(option);
      option["default"] = defaultValue;

      return option;
    }.bind(this))

    options = this.refineOptions(options, options[0].id, options[0].default, true);

    this.state = {
      options: options
    };
  }

  render() {
    return VariationSelectorRT.apply(this);
  }

  updateVariation = (optionId, valueId, e) => {
    var options = this.state.options;
    var values = [];

    options = this.refineOptions(options, optionId, valueId);

    this.setState({options: options}, function() {
      this.state.options.forEach(function(option) {
        var target = $(this.refs["option_" + option.id]).find(".selected");
        values.push(target.data("id"));
      }.bind(this))

      var newVariation = this.props.variations.map(function(variation) {
        var checked = true;

        variation.values.forEach(function(value) {
          if (values.indexOf(value) == -1) {
            checked = false;
          }
        })

        if (checked) {
          return variation;
        }
      }).filter(function(x) {
        return typeof x !== "undefined"
      })[0]

      this.props.updateVariation(newVariation);
    })
  }

  getDefaultValue = (option) => {
    var optionValues = option.option_values;
    var defaultValue = optionValues[0].id;

    optionValues.forEach(function(value) {
      if (this.props.variation.values.indexOf(value.id) != -1) {
        defaultValue = value.id;
      }
    }.bind(this))

    return defaultValue;
  }

  refineOptions = (options, optionId, targetValue, useDefaultValue) => {
    if (typeof useDefaultValue === "undefined")
       useDefaultValue = false;

    options.forEach(function(option) {
      if (option.id == optionId) {
        option.option_values.forEach(function(value) {
          value["disabled"] = false;

          if (value.id == targetValue) {
            value["selected"] = true;
          }
          else {
            value["selected"] = false;
          }
        })
      }
      else {
        var hasInvalidElement = false;
        var tempIndex = null;

        option.option_values.forEach(function(value, index) {
          var checked = 0;

          this.props.variations.forEach(function(variation) {
            if (variation.values.indexOf(targetValue) != -1 && variation.values.indexOf(value.id) != -1) {
              checked += 1;
            }
          })

          if (checked > 0) {
            value["disabled"] = false;

            if (tempIndex == null)
              tempIndex = index;
          }
          else {
            value["disabled"] = true;

            if (value.selected) {
              value["selected"] = false;
              hasInvalidElement = true;
            }
          }

          if (useDefaultValue) {
            if (value.id == option.default) {
              value["selected"] = true;
            }
            else {
              value["selected"] = false;
            }
          }

        }.bind(this))

        if (hasInvalidElement) {
          option.option_values[tempIndex]["selected"] = true;
        }
      }
    }.bind(this))

    return options;
  }
}
