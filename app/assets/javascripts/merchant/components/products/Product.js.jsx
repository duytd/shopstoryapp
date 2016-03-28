var Product = React.createClass({
  render: function() {
    return (
      <Item item={this.props.product} deleteUrl={this.props.deleteUrl} handleSelect={this.props.handleSelect}
        handleDeleteItem={this.props.handleDeleteItem} check={this.props.product.checked}>
        <td className="name">
          <a href={Routes.edit_merchant_product_path(this.props.product.id)}>
            {(this.props.product.name_ko == "") ? this.props.product.name_en : this.props.product.name_ko}
          </a>
        </td>
      </Item>
    );
  }
});
