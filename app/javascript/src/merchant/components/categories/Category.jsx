import React from 'react';
import Item from '../../components/general/Item';
import * as Routes from '../../../routes';
import { translate } from '../../../functions';

export default class Category extends React.Component {
  render() {
    return (
      <Item
        item={this.props.category}
        deleteUrl={this.props.deleteUrl}
        handleSelect={this.props.handleSelect}
        handleDeleteItem={this.props.handleDeleteItem}
        check={this.props.category.checked}>

        <td className="name">
          <a href={Routes.edit_merchant_category_path.localize(this.props.category.slug)}>
            {translate(this.props.category, "name")}
          </a>
        </td>
      </Item>
    );
  }
}
