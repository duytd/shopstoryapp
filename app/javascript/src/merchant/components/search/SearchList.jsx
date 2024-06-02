import React from 'react';
import I18n from 'i18n-js';
import { translate } from '../../../functions';

export default class SearchList extends React.Component {
  render() {
    var productTab = (
      <li className="active">
        <a data-toggle="tab" href="#products">
          {I18n.t("merchant.admin.search.products")}
          {(this.props.products.length > 0) ? <span className="badge badge-danger">{this.props.products.length}</span> : null}
        </a>
      </li>
    )

    var categoryTab = (
      <li>
        <a data-toggle="tab" href="#categories">
          {I18n.t("merchant.admin.search.categories")}
          {(this.props.categories.length > 0) ? <span className="badge badge-danger">{this.props.categories.length}</span> : null}
        </a>
      </li>
    )

    var customPageTab = (
      <li>
        <a data-toggle="tab" href="#pages">
          {I18n.t("merchant.admin.search.custom_pages")}
          {(this.props.pages.length > 0) ? <span className="badge badge-danger">{this.props.pages.length}</span> : null}
        </a>
      </li>
    )

    var customerTab = (
      <li>
        <a data-toggle="tab" href="#customers">
          {I18n.t("merchant.admin.search.customers")}
          {(this.props.customers.length > 0) ? <span className="badge badge-danger">{this.props.customers.length}</span> : null}
        </a>
      </li>
    )

    return (
      <div className="search-list block d-none">
        <ul className="nav nav-tabs">
          {productTab}
          {categoryTab}
          {customPageTab}
          {customerTab}
        </ul>

        <div className="tab-content">
          <div id="products" className="tab-pane fade in active">
            {this.props.products.length == 0 ? <p>{I18n.t("merchant.admin.search.no_result")}</p> : null}
            {this.props.products.map(function(product) {
              return this.renderProduct(product);
            }.bind(this))}
          </div>

          <div id="categories" className="tab-pane fade">
            {this.props.categories.length == 0 ? <p>{I18n.t("merchant.admin.search.no_result")}</p> : null}
            {this.props.categories.map(function(category) {
              return this.renderCategory(category);
            }.bind(this))}
          </div>

          <div id="pages" className="tab-pane fade">
            {this.props.pages.length == 0 ? <p>{I18n.t("merchant.admin.search.no_result")}</p> : null}
            {this.props.pages.map(function(page) {
              return this.renderPage(page);
            }.bind(this))}
          </div>

          <div id="customers" className="tab-pane fade">
            {this.props.customers.length == 0 ? <p>{I18n.t("merchant.admin.search.no_result")}</p> : null}
            {this.props.customers.map(function(customer) {
              return this.renderCustomer(customer);
            }.bind(this))}
          </div>
        </div>
      </div>
    )
  }

  renderProduct(product) {
    return (
      <div className="media" key={"product_" + product.id}>
        <div className="media-left">
          <a href={Routes.edit_merchant_product_path.localize(product.id)}>
            <img className="media-object" height="80" src={product.images.length > 0 ? product.images[0].image.thumb.url : null} />
          </a>
        </div>
        <div className="media-body">
          <h4 className="media-heading">
            <a href={Routes.edit_merchant_product_path.localize(product.id)}>
              {translate(product, "name")}
            </a>
          </h4>
          <p><label>{I18n.t("activerecord.attributes.product.sku")}:</label> {product.sku}</p>
          <p><label>{I18n.t("activerecord.attributes.product.price")}:</label> {product.price}</p>
          <p><label>{I18n.t("activerecord.attributes.product.in_stock")}:</label> {product.in_stock}</p>
        </div>
      </div>
    )
  }

  renderCategory(category) {
    return (
      <div className="category" key={"category_" + category.id}>
        <h4>
          <a href={Routes.edit_merchant_category_path.localize(category.id)}>
            {translate(category, "name")}
          </a>
        </h4>
      </div>
    )
  }

  renderPage(page) {
    return (
      <div className="page" key={"page_" + page.id}>
        <h4>
          <a href={Routes.edit_merchant_custom_page_path.localize(page.id)}>
            {translate(page, "title")}
          </a>
        </h4>
        <p>{translate(page, "content")}</p>
      </div>
    )
  }

  renderCustomer(customer) {
    return (
      <div className="customer" key={"customer_" + customer.id}>
        <h4>
          <a href={Routes.edit_merchant_customer_path.localize(customer.id)}>
            {customer.first_name} {customer.last_name}
          </a>
        </h4>
        <p><label>{I18n.t("activerecord.attributes.customer.email")}:</label> <a href={Routes.edit_merchant_customer_path.localize(customer.id)}>{customer.email}</a></p>
        <p><label>{I18n.t("activerecord.attributes.customer.phone_number")}:</label> {customer.phone_number}</p>
      </div>
    )
  }
}
