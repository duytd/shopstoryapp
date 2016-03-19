var VariationOption = React.createClass({
  getInitialState: function() {
    var activeSelector = this.props.variationOption.isNew ? true : false;
    var optionValues = this.props.variationOption.option_values ? this.props.variationOption.option_values : [];

    optionValues.forEach(function(value, index) {
      value["isDeleted"] = false;
      value["isNew"] = false;
    })

    if (optionValues.length == 0 || this.props.trigger == "new_option_value") {
      optionValues.push({isNew: true})
    }

    return {
      optionValueCount: optionValues.length,
      optionValues: optionValues,
      activeSelector: activeSelector
    }
  },
  render: function() {
    var nameNodes = this.props.defaultNames.map(function(name, index) {
      return <option key={"option_" + index} value={name.capitalize()}>{name.capitalize()}</option>
    })

    var optionValueNodes = this.state.optionValues.map(function(value, index) {
      return (
        <VariationOptionValue
          key={"option_value" + index}
          optionValue={value}
          index={index}
          submit={this.props.submit}
          optionValueCount={this.state.optionValueCount}
          addOptionValue={this.addOptionValue}
          deleteOptionValue={this.deleteOptionValue}
          parentPosition={this.props.index} />
      )
    }.bind(this))

    return (
      <div className={(this.props.variationOption.isDeleted) ? "hide" : "row variation-option"}>
        <input type="hidden" name={"product[variation_options_attributes][" + this.props.index + "][id]"}
          value={this.props.variationOption.id} />
        <input type="hidden" name={"product[variation_options_attributes][" + this.props.index + "][_destroy]"}
          value={this.props.variationOption.isDeleted} />
        <div className="col-xs-5">

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
              onBlur={this.props.submit}
              placeholder={I18n.t("merchant.admin.variations.custom_name_placeholder")}
              defaultValue={this.props.variationOption.name} onChange={this.checkInputName} onBlur={this.props.submit} />
          )
        }

        </div>
        <div className="col-xs-5">
          {optionValueNodes}
        </div>
        <div className="col-xs-2">
          <button className="btn btn-default" onClick={this.deleteVariationOption}>
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </div>
    )
  },
  deleteVariationOption: function(e) {
    e.preventDefault();
    this.props.deleteVariationOption(this.props.variationOption);
  },
  addOptionValue: function() {
    this.props.submit(null, "new_option_value");
  },
  deleteOptionValue: function(optionValue) {
    var optionValues = this.state.optionValues;
    var index = optionValues.indexOf(optionValue);
    var optionValueCount = this.state.optionValueCount - 1;

    if (optionValue.isNew) {
      optionValues.splice(index, 1);
    }
    else {
      optionValues[index]["isDeleted"] = true;
    }

    this.setState({optionValues: optionValues, optionValueCount: optionValueCount}, this.props.submit);
  },
  checkActiveSelector: function(e) {
    if (e.target.value == "custom") {
      this.setState({activeSelector: false});
    }
  },
  checkInputName: function() {
    if ($(this.refs.custom_name).val().length == 0) {
      this.setState({activeSelector: true});
    }
  }
})
