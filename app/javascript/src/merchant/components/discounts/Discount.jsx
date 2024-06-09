import React from 'react';
import Item from '../../components/general/Item';


export default class Discount extends React.Component {
  render() {
    return (
      <Item
        item={this.props.discount}
        deleteUrl={this.props.deleteUrl}
        handleSelect={this.props.handleSelect}
        handleDeleteItem={this.props.handleDeleteItem}
        check={this.props.discount.checked}>

        <td className="name">
          <a href={Routes.edit_merchant_discount_path.localize(this.props.discount.id)}>
            {this.props.discount.code}
          </a>
        </td>
        <td>{this.props.discount.discount_type}</td>
        <td>{this.props.discount.amount}</td>
        <td>{this.props.discount.start_date}</td>
        <td>{this.props.discount.expiry_date}</td>
      </Item>
    );
  }
}
