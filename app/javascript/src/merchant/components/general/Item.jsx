import React from 'react';

export default class Item extends React.Component {
  render() {
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
      </tr>
    );
  }

  handleDelete = (e) => {
    e.preventDefault();

    $.ajax({
      url: this.props.deleteUrl,
      method: "DELETE",
      dataType: "json",
      success: function(data) {
        this.props.handleDeleteItem(this.props.item);
      }.bind(this)
    });
  }

  handleSelect = () => {
    var checked = !this.props.check;

    this.props.handleSelect(this.props.item, checked);
  }
}
