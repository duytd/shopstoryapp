import React from 'react';
import * as Routes from '../../../routes';

export default class CustomPage extends React.Component {
  render() {
    return (
      <Item
        item={this.props.custom_page}
        deleteUrl={this.props.deleteUrl}
        handleSelect={this.props.handleSelect}
        handleDeleteItem={this.props.handleDeleteItem}
        check={this.props.custom_page.checked}>

        <td className="name">
          <a href={Routes.edit_merchant_custom_page_path.localize(this.props.custom_page.slug)}>
            {translate(this.props.custom_page, "title")}
          </a>
        </td>
      </Item>
    );
  }
}
