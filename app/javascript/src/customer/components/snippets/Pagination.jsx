import React from 'react';
import I18n from 'i18n-js';

export default class Pagination extends React.Component {
  constructor() {
    super(props);

    this.state = {
      prev: null,
      next: null,
      prevPages: [],
      nextPages: []
    };
  }

  render() {
    return PaginationRT.apply(this);
  }

  componentDidMount() {
    this.loadPages(this.props.page);
  }

  componentWillReceiveProps(nextProps) {
    this.loadPages(nextProps.page);
  }

  loadPages = (page) => {
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
}
