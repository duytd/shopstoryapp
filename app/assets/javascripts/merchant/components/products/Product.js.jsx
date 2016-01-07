var Product = React.createClass({
  render: function() {
    return (
      <td className="name">
        <a href={Routes.edit_merchant_product_path(this.props.product.id)}>
          {(this.props.product.name == "") ? this.props.product.name_en : this.props.product.name}
        </a>
      </td>
    );
  }
});
