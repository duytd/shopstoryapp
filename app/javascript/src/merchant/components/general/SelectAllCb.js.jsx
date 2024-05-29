export default class SelectAllCb extends React.Component {
  render() {
    return (
    <label className="styled-cb">
      <input ref="checkbox" type="checkbox" disabled={this.props.isDisabled}
        id="selectAll" onChange={this.handleSelect} checked={this.props.isSelectAll} />
      <i className="fa"></i>
    </label>
    )
  },
  handleSelect() {
    var checked = this.refs.checkbox.checked;

    this.props.selectAllHandler(checked);
  }
}
