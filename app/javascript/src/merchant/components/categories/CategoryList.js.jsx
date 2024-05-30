export default class CategoryList extends React.Component {
  render: function() {
    var headers = [
      i18n.t("activerecord.attributes.category.name")
    ];

    return (
      <List
        type="category"
        items={this.props.categories}
        headers={headers}
        page={this.props.page}
        totalPage={this.props.totalPage}
        redirectUrl={this.props.url}
        deleteAllUrl={this.props.url} />
    )
  }
};
