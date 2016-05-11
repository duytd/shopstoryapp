var BannerList = React.createClass({
  render: function() {
    var headers = [
      I18n.t("activerecord.attributes.banner.name")
    ];

    return (
      <List
        type="banner"
        items={this.props.banners}
        headers={headers}
        page={this.props.page}
        totalPage={this.props.totalPage}
        redirectUrl={this.props.url}
        deleteAllUrl={this.props.url} />
    )
  }
});
