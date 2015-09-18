var Product = React.createClass({
  render: function() {
    return (
      <tr className="product">
        <td>
          <label className="styled-cb">
            <input ref="checkbox" type="checkbox" value={this.props.product.id} 
              checked={this.props.check} onChange={this.handleSelect} />
            <i className="fa"></i>
          </label>
        </td>
        <td className="name">
          <a href={"/admin/products/"+this.props.product.id+"/edit"}>
            {(this.props.product.name == "") ? this.props.product.name_en : this.props.product.name}
          </a>
        </td>
        <td>
          <a className="btn btn-sm btn-danger" href={"/admin/products/"+this.props.product.id}
            data-confirm={I18n.t("merchant.admin.forms.confirm")} onClick={this.handleDelete}>
            {I18n.t("merchant.admin.buttons.delete")}
          </a>
        </td>
      </tr>
    );
  },
  handleDelete: function(e) {
    e.preventDefault();

    $.ajax({
      url: "/admin/products/"+this.props.product.id,
      method: "DELETE",
      dataType: "json",
      success: function(data) {
        this.props.handleDeleteProduct(this.props.product);
      }.bind(this)
    });
  },
  handleSelect: function() {
    var checked = !this.props.check;

    this.props.handleSelect(this.props.product, checked);
  }
});
