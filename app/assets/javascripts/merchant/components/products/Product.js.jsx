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
          <a href={Routes.edit_merchant_product_path.localize(this.props.product.slug)}>
            {"#" + this.props.product.id}
          </a>
        </td>
        <td>
          <a href={Routes.edit_merchant_product_path.localize(this.props.product.slug)}>
            <img width="25" height="25" className="img-responsive" src={this.props.product.feature_image ? this.props.product.feature_image.image.thumb.url : null} />
          </a>
        </td>
        <td className="name">
          <a href={Routes.edit_merchant_product_path.localize(this.props.product.slug)}>
            {translate(this.props.product, "name")}
          </a>
        </td>
        <td>
          {this.props.product.price.toKoreanFormat()}
        </td>
        <td>
          {this.props.product.sku}
        </td>
        <td>
          {this.props.product.vendor}
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
