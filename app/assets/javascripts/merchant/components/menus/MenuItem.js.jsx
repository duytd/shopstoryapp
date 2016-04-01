var MenuItem = React.createClass({
  getInitialState: function() {
    return {
      draggableKlass: "child_" + this.props.menu_item.id
    }
  },
  mixins: [DragMixin],
  render: function() {
    var children = this.props.menu_item.children.map(function(child, index) {
      return (
        <div
          className={"draggable-item " + this.state.draggableKlass}
          key={"menu_item_" + this.props.menu_item.id + "_child" + index} data-index={index}>
          <div className="dragger"
            draggable="true"
            onDragOver={this.dragOver}
            onDragEnd={this.dragEnd}
            onDragStart={this.dragStart}>
          </div>
          <input type="hidden" name={"menu[menu_items_attributes][" + child.id + "][id]"} value={child.id} />
          <input type="hidden" name={"menu[menu_items_attributes][" + child.id + "][position]"} value={index} />
          <MenuItem
            menu_id={this.props.menu_id}
            showIcon={this.props.showIcon}
            menu_item={child}
            parent={this.props.menu_item}
            setMenuItem={this.props.setMenuItem}
            setParent={this.props.setParent}
            deleteMenuItem={this.props.deleteMenuItem} />
        </div>
      )
    }.bind(this))

    return (
      <div className="menu-item">
        <p className="draggable-title">
          {this.props.menu_item.name_ko} - {this.props.menu_item.name_en}

          {(this.props.showIcon) ?
            <span className="pull-right">
              {(!this.props.parent) ?
                <a onClick={this.setParent}>
                  <i className="fa fa-plus-square-o"></i>
                </a> : null}
              <a onClick={this.setMenuItem}>
                <i className="fa fa-edit"></i>
              </a>
              <a data-confirm={I18n.t("merchant.admin.forms.confirm")} onClick={this.deleteMenuItem}>
                <i className="fa fa-times-circle-o"></i>
              </a>
            </span> : null}
        </p>
          <div className="draggable-list">
            {children}
          </div>
      </div>
    )
  },
  submitDraggable: function() {
   this.props.submitDraggable();
  },
  deleteMenuItem: function(e) {
    e.preventDefault();

    var menuId = this.props.menu_id;
    var id = this.props.menu_item.id;

    $.ajax({
      url: Routes.merchant_menu_menu_item_path(menuId, id),
      method: "DELETE",
      success: function() {
        this.props.deleteMenuItem(this.props.menu_item);
      }.bind(this)
    })
  },
  swapItem: function(from, to, parent) {
    this.props.swapItem(from, to, parent);
  },
  setMenuItem: function() {
    this.props.setMenuItem(this.props.menu_item, this.props.parent);
  },
  setParent: function() {
    this.props.setParent(this.props.menu_item);
  }
})
