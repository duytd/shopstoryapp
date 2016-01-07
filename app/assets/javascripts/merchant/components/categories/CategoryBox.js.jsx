var CategoryBox = React.createClass({
  render: function() {
    var categoryList = (
      <CategoryList 
        categories={this.props.categories}
      />
    )

    return (
      <Box name="category" 
        list={categoryList} 
        url={this.props.url}
        title={I18n.t("merchant.admin.categories.title")} 
      />
    );
  }
});
