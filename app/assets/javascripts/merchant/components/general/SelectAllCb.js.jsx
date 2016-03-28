var SelectAllCb = React.createClass({
  render: function() {
    return (
    <label className="styled-cb">
      <input ref="checkbox" type="checkbox" disabled={this.props.isDisabled}
        id="selectAll" onChange={this.handleSelect} checked={this.props.isSelectAll} />
      <i className="fa"></i>
    </label>
    )
  },
  handleSelect: function() {
    var checked = this.refs.checkbox.checked;

    this.props.selectAllHandler(checked);
  }
});
