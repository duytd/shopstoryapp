var Menu = React.createClass({
  mixins: [DragMixin],
  getInitialState: function() {
    return {
      items: this.props.menu.menu_items
    }
  },
  render: function() {
    var menuItems = this.state.items.map(function(item, index) {
      return (
        <div
          className="draggable-item"
          data-index={index}
          key={"menu_item" + index}
          draggable="true"
          onDragEnd={this.dragEnd}
          onDragStart={this.dragStart}>
          <input type="hidden" name={"menu[menu_items_attributes][" + index + "][id]"} value={item.id} />
          <input ref={"item_position_" + item.id} type="hidden" name={"menu[menu_items_attributes][" + index + "][position]"} value={index} />
          <MenuItem
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
            <a className="btn btn-sm btn-success pull-right" href={Routes.edit_merchant_menu_path(this.props.menu.id)}>
              {I18n.t("merchant.admin.buttons.edit")}
            </a>
          </p>
          <form ref="draggable">
            <div className="draggable-list" onDragOver={this.dragOver}>
              {menuItems}
            </div>
          </form>
        </div>
      </div>
    )
  },
  submitDraggable: function() {
    var id = this.props.menu.id;
    data = $(this.refs.draggable).serialize();

    $.ajax({
      url: Routes.merchant_menu_path(id),
      data: data,
      method: "PUT"
    })
  },
  deleteMenu: function(e) {
    e.preventDefault();

    var id = this.props.menu.id;

    $.ajax({
      url: Routes.merchant_menu_path(id),
      method: "DELETE",
      success: function() {
        this.props.deleteMenu(this.props.menu)
      }.bind(this)
    })
  }
})
