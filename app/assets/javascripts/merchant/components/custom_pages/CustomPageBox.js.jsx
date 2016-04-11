var CustomPageBox = React.createClass({
  render: function() {
    var customPageList = (
      <CustomPageList
        custom_pages={this.props.custom_pages} />
    )

    if (this.props.custom_pages.length == 0) {
      customPageList = (
        <div className="text-center">
          <p>{I18n.t("merchant.admin.messages.no_custom_page")}</p>
          <a href={this.props.url} className="btn btn-lg btn-primary">
            {I18n.t("merchant.admin.buttons.add")}
          </a>
        </div>
      )
    }

    return (
      <Box
        name="custom-page"
        list={customPageList}
        url={Routes.new_merchant_custom_page_path()}
        title={I18n.t("merchant.admin.custom_pages.title")} />
    );
  }
})
