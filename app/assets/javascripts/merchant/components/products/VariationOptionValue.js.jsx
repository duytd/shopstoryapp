var VariationOptionValue = React.createClass({
  render: function() {
    return (
      <div className="option-value">
        {(this.props.optionValue) ?
          <input type="hidden"
            name={"product[variation_options_attributes][" + this.props.parentPosition + "][variation_option_values_attributes][" + this.props.index + "][id]"}
            value={this.props.optionValue.id} /> : null}

        {(this.props.deleted) ?
          <input type="hidden"
            name={"product[variation_options_attributes][" + this.props.parentPosition + "][variation_option_values_attributes][" + this.props.index + "][_destroy]"}
            value={true} />
        : (
          <div className="row">
            <div className="col-xs-7">
              <input className="form-control"
                ref="name"
                name={"product[variation_options_attributes][" + this.props.parentPosition + "][variation_option_values_attributes][" + this.props.index + "][name]"}
                defaultValue={this.props.optionValue ? this.props.optionValue.name : null} />
            </div>

            <div className="col-xs-5">
              {(!this.props.deleted && this.props.lastItem) ?
                <button className="btn btn-default" onClick={this.addOptionValue}>
                  <i className="fa fa-plus"></i>
                </button> : null}
              <button className="btn btn-default" onClick={this.deleteOptionValue }>
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    )
  },
  addOptionValue: function(e) {
    e.preventDefault();
    this.props.addOptionValue(this.props.parentPosition);
  },
  deleteOptionValue: function(e) {
    e.preventDefault();
    this.refs.name.value = "";
    this.props.deleteOptionValue(this.props.parentPosition, this.props.index);
  }
})
