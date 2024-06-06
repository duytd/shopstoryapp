import React from 'react';

const withPaginationMixins = (WrappedComponent) => {
  return class extends React.Component {
    constructor() {
      super(props);

      this.state = {
        totalPage: this.props.total_page,
        total: this.props.total,
        page: this.props.page,
        paginationUrl: this.props.url
      };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }

    updatePagination = (options) => {
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
}

export default withPaginationMixins;
