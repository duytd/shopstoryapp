import React from 'react';
import Menu from './Menu';

export default class MenuList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: this.props.menus
    };
  }

  render() {
    var menus = this.state.menus.map(function(menu, index) {
      return <Menu menu={menu} key={"menu_" + index} deleteMenu={this.deleteMenu} />
    }.bind(this))

    return (
      <div className="menu-list row">
        {menus}
      </div>
    )
  }

  deleteMenu(menu) {
    var menus = this.state.menus;
    var index = menus.indexOf(menu);

    menus.splice(index, 1);
    this.setState({menus: menus})
  }
}
