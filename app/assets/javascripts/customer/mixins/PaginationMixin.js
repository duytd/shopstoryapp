var PaginationMixin = {
  getInitialState: function () {
    return {
      totalPage: this.props.total_page,
      total: this.props.total,
      page: this.props.page,
      paginationUrl: window.location.href
    }
  },
  updatePagination: function(options) {
    var newState = {};

    if(options.total)
      newState.total = options.total;

    if(options.page)
      newState.page = options.page;

    if(options.totalPage)
      newState.totalPage = options.totalPage;

    if(options.paginationUrl)
      newState.paginationUrl = options.paginationUrl;

    this.setState(newState);
  }
}

module.exports = PaginationMixin;
