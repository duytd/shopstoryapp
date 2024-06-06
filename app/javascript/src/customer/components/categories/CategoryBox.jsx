import React from 'react';
import I18n from 'i18n-js';
import withCartMixins from '../../mixins/CartMixin';

class CategoryBoxComponent extends React.Component {
  render() {
    return CategoryBoxRT.apply(this);
  }
}

const CategoryBox = withCartMixins(CategoryBoxComponent);
export default CategoryBox;
