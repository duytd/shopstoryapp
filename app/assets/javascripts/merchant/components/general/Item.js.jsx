var Item = React.createClass({
  render: function() {
    return (
      <tr className="item">
        <td>
          <label className="styled-cb">
            <input ref="checkbox" type="checkbox" value={this.props.item.id}
              checked={this.props.check} onChange={this.handleSelect} />
            <i className="fa"></i>
          </label>
        </td>
        {this.props.children}
        <td>
          <a className="btn btn-sm btn-danger" href="#"
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
      url: this.props.deleteUrl,
      method: "DELETE",
      dataType: "json",
      success: function(data) {
        this.props.handleDeleteItem(this.props.item);
      }.bind(this)
    });
  },
  handleSelect: function() {
    var checked = !this.props.check;

    this.props.handleSelect(this.props.item, checked);
  }
})
