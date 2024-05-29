var Sorter = React.createClass({
  render: SorterRT,
  updateSorter: function(e) {
    e.preventDefault();

    this.props.updateSorter(e.target.value.split(","));
  }
})

module.exports = Sorter;
