var Pagination = React.createClass({
  getInitialState: function() {
    return {
      prev: null,
      next: null,
      prevPages: [],
      nextPages: []
    }
  },
  render: PaginationRT,
  componentDidMount: function() {
    this.loadPages(this.props.page);
  },
  componentWillReceiveProps: function(nextProps) {
    this.loadPages(nextProps.page);
  },
  loadPages: function(page) {
    var prevPages = [],
      nextPages = [],
      prev = null,
      next = null,
      prevIndex = 0,
      nextIndex = 0;

    if (page > 1 && page <= this.props.totalPage) {
      prev = page - 1;
      for (var i = page - 1; i >= 1; i--) {
        prevPages.push(i);
        if (prevIndex == 3) break;
        prevIndex ++;
      }
    }

    if (page >= 1 && page < this.props.totalPage) {
      next = page + 1;
      for (var i = page + 1; i <= this.props.totalPage; i++) {
        nextPages.push(i);
        if (nextIndex == 3) break;
        nextIndex ++;
      }
    }

    this.setState({prev: prev, next: next, prevPages: prevPages.reverse(), nextPages: nextPages})
  }
})

module.exports = Pagination;
