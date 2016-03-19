var VariationOptionValue = React.createClass({
  render: function() {
    return (
      <div className={(this.props.optionValue.isDeleted) ? "hide" : "row option-value"}>
        <input type="hidden"
          name={"product[variation_options_attributes][" + this.props.parentPosition + "][variation_option_values_attributes][" + this.props.index + "][id]"}
          value={this.props.optionValue.id} />
        <input type="hidden"
          name={"product[variation_options_attributes][" + this.props.parentPosition + "][variation_option_values_attributes][" + this.props.index + "][_destroy]"}
          value={this.props.optionValue.isDeleted} />
        <div className="col-xs-7">
          <input className="form-control"
            name={"product[variation_options_attributes][" + this.props.parentPosition + "][variation_option_values_attributes][" + this.props.index + "][name]"}
            defaultValue={this.props.optionValue.name} />
        </div>

        <div className="col-xs-3">
          {(this.props.optionValueCount == this.props.index + 1) ?
              <button className="btn btn-default" onClick={this.addOptionValue}>
                <i className="fa fa-plus"></i>
              </button> : null}
          {(this.props.index > 0 || !this.props.optionValue.isNew) ?
            <button className="btn btn-default" onClick={this.deleteOptionValue }>
              <i className="fa fa-trash"></i>
            </button> : null}
        </div>
      </div>
    )
  },
  addOptionValue: function(e) {
    e.preventDefault();
    this.props.addOptionValue();
  },
  deleteOptionValue: function(e) {
    e.preventDefault();
    this.props.deleteOptionValue(this.props.optionValue);
  }
})
