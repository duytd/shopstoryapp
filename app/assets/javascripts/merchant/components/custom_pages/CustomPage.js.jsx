var CustomPage = React.createClass({
  render: function() {
    return (
      <Item
        item={this.props.custom_page}
        deleteUrl={this.props.deleteUrl}
        handleSelect={this.props.handleSelect}
        handleDeleteItem={this.props.handleDeleteItem}
        check={this.props.custom_page.checked}>

        <td className="name">
          <a href={Routes.edit_merchant_custom_page_path(this.props.custom_page.slug)}>
            {(this.props.custom_page.title_ko == "") ? this.props.custom_page.title_en : this.props.custom_page.title_ko}
          </a>
        </td>
      </Item>
    );
  }
})
