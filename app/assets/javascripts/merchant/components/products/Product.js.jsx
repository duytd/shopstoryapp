var Product = React.createClass({
  render: function() {
    return (
      <Item
        item={this.props.product}
        deleteUrl={this.props.deleteUrl}
        handleSelect={this.props.handleSelect}
        handleDeleteItem={this.props.handleDeleteItem}
        check={this.props.product.checked}>

        <td>
          <a href={Routes.edit_merchant_product_path(this.props.product.id)}>
            {"#" + this.props.product.id}
          </a>
        </td>
        <td>
          <a href={Routes.edit_merchant_product_path(this.props.product.id)}>
            <img width="25" height="25" className="img-responsive" src={(this.props.product.images.length > 0) ? this.props.product.images[0].image.thumb.url : null} />
          </a>
        </td>
        <td className="name">
          <a href={Routes.edit_merchant_product_path(this.props.product.id)}>
            {(this.props.product.name_ko == "") ? this.props.product.name_en : this.props.product.name_ko}
          </a>
        </td>
        <td>
          {this.props.product.price.toKoreanFormat()}
        </td>
        <td>
          {this.props.product.in_stock}
        </td>
        <td>
          {this.props.product.visibility.toString().toUpperCase()}
        </td>
      </Item>
    );
  }
});
