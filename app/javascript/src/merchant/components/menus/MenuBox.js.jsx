export default class MenuBox extends React.Component {
  render() {
    var menuList = (
      <MenuList
        menus={this.props.menus} />
    )

    if (this.props.menus.length == 0) {
      menuList = (
        <div className="text-center">
          <p>{I18n.t("merchant.admin.messages.no_menu")}</p>
          <a href={this.props.url} className="btn btn-lg btn-primary">
            {I18n.t("merchant.admin.buttons.add")}
          </a>
        </div>
      )
    }

    return (
      <div className="menu-box">
        <div className="block">
          <div className="block-header">
            <span className="title">{I18n.t("merchant.admin.menus.title")}</span>
            <a className="btn btn-sm btn-primary pull-right" href={this.props.new_url}>
              {I18n.t("merchant.admin.buttons.add")}
            </a>
          </div>
        </div>

        {menuList}
      </div>
    )
  }
}
