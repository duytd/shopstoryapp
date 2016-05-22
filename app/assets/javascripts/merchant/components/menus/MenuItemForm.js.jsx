var MenuItemForm = React.createClass({
  getInitialState: function () {
    var type = (this.props.types) ? "home" : null;

    if (this.props.menu_item) {
      switch(this.props.menu_item.type) {
        case "menu/home_menu":
          type = "home";
          break;
        case "menu/product_menu":
          type = "product";
          break;
        case "menu/product_index_menu":
          type = "product_index";
          break;
        case "menu/category_menu":
          type = "category";
          break;
        case "menu/category_index_menu":
          type = "category_index";
          break;
        case "menu/custom_page_menu":
          type = "custom_page";
          break;
        case "menu/url_menu":
          type = "url";
          break;
      }
    }

    return {
      type: type,
      errors: {},
      name_ko_count: 0,
      name_en_count: 0
    };
  },
  render: function () {
    var defaultCategory = (this.props.categories.length > 0) ? this.props.categories[0][3] : null;

    return (
      <form ref="form" className="menu-item-form" action={this.props.url}
        acceptCharset="UTF-8" method={this.props.method} onSubmit={this.submit}>
        <div className="col-sm-12">
          <div className="block">
            <LocaleNavTab ko_errors_count={this.state.name_ko_count} en_errors_count={this.state.name_en_count} />

            <div className="tab-content">
              <div id="ko" className="tab-pane fade in active">
                <div className="form-group">
                  <label className="label">{I18n.t("activerecord.attributes.menu_item.name")}</label>
                  <FormErrors errors={this.state.errors.name_ko} />
                  <input ref="name_ko" type="text" name="menu_item[name_ko]"
                    className="form-control" defaultValue={(this.props.menu_item) ? this.props.menu_item.name_ko : ""} />
                </div>
              </div>
              <div id="en" className="tab-pane fade">
                <div className="form-group">
                  <label className="label">{I18n.t("activerecord.attributes.menu_item.name")}</label>
                  <FormErrors errors={this.state.errors.name_en} />
                  <input ref="name_en" type="text" name="menu_item[name_en]"
                    className="form-control" defaultValue={(this.props.menu_item) ? this.props.menu_item.name_en : null} />
                </div>
              </div>
            </div>

            {(this.props.parent) ?
              <div className="form-group">
                <label className="label">{I18n.t("activerecord.attributes.menu_item.parent_id")}</label>
                <input type="hidden" name="menu_item[parent_id]" value={this.props.parent.id} />
                <p>{translate(this.props.parent, "name")}</p>
              </div> : null}

            <div className="form-group">
              <label className="label">{I18n.t("activerecord.attributes.menu_item.type")}</label>
              {(!this.props.menu_item) ?
              <div className="select" onChange={this.switchType}>
                <select name="type" className="form-control" defaultValue={this.state.type}>
                  {this.props.types.map(function(type, index) {
                    return <option value={type} key={"item_type_" + index}>{I18n.t("merchant.admin.menu_items.types."+ type)}</option>
                  })}
                </select>
              </div> : <p>{I18n.t("merchant.admin.menu_items.types."+ this.state.type)}</p>}
            </div>

            {(this.state.type == "category" || this.state.type == "product" || this.state.type == "url" || this.state.type == "custom_page") ?
              <div className="form-group">
                <label className="label">{I18n.t("activerecord.attributes.menu_item.value")}</label>
                <FormErrors errors={this.state.errors.value} />

                {(this.state.type == "category") ?
                  <div className="select">
                    <select className="form-control" name="menu_item[value]" defaultValue={(this.props.menu_item) ? this.props.menu_item.value : defaultCategory}>
                      {this.props.categories.map(function(category, index) {
                        return <option value={category[2]} key={"category_" + index}>{category[0]}</option>
                      })}
                    </select>
                  </div> : null}

                {(this.state.type == "product") ?
                  <AutoComplete
                    name="menu_item[value]"
                    url={Routes.search_merchant_products_path()}
                    chosenSource={(this.state.type == "product" && this.props.menu_item) ? Routes.merchant_product_path(this.props.menu_item.value) : null} /> : null}

                {(this.state.type == "custom_page") ?
                  <div className="select">
                    <select className="form-control" name="menu_item[value]" defaultValue={(this.props.menu_item) ? this.props.menu_item.value : defaultCategory}>
                      {this.props.pages.map(function(page, index) {
                        return <option value={page[2]} key={"page_" + index}>{page[0]}</option>
                      })}
                    </select>
                  </div> : null}

                {(this.state.type == "url") ?
                  <input type="text" name="menu_item[value]"
                    className="form-control" defaultValue={(this.props.menu_item) ? this.props.menu_item.value : null} /> : null}
              </div> : null}
          </div>

          <div className="form-group">
            <SubmitButtons goBack={false} />
          </div>
        </div>
      </form>
    )
  },
  submit: function(e) {
    e.preventDefault();
    var formData = $(this.refs.form).serialize();

    if (this.props.menu_item) {
      url = Routes.merchant_menu_menu_item_path(this.props.menu.id, this.props.menu_item.id);
      method = "PUT"
     }
    else {
      url = Routes.merchant_menu_menu_items_path(this.props.menu.id);
      method = "POST"
    }

    $.ajax({
      data: formData,
      url: url,
      method: method,
      dataType: "json",
      success: function(data) {
        if (this.props.menu_item) {
          this.props.updateMenuItem(this.props.menu_item, data);
        }
        else {
          this.props.addMenuItem(data);
        }
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
  switchType: function(e) {
    this.setState({type: e.target.value});
  }
})
