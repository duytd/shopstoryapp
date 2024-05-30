export default class MenuForm extends React.Component {
  mixins: [DragMixin],
  getInitialState() {
    var items = (this.props.menu) ? this.props.menu.menu_items : [];

    return {
      menu: this.props.menu,
      draggableKlass: "parent",
      menu_item: null,
      parent: null,
      items: items,
      errors: {},
      name_ko_count: 0,
      name_en_count: 0
    };
  },
  render() {
    var menuItems = this.state.items.map(function(item, index) {
      return (
        <div className={"draggable-item " + this.state.draggableKlass} data-index={index} key={"menu_item" + index}>
          <div className="dragger"
            draggable="true"
            onDragOver={this.dragOver}
            onDragEnd={this.dragEnd}
            onDragStart={this.dragStart}
            onTouchMove={this.touchMove}
            onTouchEnd={this.dragEnd}
            onTouchStart={this.dragStart}>
          </div>
          <input type="hidden" name={"menu[menu_items_attributes][" + item.id + "][id]"} value={item.id} />
          <input type="hidden" name={"menu[menu_items_attributes][" + item.id + "][position]"} value={index} />
          <MenuItem
            menu_id={this.state.menu.id}
            showIcon={true}
            setParent={this.setParent}
            setMenuItem={this.setMenuItem}
            deleteMenuItem={this.deleteMenuItem}
            swapItem={this.swapItem}
            submitDraggable={this.submitDraggable}
            menu_item={item} />
        </div>
      )
    }.bind(this))

    return (
      <div className="menu-form row">
        <form ref="form" action={this.props.url}
          acceptCharset="UTF-8" method={this.props.method} onSubmit={this.submit}>
          <div className="col-sm-2">
            <h4>{i18n.t("merchant.admin.menus.menu_description")}</h4>
          </div>
          <div className="col-sm-10">
            <div className="block">
              <div className="form-group row">
                <div className="col-sm-12">
                  <label className="label">{i18n.t("activerecord.attributes.menu.position")}</label>
                  <FormErrors errors={this.state.errors.position} />
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
                  <label className="label">{i18n.t("activerecord.attributes.menu.name")}</label>
                  <FormErrors errors={this.state.errors.name} />
                  <input type="text" name="menu[name]" defaultValue={(this.state.menu) ? this.state.menu.name : null} className="form-control" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <SubmitButtons redirect_url={Routes.merchant_menus_path.localize()} />
            </div>
          </div>
        </form>

        {(this.state.menu) ?
          <div className="menu-items">
            <div className="col-sm-2">
              <h4>{i18n.t("merchant.admin.menus.menu_items")}</h4>
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
                      parent={this.state.parent}
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
                        {(this.state.items.length > 0) ? menuItems : i18n.t("merchant.admin.menu_items.no_item")}
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
  },
  submitDraggable() {
    var id = this.state.menu.id;
    data = $(this.refs.draggable).serialize();

    $.ajax({
      url: Routes.merchant_menu_path.localize(id),
      data: data,
      method: "PUT"
    })
  },
  submit(e) {
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
  addMenuItem(item) {
    var items = this.state.items;

    if (item.parent_id) {
      items = items.map(function(parentItem) {
        if (parentItem.id == item.parent_id) {
          parentItem.children.push(item);
        }
        return parentItem;
      })
    }
    else {
      items.push(item);
    }

    this.setState({items: items, menu_item: null, parent: null});
  },
  deleteMenuItem(item) {
    var items = this.state.items;

    if (item.parent_id) {
      var i = 0;

      items = items.map(function(parentItem) {
        if (parentItem.id == item.parent_id) {
          parentItem.children.forEach(function(childItem, index){
            if (childItem == item.id) {
              i = index;
            }
          })

          parentItem.children.splice(i, 1);
        }
        return parentItem;
      })
    }
    else {
      var index = items.indexOf(item);
      items.splice(index, 1);
    }

    this.setState({items: items});
  },
  updateMenuItem(oldItem, newItem) {
    var items = this.state.items;

    if (oldItem.parent_id) {
      var i = 0;

      items = items.map(function(parentItem) {
        if (parentItem.id == oldItem.parent_id) {
          parentItem.children.forEach(function(childItem, index){
            if (childItem == oldItem.id) {
              i = index;
            }
          })

          parentItem.children[i] = newItem;
        }
        return parentItem;
      })

    }
    else {
      var index = items.indexOf(oldItem);
      items[index] = newItem;
    }

    this.setState({items: items, menu_item: null, parent: null});
  },
  setMenuItem(item, parent) {
    if (parent) {
      this.setState({menu_item: item, parent: parent});
    }
    else {
      this.setState({menu_item: item})
    }
  },
  setParent(item) {
    this.setState({parent: item, menu_item: null})
  }
}
