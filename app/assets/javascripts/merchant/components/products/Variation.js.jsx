var Variation = React.createClass({
  render: function() {
    var optionNodes = this.props.variationOptions.map(function(option, index) {
      var id = null;
      var defaultValue = option.option_values ? option.option_values[0].id : null;
      var valueNodes = null;

      if (this.props.variation.variation_option_values) {
        this.props.variation.variation_option_values.forEach(function(variationOptionValue){
          if (variationOptionValue.option_value.variation_option_id == option.id) {
            defaultValue = variationOptionValue.option_value.id
            id = variationOptionValue.id
          }
        })
      }

       if ((option.option_values && this.props.variation.isNew) || id != null) {
          valueNodes = option.option_values.map(function(value, index) {
            return <option value={value.id} key={"variation_option_value_" + index}>{value.name}</option>
          })

          return (
            <div className={(valueNodes.length > 1) ? "select" : null} key={"variation_option" + index}>
               <input type="hidden" name={"product[variations_attributes][" + this.props.index + "][variation_variation_option_values_attributes][" + index + "][id]"}
                value={id} />
              {(valueNodes.length > 1) ?
                <select
                  onChange={this.props.submit}
                  defaultValue={defaultValue}
                  name={"product[variations_attributes][" + this.props.index + "][variation_variation_option_values_attributes][" + index + "][variation_option_value_id]"}
                  className="form-control">
                  {valueNodes}
                </select> : <p className="option-value">{option.option_values[0].name}</p>}
            </div>
          )
       } else {
        return null;
      }
    }.bind(this))

    return (
      <div className={(this.props.variation.isDeleted) ? "hide" : "row variation"}>
        <input type="hidden" name={"product[variations_attributes][" + this.props.index + "][id]"}
          value={this.props.variation.id} />
        <input type="hidden" name={"product[variations_attributes][" + this.props.index + "][_destroy]"}
          value={this.props.variation.isDeleted} />
        <div className="col-xs-4">
          {optionNodes}
        </div>

        <div className="col-xs-2">
          <input type="text" className="form-control input-sm"
            name={"product[variations_attributes][" + this.props.index + "][sku]"}
            placeholder={I18n.t("merchant.admin.variations.sku_placeholder")}
            defaultValue={this.props.variation.sku} />
        </div>

        <div className="col-xs-2">
          <input type="text" className="form-control input-sm"
            name={"product[variations_attributes][" + this.props.index + "][price]"}
            placeholder={I18n.t("merchant.admin.variations.price_placeholder")}
            defaultValue={this.props.variation.price} />
        </div>

        <div className="col-xs-2">
          <input type="text" className="form-control input-sm"
            name={"product[variations_attributes][" + this.props.index + "][in_stock]"}
            placeholder={I18n.t("merchant.admin.variations.in_stock_placeholder")}
            defaultValue={this.props.variation.in_stock} onBlur={this.validateInt} />
        </div>

        <div className="col-xs-2">
          {(this.props.variationCount == this.props.index + 1) ?
            <button className="btn btn-default" onClick={this.addVariation}>
              <i className="fa fa-plus"></i>
            </button> : null}
          <button className="btn btn-default" onClick={this.deleteVariation}>
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </div>
    )
  },
  addVariation: function(e) {
    e.preventDefault();
    this.props.addVariation();
  },
  deleteVariation: function(e) {
    e.preventDefault();
    this.props.deleteVariation(this.props.variation);
  },
  validateInt: function(e) {
    this.props.validateInt(e);
  }
})
