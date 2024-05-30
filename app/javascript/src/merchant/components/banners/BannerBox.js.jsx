export default class BannerBox extends React.Component {
  render() {
    var bannerList = (
      <BannerList
        page={this.props.page}
        totalPage={this.props.total_page}
        url={this.props.url}
        banners={this.props.banners} />
    )

    if (this.props.banners.length == 0) {
      bannerList = (
        <div className="text-center">
          <p>{i18n.t("merchant.admin.messages.no_banner")}</p>
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
        size={this.props.banners.length}
        total={this.props.total}
        url={this.props.url} />
    )

    return (
      <Box
        name="banner"
        list={bannerList}
        url={this.props.new_url}
        pagination={pagination}
        title={i18n.t("merchant.admin.banners.title")} />
    );
  }
}
