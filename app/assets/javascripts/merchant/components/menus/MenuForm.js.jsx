var MenuForm = React.createClass({
  mixins: [DragMixin],
  getInitialState: function () {
    var items = (this.props.menu) ? this.props.menu.menu_items : [];

    return {
      menu: this.props.menu,
      menu_item: null,
      items: items,
      errors: {},
      name_ko_count: 0,
      name_en_count: 0
    };
  },
  render: function () {
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
            menu_id={this.state.menu.id}
            action={true}
            setMenuItem={this.setMenuItem}
            deleteMenuItem={this.deleteMenuItem}
            menu_item={item} />
        </div>
      )
    }.bind(this))

    return (
      <div className="menu-form">
        <form ref="form" action={this.props.url}
          acceptCharset="UTF-8" method={this.props.method} onSubmit={this.submit}>
          <div className="col-sm-2">
            <h4>{I18n.t("merchant.admin.menus.menu_description")}</h4>
          </div>
          <div className="col-sm-10">
            <div className="block">
              <div className="form-group row">
                <div className="col-sm-12">
                  <label className="label">{I18n.t("activerecord.attributes.menu.position")}</label>
                  <div className="form-errors">
                    {(this.state.errors.position) ? this.state.errors.position.map(function(object){
                      return object;
                    }) : ""}
                  </div>
                  <div className="select">
                    <select className="form-control" name="menu[position]"
                      defaultValue={(this.state.menu) ? this.state.menu.position : this.props.positions[0]}>
                      {this.props.positions.map(function(position, index) {
                        return <option key={"position_" + index} value={position}>{position}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12">
                  <label className="label">{I18n.t("activerecord.attributes.menu.name")}</label>
                  <div className="form-errors">
                    {(this.state.errors.name) ? this.state.errors.name.map(function(object){
                      return object;
                    }) : ""}
                  </div>
                  <input type="text" name="menu[name]" defaultValue={(this.state.menu) ? this.state.menu.name : null} className="form-control" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <SubmitButtons redirect_url={Routes.merchant_menus_path()} />
            </div>
          </div>
        </form>

        {(this.state.menu) ?
          <div className="menu-items">
            <div className="col-sm-2">
              <h4>{I18n.t("merchant.admin.menus.menu_items")}</h4>
            </div>
            <div className="col-sm-10">
              <div className="row">
                <div className="col-sm-6">
                  <div className="row">
                    <MenuItemForm
                      categories={this.props.categories}
                      pages={this.props.pages}
                      menu={this.state.menu}
                      menu_item={this.state.menu_item}
                      key={Math.random()}
                      types={this.props.menu_item_types}
                      updateMenuItem={this.updateMenuItem}
                      addMenuItem={this.addMenuItem} />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="block">
                    <form ref="draggable">
                      <div className="draggable-list" onDragOver={this.dragOver}>
                        {(this.state.items.length > 0) ? menuItems : I18n.t("merchant.admin.menu_items.no_item")}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div> : null}
      </div>
    )
  },
  submitDraggable: function() {
    var id = this.state.menu.id;
    data = $(this.refs.draggable).serialize();

    $.ajax({
      url: Routes.merchant_menu_path(id),
      data: data,
      method: "PUT"
    })
  },
  submit: function(e) {
    if (typeof e !== "undefined")
      e.preventDefault();

    var formData = $(this.refs.form).serialize(),
      url = this.props.url,
      method = this.props.method;

    $.ajax({
      data: formData,
      url: url,
      method: method,
      dataType: "json",
      success: function(menu) {
        this.setState({menu: menu, errors: []});
      }.bind(this),
      error: function(xhr) {
        var errors = xhr.responseJSON;
        var name_ko_count = (errors.name_ko) ? errors.name_ko.length : 0;
        var name_en_count = (errors.name_en) ? errors.name_en.length : 0;

        this.setState({
          errors: errors,
          name_ko_count: name_ko_count,
          name_en_count: name_en_count
        });
      }.bind(this)
    });
  },
  addMenuItem: function(item) {
    var items = this.state.items;
    items.push(item);

    this.setState({items: items, menu_item: null});
  },
  deleteMenuItem: function(item) {
    var items = this.state.items;
    var index = items.indexOf(item);

    items.splice(index, 1);
    this.setState({items: items});
  },
  updateMenuItem: function(oldItem, newItem) {
    var items = this.state.items;
    var index = items.indexOf(oldItem);
    items[index] = newItem;

    this.setState({items: items, menu_item: null});
  },
  setMenuItem: function(item) {
    this.setState({menu_item: item})
  }
});
