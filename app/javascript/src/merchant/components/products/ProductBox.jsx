import React from 'react';
import I18n from 'i18n-js';

import ProductFilter from './ProductFilter';
import ProductList from './ProductList';
import Box from '../../components/general/Box';
import Pagination from '../../components/general/Pagination';

export default class ProductBox extends React.Component {
  constructor(props) {
    super(props);

    var selectedCategory = this.props.filter.category;
    var sorting = this.props.sorting;
    var url = this.props.url;

    if (selectedCategory != null) {
      url = url.addParams("category_id", selectedCategory.id);
    }

    if (sorting != null) {
      url = url.addParams("sorted_by", sorting.sorted_by).addParams("sort_direction", sorting.sort_direction);
    }

    this.state = {
      products: this.props.products,
      page: this.props.page,
      totalPage: this.props.total_page,
      total: this.props.total,
      url: url,
      selectedCategory: selectedCategory
    };
  }

  render() {
    var productList = (
      <div className="product-list">
        <ProductFilter
          url={this.props.url}
          categories={this.props.categories}
          selectedCategory={this.state.selectedCategory}
          updateData={this.updateData} />
        <ProductList
          page={this.state.page}
          totalPage={this.state.totalPage}//
          url={this.props.url}
          downloadCSV={this.downloadCSV}
          export_url={this.props.export_url}
          sorting={this.props.sorting}
          updateData={this.updateData}
          products={this.state.products} />
      </div>
    )

    if (this.state.products.length == 0) {
      productList = (
        <div className="product-list">
          <ProductFilter
            url={this.props.url}
            categories={this.props.categories}
            selectedCategory={this.state.selectedCategory}
            updateData={this.updateData} />
          <div className="text-center">
            <p>{I18n.t("merchant.admin.messages.no_product")}</p>
            <a href={this.props.new_url} className="btn btn-lg btn-primary">
              {I18n.t("merchant.admin.buttons.add")}
            </a>
          </div>
        </div>
      )
    }

    var pagination = (
      <Pagination
        page={this.state.page}
        totalPage={this.state.totalPage}
        size={this.state.products.length}
        total={this.state.total}
        url={this.state.url} />
    )

    return (
      <div className="products">
        <Box name="product"
          list={productList}
          url={this.props.new_url}
          pagination={pagination}
          handleExportAll={this.handleExportAll}
          handleImport={this.handleImport}
          title={I18n.t("merchant.admin.products.title")} />
      </div>
    );
  }

  updateData(data, url) {
    this.setState({
      products: data.products,
      page: data.page,
      totalPage: data.total_page,
      total: data.total,
      url: url
    })
  }

  handleImport(form) {
    var url = this.props.import_url;

    $.ajax({
      url: url,
      data: new FormData(form[0]),
      dataType: "json",
      contentType: false,
      processData: false,
      method: "POST",
      success: function(data) {
        window.location = Routes.merchant_products_path.localize();
      },
      error: function(xhr) {
        alert(xhr.responseJSON.message);
      }
    })
  }

  handleExportAll() {
    var url = this.props.export_url;

    $.ajax({
      url: url,
      method: "POST",
      data: {all: true},
      success: function(data) {
        this.downloadCSV(data);
      }.bind(this)
    })
  }

  downloadCSV(data) {
    var link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + encodeURI(data);
    link.style = "visibility:hidden";
    link.target = "_blank";
    link.download = "products-" + (new Date()).getDate() + "-" + (new Date()).getMonth() + "-" + (new Date()).getFullYear() + ".csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
