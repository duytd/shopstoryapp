var CustomPageBox = React.createClass({
  render: function() {
    var customPageList = (
      <CustomPageList
        custom_pages={this.props.custom_pages}
      />
    )

    return (
      <Box name="custom-page"
        list={customPageList}
        url={Routes.new_merchant_custom_page_path()}
        title={I18n.t("merchant.admin.custom_pages.title")}
      />
    );
  }
});
