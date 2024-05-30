export default class CustomPageBox extends React.Component {
  render() {
    var customPageList = (
      <CustomPageList
        page={this.props.page}
        totalPage={this.props.total_page}
        url={this.props.url}
        custom_pages={this.props.custom_pages} />
    )

    if (this.props.custom_pages.length == 0) {
      customPageList = (
        <div className="text-center">
          <p>{i18n.t("merchant.admin.messages.no_custom_page")}</p>
          <a href={this.props.new_url} className="btn btn-lg btn-primary">
            {i18n.t("merchant.admin.buttons.add")}
          </a>
        </div>
      )
    }

    var pagination = (
      <Pagination
        page={this.props.page}
        totalPage={this.props.total_page}
        size={this.props.custom_pages.length}
        total={this.props.total}
        url={this.props.url} />
    )

    return (
      <Box
        name="custom-page"
        list={customPageList}
        pagination={pagination}
        url={this.props.new_url}
        title={i18n.t("merchant.admin.custom_pages.title")} />
    );
  }
}
