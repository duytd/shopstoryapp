var CustomPageList = React.createClass({
  render: function() {
    var headers = (
      <th>{I18n.t("activerecord.attributes.custom_page.title")}</th>
    );

    return (
      <List
        type="custom_page"
        items={this.props.custom_pages}
        headers={headers}
        deleteAllUrl={Routes.merchant_custom_pages_path()}
      />
    )
  }
});
