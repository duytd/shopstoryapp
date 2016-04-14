var Customer = React.createClass({
  render: function() {
    return (
      <Item
        item={this.props.customer}
        deleteUrl={this.props.deleteUrl}
        handleSelect={this.props.handleSelect}
        handleDeleteItem={this.props.handleDeleteItem}
        check={this.props.customer.checked}>

        <td className="name">
          <a href={Routes.edit_merchant_customer_path(this.props.customer.id)}>
            {this.props.customer.email}
          </a>
        </td>
        <td>
          {this.props.customer.total_orders}
        </td>
        <td>
          {this.props.customer.total_spent}
        </td>
      </Item>
    );
  }
});