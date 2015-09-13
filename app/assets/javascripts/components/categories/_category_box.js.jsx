var CategoryBox = React.createClass({
  render: function() {
    return (
      <div className="category-box block">
        <div className="block-header">
          <span className="title">{I18n.t("merchant.admin.categories.title")}</span>
          <a className="btn btn-sm btn-primary pull-right" href={this.props.url}>{I18n.t("merchant.admin.buttons.add")}</a>
        </div>
        <div className="block-body">
          <CategoryList categories={this.props.data} />
        </div>
      </div>
    );
  }
});
