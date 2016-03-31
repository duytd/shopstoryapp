var MenuItem = React.createClass({
  render: function() {
    var children = this.props.menu_item.children.map(function(child, index) {
      return <MenuItem menu_item={item} key={"menu_item_" + this.props.menu_item.id + "_child" + index} />
    })

    return (
      <div className="menu-item">
        <p className="title">{this.props.menu_item.name}</p>
        {children}
      </div>
    )
  }
})
