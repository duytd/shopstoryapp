import React from 'react';
import withPaginationMixins from '../../mixins/PaginationMixin';

class CategoryComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      globalVars: this.props.globalVars,
      data: this.props.products,
      vendor: [],
      price: [],
      sorter: []
    };
  }

  render() {
    return CategoryRT.apply(this);
  }

  updateOrder = (order) => {
    var globalVars = this.state.globalVars;

    globalVars.order = order;
    this.setState({globalVars: globalVars});
  }

  updatePrice = (price) => {
    this.setState({price: price}, this.updateData);
  }

  updateVendor = (vendor) => {
    this.setState({vendor: vendor}, this.updateData);
  }

  updateSorter = (sorter) => {
    this.setState({sorter: sorter}, this.updateData);
  }

  updateData = () => {
    var filterUrl = this.props.filter.url;

    if (this.state.sorter.length > 0) {
      filterUrl = filterUrl.addParams("sorted_by", this.state.sorter[0])
        .addParams("sort_direction", this.state.sorter[1]);
    }

    if (this.state.vendor.length > 0) {
      filterUrl = filterUrl.addParams("vendor", this.state.vendor);
    }

    if (this.state.price.length > 0) {
      filterUrl = filterUrl.addParams("price[]", this.state.price[0])
        .addParams("price[]", this.state.price[1]);
    }

    $.getJSON(filterUrl, function(response) {
      this.setState({data: response.data}, function() {
        this.props.updatePagination({
          paginationUrl: filterUrl,
          totalPage: response.total_page,
          page: response.page, total: response.total
        });
      }.bind(this))
    }.bind(this));
  }
}

const Category = withPaginationMixins(CategoryComponent);
export default Category;
