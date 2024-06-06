import React from 'react';
import I18n from 'i18n-js';
import withCartMixins from '../../mixins/CartMixin';
import withPaginationMixins from '../../mixins/PaginationMixin';

class SearchComponent extends React.Component {
  render() {
    return SearchRT.apply(this);
  }
}

const Search = withPaginationMixins(withCartMixins(SearchComponent));
export default Search;
