export default class CategoryBox extends React.Component {
  render() {
    var categoryList = (
      <CategoryList
        page={this.props.page}
        totalPage={this.props.total_page}
        url={this.props.url}
        categories={this.props.categories} />
    )

    if (this.props.categories.length == 0) {
      categoryList = (
        <div className="text-center">
          <p>{I18n.t("merchant.admin.messages.no_category")}</p>
          <a href={this.props.new_url} className="btn btn-lg btn-primary">
            {I18n.t("merchant.admin.buttons.add")}
          </a>
        </div>
      )
    }

    var pagination = (
      <Pagination
        page={this.props.page}
        totalPage={this.props.total_page}
        size={this.props.categories.length}
        total={this.props.total}
        url={this.props.url} />
    )

    return (
      <Box
        name="category"
        list={categoryList}
        url={this.props.new_url}
        pagination={pagination}
        title={I18n.t("merchant.admin.categories.title")} />
    );
  }
}
