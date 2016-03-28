var ShippingRate = React.createClass({
  render: function() {
    return (
      <Item item={this.props.shipping_rate} deleteUrl={this.props.deleteUrl} handleSelect={this.props.handleSelect}
        handleDeleteItem={this.props.handleDeleteItem} check={this.props.shipping_rate.checked}>
        <td className="name">
          <a href={Routes.edit_merchant_shipping_rate_path(this.props.shipping_rate.id)}>
            {(this.props.shipping_rate.name_ko == "") ? this.props.shipping_rate.name_en : this.props.shipping_rate.name_ko}
          </a>
        </td>
      </Item>
    );
  }
});
