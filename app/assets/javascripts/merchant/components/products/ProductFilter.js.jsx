var ProductFilter = React.createClass({
  getInitialState: function() {
    var label = this.props.selectedCategory ? translate(this.props.selectedCategory, "name") : I18n.t("merchant.admin.products.category")

    return {
      label: label
    }
  },
  render: function() {
    var categoryNodes = this.props.categories.map(function (category, index) {
      return <li key={"category_" + index} onClick={this.filterByCategory.bind(this, category)}>{translate(category, "name")}</li>
    }.bind(this));

    return (
      <div className="product-filter">
        <div className="dropdown">
          <button className="btn btn-default dropdown-toggle" type="button" id="categoryFilterDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            {this.state.label}
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="categoryFilterDropDown">
            {categoryNodes}
            <li onClick={this.filterByCategory.bind(this, null)}>{I18n.t("merchant.admin.products.all")}</li>
          </ul>
        </div>
      </div>
    )
  },
  filterByCategory: function(category) {
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
})
