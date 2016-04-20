var List = React.createClass({
  getInitialState: function() {
    var items = this.props.items.map(function(item) {

      item.checked = false;
      return item;
    })
    return {items: items, checkCount: 0, isSelectAll: false};
  },
  render: function () {
    var itemNodes = this.state.items.map(function(item) {
      switch(this.props.type) {
        case "category":
          itemChildren = (
            <Category
              category={item}
              key={"item_" + item.id}
              deleteUrl={Routes.merchant_category_path(item.id)}
              handleSelect={this.handleSelect}
              handleDeleteItem={this.deleteItem} check={item.checked} />
          );
          break;
        case "product":
          itemChildren = (
            <Product
              product={item}
              key={"item_" + item.id}
              deleteUrl={Routes.merchant_product_path(item.id)}
              handleSelect={this.handleSelect}
              handleDeleteItem={this.deleteItem} check={item.checked} />
          );
          break;
        case "order":
          itemChildren = (
            <Order
              order={item}
              key={"item_" + item.id}
              deleteUrl={Routes.merchant_order_path(item.id)}
              handleSelect={this.handleSelect}
              handleDeleteItem={this.deleteItem} check={item.checked} />
          );
          break;
        case "custom_page":
          itemChildren = (
            <CustomPage
              custom_page={item}
              key={"item_" + item.id}
              deleteUrl={Routes.merchant_custom_page_path(item.slug)}
              handleSelect={this.handleSelect}
              handleDeleteItem={this.deleteItem} check={item.checked} />
          );
          break;
        case "customer":
          itemChildren = (
            <Customer
              customer={item}
              key={"item_" + item.id}
              deleteUrl={Routes.merchant_customer_path(item.id)}
              handleSelect={this.handleSelect}
              handleDeleteItem={this.deleteItem} check={item.checked} />
          );
          break;
        case "shipping_rate":
          itemChildren = (
            <ShippingRate
              shipping_rate={item}
              key={"item_" + item.id}
              deleteUrl={Routes.merchant_shipping_rate_path(item.id)}
              handleSelect={this.handleSelect}
              handleDeleteItem={this.deleteItem} check={item.checked} />
          );
          break;
        default:
          itemChildren = null;
          break;
      }

      return itemChildren;
    }.bind(this));

    return (
      <div className="item-list">
        <BulkAction checkCount={this.state.checkCount} deleteAllHandler={this.handleDeleteAll} />
        <div className="table-responsive">
          <table className="table item-list">
            <thead>
              <tr>
                <th>
                  <SelectAllCb isSelectAll={this.state.isSelectAll} selectAllHandler={this.handleSelectAll}
                    isDisabled={this.state.items.length == 0} />
                </th>
                {this.props.headers.map(function(h, index){ return <th key={"h_" + index}>{h}</th>})}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemNodes}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
  deleteItem: function(item) {
    var items = this.state.items;
    var index = items.indexOf(item);

    items.splice(index, 1);

    if (item.checked == true) {
      this.state.checkCount --;
    }

    if (typeof this.props.redirectUrl !== "undefined") {
      if (this.state.items.length == 0 && this.props.page > 1) {
        Turbolinks.visit(this.props.redirectUrl.addParams("page", this.props.page - 1))
      }
      else {
        Turbolinks.visit(this.props.redirectUrl.addParams("page", this.props.page));
      }
    }
    else {
      this.replaceState({items: items, checkCount: this.state.checkCount});
    }
  },
  deleteAllItem: function(item_ids) {
    var items = this.state.items;

    items = items.filter(function(item) {
      return (item_ids.indexOf(item.id) == -1)
    });

    if (typeof this.props.redirectUrl !== "undefined") {
      if (this.props.totalPage > 1) {
        Turbolinks.visit(this.props.redirectUrl.addParams("page", this.props.page - 1));
      }
      else {
        Turbolinks.visit(this.props.redirectUrl);
      }
    }
    else {
      this.replaceState({items: items, checkCount: 0, isSelectAll: false});
    }
  },
  handleDeleteAll: function(e) {
    e.preventDefault();

    var item_ids = this.state.items.map(function(item) {
      if (item.checked == true) {
        return item.id;
      }
    });

    switch(this.props.type) {
      case "category":
        data = {category_ids: item_ids};
        break;
      case "product":
        data = {product_ids: item_ids};
        break;
      case "order":
        data = {order_ids: item_ids};
        break;
      case "custom_page":
        data = {custom_page_ids: item_ids};
        break;
      case "customer":
        data = {customer_ids: item_ids};
        break;
      case "shipping_rate":
        data = {shipping_rate_ids: item_ids};
        break;
      default:
        data = {};
        break;
    }

    $.ajax({
      url: this.props.deleteAllUrl,
      method: "DELETE",
      data: data,
      dataType: "json",
      success: function(data) {
        this.deleteAllItem(item_ids);
      }.bind(this)
    });
  },
  handleSelectAll: function(checked) {
    var items = this.state.items.map(function(item) {

      item.checked = checked;
      return item;
    });
    var checkCount = (checked) ? items.length : 0;

    this.replaceState({items: items, checkCount: checkCount, isSelectAll: checked});
  },
  handleSelect: function(item, checked) {
    var items = this.state.items;
    var index = items.indexOf(item);
    var currentChecked = items[index].checked;
    var checkCount = (checked && !currentChecked) ? this.state.checkCount + 1 : this.state.checkCount - 1;
    var isSelectAll = (checkCount < items.length) ? false : true;

    items[index].checked = checked;
    this.replaceState({items: items, checkCount: checkCount, isSelectAll: isSelectAll});
  }
})
