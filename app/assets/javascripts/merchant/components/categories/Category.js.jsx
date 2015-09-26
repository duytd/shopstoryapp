var Category = React.createClass({
  render: function() {
    return (
      <tr className="category">
        <td>
          <label className="styled-cb">
            <input ref="checkbox" type="checkbox" value={this.props.category.id} 
              checked={this.props.check} onChange={this.handleSelect} />
            <i className="fa"></i>
          </label>
        </td>
        <td className="name">
          <a href={"/admin/categories/"+this.props.category.id+"/edit"}>
            {(this.props.category.name == "") ? this.props.category.name_en : this.props.category.name}
          </a>
        </td>
        <td>
          <a className="btn btn-sm btn-danger" href={"/admin/categories/"+this.props.category.id}
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
      url: "/admin/categories/"+this.props.category.id,
      method: "DELETE",
      dataType: "json",
      success: function(data) {
        this.props.handleDeleteCategory(this.props.category);
      }.bind(this)
    });
  },
  handleSelect: function() {
    var checked = !this.props.check;

    this.props.handleSelect(this.props.category, checked);
  }
});
