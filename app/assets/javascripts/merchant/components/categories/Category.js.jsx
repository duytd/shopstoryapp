var Category = React.createClass({
  render: function() {
    return (
      <Item
        item={this.props.category}
        deleteUrl={this.props.deleteUrl}
        handleSelect={this.props.handleSelect}
        handleDeleteItem={this.props.handleDeleteItem}
        check={this.props.category.checked}>

        <td className="name">
          <a href={Routes.edit_merchant_category_path(this.props.category.id)}>
            {(this.props.category.name == "") ? this.props.category.name_en : this.props.category.name}
          </a>
        </td>
      </Item>
    );
  }
})
