var Variation = React.createClass({
  render: function() {
    var optionNodes = [];

    if (!this.props.deleted) {
      optionNodes = this.props.variationOptions.map(function(option, index) {
        var id = null;
        var defaultValue = null;
        var values = [];
        var valueNodes = [];

        option.option_values.forEach(function(value, index) {
          if (value && value.name)
            values.push(value);
        })

        if (option && this.props.variation && this.props.variation.variation_option_values) {
          this.props.variation.variation_option_values.forEach(function(variationOptionValue){
            if (variationOptionValue.option_value.variation_option_id == option.id) {
              defaultValue = variationOptionValue.option_value.id
              id = variationOptionValue.id
            }
          })
        }

        if (option && values.length > 0) {
          valueNodes = values.map(function(value, index) {
            return <option value={value.id} key={"variation_option_value_" + index}>{value.name}</option>;
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
                </select> : <p className="option-value">{values[0].name}</p>}
            </div>
          )
        } else {
          return null;
        }
      }.bind(this))
    }

    return (
      <div className="variation">
        {(typeof this.props.variation.id !== "undefined") ?
          <input type="hidden" name={"product[variations_attributes][" + this.props.index + "][id]"}
            value={this.props.variation.id} /> : null}
        {(this.props.deleted) ?
          <input type="hidden" name={"product[variations_attributes][" + this.props.index + "][_destroy]"}
            value={true} />
        : (
          <div className="row">
            <div className="col-xs-3">
              {optionNodes}
            </div>

            <div className="col-xs-2">
              <input type="text" className="form-control input-sm"
                name={"product[variations_attributes][" + this.props.index + "][sku]"}
                placeholder={I18n.t("merchant.admin.variations.sku_placeholder")}
                defaultValue={(typeof this.props.variation.id !== "undefined") ? this.props.variation.sku : ""} />
            </div>

            <div className="col-xs-2">
              <input type="text" className="form-control input-sm"
                name={"product[variations_attributes][" + this.props.index + "][price]"}
                placeholder={I18n.t("merchant.admin.variations.price_placeholder")}
                defaultValue={(typeof this.props.variation.id !== "undefined") ? this.props.variation.price.toString().toKoreanFormat() : ""} onBlur={this.props.validateNumber} />
            </div>

            <div className="col-xs-2">
              <input type="text" className="form-control input-sm"
                name={"product[variations_attributes][" + this.props.index + "][in_stock]"}
                placeholder={I18n.t("merchant.admin.variations.in_stock_placeholder")}
                defaultValue={(typeof this.props.variation.id !== "undefined") ? this.props.variation.in_stock : ""} onBlur={this.validateInt} />
            </div>

            <div className="col-xs-3">
              {(typeof this.props.variation.id !== "undefined") ?
                <div className="file-upload">
                  <img src={this.props.variation.previewImage ? this.props.variation.previewImage : this.props.variation.image.image.thumb.url} width="30" height="30" />
                  <input type="file" ref="imageFile" className="upload" onChange={this.uploadImage.bind(this, this)}
                    name={"product[variations_attributes][" + this.props.index + "][image]"} />
                </div> :
                <div className="file-upload">

                {(this.props.variation.previewImage) ?
                  <img src={this.props.variation.previewImage} width="30" height="30" />
                  : <button className="btn btn-default"><i className="fa fa-photo"></i></button>}

                  <input type="file" ref="imageFile" className="upload" onChange={this.uploadImage.bind(this, this)}
                    name={"product[variations_attributes][" + this.props.index + "][image]"} />
                </div>
              }

              {(this.props.lastItem) ?
                <button className="btn btn-default" onClick={this.addVariation}>
                  <i className="fa fa-plus"></i>
                </button> : null}
              <button className="btn btn-default" onClick={this.deleteVariation}>
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    )
  },
  uploadImage: function(input) {
    var input = this.refs.imageFile;

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        this.props.uploadVariationImage(e.target.result, this.props.index);
      }.bind(this)

      reader.readAsDataURL(input.files[0]);
    }
  },
  addVariation: function(e) {
    e.preventDefault();
    this.props.addVariation();
  },
  deleteVariation: function(e) {
    e.preventDefault();
    this.props.deleteVariation(this.props.index);
  },
  validateInt: function(e) {
    this.props.validateInt(e);
  },
  validateNumber: function(e) {
    this.props.validateNumber(e);
  }
})
