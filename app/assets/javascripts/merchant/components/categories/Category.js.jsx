var Category = React.createClass({
  render: function() {
    return (
      <td className="name">
        <a href={Routes.edit_merchant_category_path(this.props.category.id)}>
          {(this.props.category.name == "") ? this.props.category.name_en : this.props.category.name}
        </a>
      </td>
    );
  }
});
