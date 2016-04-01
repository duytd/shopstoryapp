var MenuItem = React.createClass({
  render: function() {
    var children = this.props.menu_item.children.map(function(child, index) {
      return <MenuItem menu_item={item} key={"menu_item_" + this.props.menu_item.id + "_child" + index} />
    })

    return (
      <div className="menu-item">
        <p className="draggable-title">
          {this.props.menu_item.name_ko} - {this.props.menu_item.name_en}

          {(this.props.action) ?
            <span className="pull-right">
              <a onClick={this.setMenuItem}>
                <i className="fa fa-edit"></i>
              </a>
              <a data-confirm={I18n.t("merchant.admin.forms.confirm")} onClick={this.deleteMenuItem}>
                <i className="fa fa-times-circle-o"></i>
              </a>
            </span> : null}
        </p>
      </div>
    )
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
  setMenuItem: function() {
    this.props.setMenuItem(this.props.menu_item);
  }
})
