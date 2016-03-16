var PaginationMixin = {
  getInitialState: function () {
    return {
      totalPage: this.props.total_count,
      page: 0,
    }
  },
  updatePage: function(page) {
    this.setState({page: page});
  }
}

module.exports = PaginationMixin;
