import React from 'react';
import withPaginationMixins from '../../mixins/PaginationMixin';
import * as Routes from '../../../routes';

class CategoryListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  render() {
    return CategoryListRT.apply(this);
  }

  componentDidMount() {
    var url = Routes.customer_category_products_path(this.props.category.slug, {limit: this.props.limit, format: "json"});
    var loading = $(this.refs.loading);

    $.ajax({
      url: url,
      method: "GET",
      beforeSend: function() {
        loading.removeClass("d-none");
      },
      success: function(data) {
        loading.addClass("d-none");
        this.setState({products: data})
      }.bind(this),
      error: function(xhr) {
        alert(xhr.responseText);
      }
    })
  }
}

const CategoryList = withPaginationMixins(CategoryListComponent);
export default CategoryList;
