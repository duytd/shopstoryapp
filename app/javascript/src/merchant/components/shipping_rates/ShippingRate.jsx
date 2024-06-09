import React from 'react';
import Item from '../../components/general/Item';

import { translate } from '../../../functions';

export default class ShippingRate extends React.Component {
  render() {
    return (
      <Item
        item={this.props.shipping_rate}
        deleteUrl={this.props.deleteUrl}
        handleSelect={this.props.handleSelect}
        handleDeleteItem={this.props.handleDeleteItem}
        check={this.props.shipping_rate.checked}>

        <td className="name">
          <a href={Routes.edit_merchant_shipping_rate_path.localize(this.props.shipping_rate.id)}>
            {translate(this.props.shipping_rate, "name")}
          </a>
        </td>
      </Item>
    );
  }
}
