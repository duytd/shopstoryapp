import React from 'react';
import I18n from 'i18n-js';
import VariationOptionValue from './VariationOptionValue';

export default class VariationOption extends React.Component {
  constructor(props) {
    super(props);

    var activeSelector = (typeof this.props.variationOption.id === "undefined") ? true : false;

    this.state = {
      activeSelector: activeSelector
    };
  }

  render() {
    if (!this.props.deleted) {
      var nameNodes = this.props.defaultNames.map(function(name, index) {

        return <option key={"option_" + index} value={name.capitalize()}>{name.capitalize()}</option>
      })
    }

    var optionValueNodes = this.props.variationOption.option_values.map(function(value, index) {
      return (
        <VariationOptionValue
          key={"option_value_" + index}
          optionValue={value}
          index={index}
          lastItem={(this.props.variationOption.option_values.length == index + 1) ? true : false}
          addOptionValue={this.addOptionValue}
          deleteOptionValue={this.deleteOptionValue}
          parentPosition={this.props.index} />
      )
    }.bind(this))

    var deletedOptionValueNodes = this.props.variationOption.deleted_option_values.map(function(value, index) {
      return (
        <VariationOptionValue
          key={"option_value_" + (this.props.variationOption.option_values + index)}
          deleted={true}
          optionValue={value}
          index={this.props.variationOption.option_values + index}
          parentPosition={this.props.index} />
      )
    }.bind(this))

    return (
      <div className="variation-option">
        {(this.props.variationOption) ?
          <input type="hidden" name={"product[variation_options_attributes][" + this.props.index + "][id]"}
              value={this.props.variationOption.id} /> : null}

        {(this.props.deleted) ?
          <input type="hidden" name={"product[variation_options_attributes][" + this.props.index + "][_destroy]"}
            value={true} />
        : (
            <div className="row">
            <div className="col-5">
              {(this.state.activeSelector) ? (
                  <div className="select" onChange={this.checkActiveSelector}>
                    <select className="form-control" name={"product[variation_options_attributes][" + this.props.index + "][name]"}>
                      {nameNodes}
                      <option value="custom">{I18n.t("merchant.admin.variations.custom_name")}</option>
                    </select>
                  </div>
                )
              : (
                  <input ref="custom_name" type="text" className="form-control input-sm"
                    name={"product[variation_options_attributes][" + this.props.index + "][name]"}
                    placeholder={I18n.t("merchant.admin.variations.custom_name_placeholder")}
                    defaultValue={this.props.variationOption ? this.props.variationOption.name : ""}  onChange={this.checkInputName} />
                )
              }
            </div>
            <div className="col-2">
              {(!this.props.deleted && this.props.lastItem) ?
              <button className="btn btn-default" onClick={this.props.addVariationOption}>
                <i className="fa fa-plus"></i>
              </button> : null}
              <button className="btn btn-default" onClick={this.deleteVariationOption}>
                <i className="fa fa-trash"></i>
              </button>
            </div>
            <div className="col-5">
              {deletedOptionValueNodes}
              {optionValueNodes}
            </div>
          </div>
        )}
      </div>
    )
  }

  deleteVariationOption = (e) => {
    e.preventDefault();
    this.props.deleteVariationOption(this.props.index);
  }

  addOptionValue = (parentIndex) => {
    this.props.addOptionValue(parentIndex);
  }

  deleteOptionValue = (parentIndex, index) => {
    this.props.deleteOptionValue(parentIndex, index);
  }

  checkActiveSelector = (e) => {
    if (e.target.value == "custom") {
      this.setState({activeSelector: false});
    }
  }

  checkInputName = () => {
    if ($(this.refs.custom_name).val().length == 0) {
      this.setState({activeSelector: true});
    }
  }
}
