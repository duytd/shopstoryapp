var MenuList = React.createClass({
  getInitialState: function() {
    return {
      menus: this.props.menus
    }
  },
  render: function() {
    var menus = this.state.menus.map(function(menu, index) {
      return <Menu menu={menu} key={"menu_" + index} deleteMenu={this.deleteMenu} />
    })

    return (
      <div className="menu-list row">
        {menus}
      </div>
    )
  },
  deleteMenu: function(menu) {
    var menus = this.state.menus;
    var index = menus.indexOf(menu);

    menus.splice(index, 1);
    this.setState({menus: menus})
  }
})
