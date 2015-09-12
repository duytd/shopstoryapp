var CategoryList = React.createClass({
  getInitialState: function() {
    var categories = JSON.parse(this.props.categories).map(function(category) {
      category.checked = false;
      return category;
    });
    return {categories: categories, checkCount: 0, isSelectAll: false};
  },
  render: function () {
    var categoryNodes = this.state.categories.map(function (category) {
      return <Category category={category} key={category.id} handleSelect={this.handleSelect} 
        handleDeleteCategory={this.deleteCategory} check={category.checked} />
    }.bind(this));

    return (
      <div className="category-list"> 
        <BulkAction checkCount={this.state.checkCount} deleteAllHandler={this.handleDeleteAll} />
        <table className="table category-list">
          <thead>
            <tr>
              <th>
                <SelectAllCb isSelectAll={this.state.isSelectAll} selectAllHandler={this.handleSelectAll} 
                  isDisabled={this.state.categories.length == 0} />
              </th>
              <th>{I18n.t("activerecord.attributes.category.name")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categoryNodes}
          </tbody>
        </table>
      </div>
    );
  },
  deleteCategory: function(category) {
    var categories = this.state.categories;
    var index = categories.indexOf(category);

    categories.splice(index, 1);
    this.replaceState({categories: categories});
  },
  deleteAllCategory: function(category_ids) {
    var categories = this.state.categories;

    categories = categories.filter(function(category) {
      return (category_ids.indexOf(category.id) == -1)
    });
    this.replaceState({categories: categories, checkCount: categories.length, isSelectAll: false});
  },
  handleDeleteAll: function(e) {
    e.preventDefault();
    var category_ids = this.state.categories.map(function(category) {
      if (category.checked == true) {
        return category.id;
      }
    });

    $.ajax({
      url: "/admin/categories",
      method: "DELETE",
      data: {category_ids: category_ids},
      dataType: "json",
      success: function(data) {
        if (data.status == "success") {
          this.deleteAllCategory(category_ids);
        }
      }.bind(this)
    });
  },
  handleSelectAll: function(checked) {
    var categories = this.state.categories.map(function(category) {
      category.checked = checked;
      return category;
    });
    var checkCount = (checked) ? categories.length : 0;

    this.replaceState({categories: categories, checkCount: checkCount, isSelectAll: checked});
  },
  handleSelect: function(category, checked) {
    var categories = this.state.categories;
    var index = categories.indexOf(category);
    var currentChecked = categories[index].checked;
    var checkCount = (checked && !currentChecked) ? this.state.checkCount + 1 : this.state.checkCount - 1;
    var isSelectAll = (checkCount < categories.length) ? false : true;

    categories[index].checked = checked;
    this.replaceState({categories: categories, checkCount: checkCount, isSelectAll: isSelectAll});
  }
});
