import React from 'react';
import I18n from 'i18n-js';

import withDragMixin from '../../mixins/DragMixin';
import MenuItem from './MenuItem';

class WrappedComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.menu.menu_items,
      draggableKlass: "parent",
    };
  }

  componentDidMount() {
    document.addEventListener("swapItem", (e) => {
      const { from, to, menuId } = e.detail;

      if (this.props.menu.id == menuId) {
        this.swapItem(from, to, null);
      }
    });
  }

  render() {
    var menuItems = this.state.items.map(function(item, index) {
      return (
        <div className={"draggable-item " + this.state.draggableKlass} key={"menu_item" + index} data-index={index}>
          <div className="dragger"
            draggable="true"
            onDragOver={this.props.dragOver}
            onDragEnd={this.props.dragEnd}
            onDragStart={this.props.dragStart}
            onTouchMove={this.props.touchMove}
            onTouchEnd={this.props.dragEnd}
            onTouchStart={this.props.dragStart}>
          </div>
          <input type="hidden" name={"menu[menu_items_attributes][" + item.id + "][id]"} value={item.id} />
          <input type="hidden" name={"menu[menu_items_attributes][" + item.id + "][position]"} value={index} />
          <MenuItem
            swapItem={this.swapItem}
            menu_item={item} />
        </div>
      )
    }.bind(this))

    return (
      <div className="menu col-sm-6">
        <div className="block">
          <p className="title">
            {this.props.menu.name}
            <a className="btn btn-sm btn-danger pull-right"
              data-confirm={I18n.t("merchant.admin.forms.confirm")} onClick={this.deleteMenu}>
              {I18n.t("merchant.admin.buttons.delete")}
            </a>
            <a className="btn btn-sm btn-success pull-right" href={Routes.edit_merchant_menu_path.localize(this.props.menu.id)}>
              {I18n.t("merchant.admin.buttons.edit")}
            </a>
          </p>
          <form ref="draggable">
            <div className="draggable-list">
              {menuItems}
            </div>
          </form>
        </div>
      </div>
    )
  }

  swapItem(from, to, parent) {
    var items = this.state.items;

    if (parent) {
      items = items.map(function(parentItem) {
        if (parentItem.id == parent.id) {
          parentItem.children.splice(to, 0, parentItem.children.splice(from, 1)[0]);
        }
        return parentItem;
      })
    }
    else {
      items.splice(to, 0, items.splice(from, 1)[0]);
    }

    this.setState({items: items}, this.submitDraggable);
  }

  submitDraggable() {
    const id = this.props.menu.id;
    const data = $(this.refs.draggable).serialize();

    $.ajax({
      url: Routes.merchant_menu_path.localize(id),
      data: data,
      method: "PUT"
    })
  }

  deleteMenu(e) {
    e.preventDefault();

    var id = this.props.menu.id;

    $.ajax({
      url: Routes.merchant_menu_path.localize(id),
      method: "DELETE",
      success: function() {
        this.props.deleteMenu(this.props.menu)
      }.bind(this)
    })
  }
}

const Menu = withDragMixin(WrappedComponent);
export default Menu;
