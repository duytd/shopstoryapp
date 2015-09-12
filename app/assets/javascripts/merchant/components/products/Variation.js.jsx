var Variation = React.createClass({
  render: function() {
    return (
      <tr className={(this.props.variation.isDeleted) ? "hide" : ""}>
        <input type="hidden" name={"product[variations_attributes][" + this.props.variation.position + "][id]"}
          value={this.props.variation.id} />
        <input type="hidden" name={"product[variations_attributes][" + this.props.variation.position + "][_destroy]"}
          value={this.props.variation.isDeleted} />
        <td>
          <input type="text" className="form-control input-sm" 
            name={"product[variations_attributes][" + this.props.variation.position + "][color]"}
            placeholder={I18n.t("merchant.admin.products.color_placeholder")}
            defaultValue={this.props.variation.color} />
        </td>
        <td>
          <input type="text" className="form-control input-sm" 
            name={"product[variations_attributes][" + this.props.variation.position + "][size]"}
            placeholder={I18n.t("merchant.admin.products.size_placeholder")} 
            defaultValue={this.props.variation.size} />
        </td>
        <td>
          <input type="text" className="form-control input-sm" 
            name={"product[variations_attributes][" + this.props.variation.position + "][in_stock]"} 
            defaultValue={this.props.variation.in_stock} onBlur={this.validateInt} />
        </td>
        <td>
          <button className="btn btn-default" onClick={this.deleteVariation}>
            <i className="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    )
  },
  deleteVariation: function(e) {
    e.preventDefault();
    this.props.deleteVariation(this.props.variation);
  },
  validateInt: function(e) {
    this.props.validateInt(e);
  }
});
