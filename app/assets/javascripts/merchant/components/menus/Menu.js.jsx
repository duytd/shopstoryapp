var Menu = React.createClass({
  getInitialState: function() {
    var placeholder = document.createElement("div");
    placeholder.className = "placeholder";

    return {
      placeholder: placeholder,
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
          <form ref="form">
            <div className="draggable-list" onDragOver={this.dragOver}>
              {menuItems}
            </div>
          </form>
        </div>
      </div>
    )
  },
  dragStart: function(e) {
    this.dragged = e.currentTarget;

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget);
  },
  dragEnd: function(e) {
    e.preventDefault();

    this.dragged.style.display = "block";

    if (this.dragged.parentNode.querySelectorAll(".placeholder").length == 0) return;

    this.dragged.parentNode.removeChild(this.state.placeholder);

    var data = this.state.items;
    var from = Number(this.dragged.dataset.index);
    var to = Number(this.over.dataset.index);

    if (this.nodePlacement == "before") {
      to--;
    }

    if(this.nodePlacement == "after") {
      to++;
    }

    data.splice(to, 0, data.splice(from, 1)[0]);

    this.setState({items: data}, this.submit);
  },
  dragOver: function(e) {
    e.preventDefault();

    this.dragged.style.display = "none";

    if (e.target.className != "draggable-item") return;
    this.over = e.target;

    var from = Number(this.dragged.dataset.index);
    var to = Number(this.over.dataset.index);
    var parent = e.target.parentNode;

    if (from < to) {
      this.nodePlacement = "after";
      parent.insertBefore(this.state.placeholder, e.target.nextElementSibling);
    }
    else if (from > to) {
      this.nodePlacement = "before";
      parent.insertBefore(this.state.placeholder, e.target);
    }
  },
  submit: function(position) {
    var id = this.props.menu.id;
    data = $(this.refs.form).serialize();

    $.ajax({
      url: Routes.merchant_menu_path(id),
      data: data,
      method: "PUT"
    })
  },
  deleteMenu: function(e) {
    e.preventDefault();

    var id = this.props.menu.id;
    data = $(this.refs.form).serialize();

    $.ajax({
      url: Routes.merchant_menu_path(id),
      method: "DELETE",
      success: function() {
        this.props.deleteMenu(this.props.menu)
      }.bind(this)
    })
  }
})
