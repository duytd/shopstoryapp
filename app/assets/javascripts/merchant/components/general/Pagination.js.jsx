var Pagination = React.createClass({
  getInitialState: function() {
    return {
      prev: null,
      next: null,
      prevPages: [],
      nextPages: []
    }
  },
  render: function() {
    return (
      <div>
      {(this.props.totalPage > 1) ?
        <div className="pagination">
          {(this.props.page > 1) ?
          <a href={this.props.url.addParams("page", 1)}>
            {I18n.t("merchant.admin.pagination.first")}
          </a> : null}

          {(this.state.prev != null) ?
          <a href={this.props.url.addParams("page", this.state.prev)}>
            {I18n.t("merchant.admin.pagination.previous")}
          </a> : null}

          {(this.state.prevPages[0] > 1) ?
          <span>...</span> : null}

          {this.state.prevPages.map(function(page, index) {
            <a key={"prev_" + index} href={this.props.url.addParams("page", page)}>
              {page}
            </a>
           }.bind(this))}

          <span className="current">{this.props.page}</span>

          {this.state.nextPages.map(function(page, index) {
            <a key={"next_" + index} href={this.props.url.addParams("page", page)}>
              {page}
            </a>
          }.bind(this))}

          {(this.state.nextPages[this.state.nextPages.length - 1] < this.props.totalPage) ?
          <span rt-if="">...</span> : null}

          {(this.state.next != null) ?
          <a href={this.props.url.addParams("page", this.state.next)}>
            {I18n.t("merchant.admin.pagination.next")}
          </a> : null}

          {(this.props.page < this.props.totalPage) ?
          <a href={this.props.url.addParams("page", this.props.totalPage)}>
            {I18n.t("merchant.admin.pagination.last")}
          </a> : null}
        </div> : null}
      </div>
    )
  },
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
