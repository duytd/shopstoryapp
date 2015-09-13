var CategoryList = React.createClass({
  getInitialState: function() {
    var categories = JSON.parse(this.props.categories).map(function(category) {
      category.checked = false;
      return category;
    })
    return {categories: categories, checkCount: 0};
  },
  render: function () {
    var categoryNodes = this.state.categories.map(function (category) {
      return <Category category={category} key={category.id} handleSelect={this.handleSelect} 
        handleDeleteCategory={this.deleteCategory} check={category.checked} />
    }.bind(this));

    return (
      <div className="category-list"> 
        <div className={(this.state.checkCount > 0) ? "btn-group" : "hide"} role="group">
          <button type="button" className="btn btn-default disabled">
            {this.state.checkCount + " " + I18n.t("merchant.admin.forms.selected")}
          </button>
          <button type="button" className="btn btn-default" data-confirm={I18n.t("merchant.admin.forms.confirm")}
            onClick={this.handleDeleteAll}>
            {I18n.t("merchant.admin.buttons.delete_selected")}
          </button>
        </div>
        <table className="table category-list">
          <thead>
            <tr>
              <th>
                <label className="styled-cb">
                  <input ref="checkbox" type="checkbox" disabled={this.state.categories.length == 0} 
                    id="selectAll" onChange={this.handleSelectAll} />
                  <i className="fa"></i>
                </label>
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
    this.refs.checkbox.getDOMNode().checked = false;
    this.replaceState({categories: categories, checkCount: categories.length});
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
  handleSelectAll: function() {
    var checked = this.refs.checkbox.getDOMNode().checked;
    var categories = this.state.categories.map(function(category) {
      category.checked = checked;
      return category;
    });
    var checkCount = (checked) ? categories.length : 0;
    this.replaceState({categories: categories, checkCount: checkCount});
  },
  handleSelect: function(category, checked) {
    var categories = this.state.categories;
    var index = categories.indexOf(category);
    var currentChecked = categories[index].checked;
    var checkCount = (checked && !currentChecked) ? this.state.checkCount + 1 : this.state.checkCount - 1;

    if (checkCount < categories.length) {
      this.refs.checkbox.getDOMNode().checked = false;
    }
    categories[index].checked = checked;
    this.replaceState({categories: categories, checkCount: checkCount});
  }
});
