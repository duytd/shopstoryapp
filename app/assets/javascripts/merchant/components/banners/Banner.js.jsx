var Banner = React.createClass({
  render: function() {
    return (
      <Item
        item={this.props.banner}
        deleteUrl={this.props.deleteUrl}
        handleSelect={this.props.handleSelect}
        handleDeleteItem={this.props.handleDeleteItem}
        check={this.props.banner.checked}>

        <td className="name">
          <a href={Routes.edit_merchant_banner_path(this.props.banner.id)}>
            {(this.props.banner.name == "") ? this.props.banner.name_en : this.props.banner.name}
          </a>
        </td>
      </Item>
    );
  }
})
