var MenuBox = React.createClass({
  render: function() {
    var menuList = (
      <MenuList
        menus={this.props.menus} />
    )

    return (
      <div className="menu-box">
        <div className="block">
          <div className="block-header">
            <span className="title">{I18n.t("merchant.admin.menus.title")}</span>
            <a className="btn btn-sm btn-primary pull-right" href={Routes.new_merchant_menu_path()}>{I18n.t("merchant.admin.buttons.add")}</a>
          </div>
        </div>

        {menuList}
      </div>
    )
  }
})
