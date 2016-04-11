var CategoryBox = React.createClass({
  getInitialState: function() {
    return {
      categories: this.props.categories,
      page: this.props.page,
      totalPage: this.props.total_page
    }
  },
  render: function() {
    var categoryList = (
      <CategoryList
        categories={this.state.categories} />
    )

    if (this.state.categories.length == 0) {
      categoryList = (
        <div className="text-center">
          <p>{I18n.t("merchant.admin.messages.no_category")}</p>
          <a href={this.props.url} className="btn btn-lg btn-primary">
            {I18n.t("merchant.admin.buttons.add")}
          </a>
        </div>
      )
    }

    var pagination = null;

    if (this.state.totalPage > 1) {
      pagination = (
        <Pagination
          page={this.state.page}
          totalPage={this.state.totalPage}
          url={Routes.merchant_categories_path()} />
      )
    }

    return (
      <Box
        name="category"
        list={categoryList}
        url={this.props.url}
        pagination={pagination}
        title={I18n.t("merchant.admin.categories.title")} />
    );
  }
})
