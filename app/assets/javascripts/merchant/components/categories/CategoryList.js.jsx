var CategoryList = React.createClass({
  render: function() {
    var headers = [
      I18n.t("activerecord.attributes.category.name")
    ];

    return (
      <List
        type="category"
        items={this.props.categories}
        headers={headers}
        deleteAllUrl={Routes.merchant_categories_path()} />
    )
  }
});
