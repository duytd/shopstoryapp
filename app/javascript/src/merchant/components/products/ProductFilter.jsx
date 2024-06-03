import React from 'react';
import I18n from 'i18n-js';
import { translate } from '../../../functions';

export default class ProductFilter extends React.Component {
  constructor(props) {
    super(props);

    var label = this.props.selectedCategory ? translate(this.props.selectedCategory, "name") : I18n.t("merchant.admin.products.category")

    this.state = {
      label: label
    };
  }

  render() {
    var categoryNodes = this.props.categories.map(function (category, index) {
      return <li className="dropdown-item" key={"category_" + index} onClick={this.filterByCategory.bind(this, category)}>{translate(category, "name")}</li>
    }.bind(this));

    return (
      <div className="product-filter">
        <div className="dropdown">
          <a href="#" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" role="button">
            {this.state.label}
          </a>
          <ul className="dropdown-menu">
            {categoryNodes}
            <li className="dropdown-item" onClick={this.filterByCategory.bind(this, null)}>{I18n.t("merchant.admin.products.all")}</li>
          </ul>
        </div>
      </div>
    )
  }

  filterByCategory = (category) => {
    var url = this.props.url,
      label = (category == null) ? I18n.t("merchant.admin.products.all") : translate(category, "name"),
      newUrl = (category == null) ? url : url.addParams("category_id", category.id),
      categoryId = (category == null) ? null : category.id;

    this.setState({label: label}, function() {
      $.getJSON(url, {category_id: categoryId}, function(data) {
        this.props.updateData(data, newUrl);
      }.bind(this))
    })
  }
}
