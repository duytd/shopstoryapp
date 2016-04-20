var CustomPageList = React.createClass({
  render: function() {
    var headers = [
      I18n.t("activerecord.attributes.custom_page.title")
    ];

    return (
      <List
        type="custom_page"
        items={this.props.custom_pages}
        headers={headers}
        page={this.props.page}
        totalPage={this.props.totalPage}
        redirectUrl={this.props.url}
        deleteAllUrl={this.props.url} />
    )
  }
});
