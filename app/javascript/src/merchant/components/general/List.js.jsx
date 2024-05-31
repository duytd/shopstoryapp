export default class List extends React.Component {
  componentWillReceiveProps(nextProps) {
    var items = nextProps.items.map(function(item) {

      item.checked = false;
      return item;
    })

    this.setState({items: items, checkCount: 0, isSelectAll: false});
  },
  getInitialState() {
    var sorting = this.props.sorting;
    var sortBy = (sorting != null) ? sorting.sorted_by : null;
    var sortDirection = (sorting != null) ? sorting.sort_direction : null;
    var items = this.props.items.map(function(item) {

      item.checked = false;
      return item;
    })
    return {items: items, checkCount: 0, isSelectAll: false, sortBy: sortBy, sortDirection: sortDirection};
  },
  render() {
    var itemNodes = this.state.items.map(function(item) {
      switch(this.props.type) {
        case "category":
          itemChildren = (
            <Category
              category={item}
              key={"item_" + item.id}
              deleteUrl={Routes.merchant_category_path.localize(item.id)}
              handleSelect={this.handleSelect}
              handleDeleteItem={this.deleteItem} check={item.checked} />
          );
          break;
        case "product":
          itemChildren = (
            <Product
              product={item}
              key={"item_" + item.id}
              deleteUrl={Routes.merchant_product_path.localize(item.id)}
              handleSelect={this.handleSelect}
              handleDeleteItem={this.deleteItem} check={item.checked} />
          );
          break;
        case "order":
          itemChildren = (
            <Order
              order={item}
              key={"item_" + item.id}
              deleteUrl={Routes.merchant_product_order_path.localize(item.id)}
              handleSelect={this.handleSelect}
              handleDeleteItem={this.deleteItem} check={item.checked} />
          );
          break;
        case "custom_page":
          itemChildren = (
            <CustomPage
              custom_page={item}
              key={"item_" + item.id}
              deleteUrl={Routes.merchant_custom_page_path.localize(item.slug)}
              handleSelect={this.handleSelect}
              handleDeleteItem={this.deleteItem} check={item.checked} />
          );
          break;
        case "customer":
          itemChildren = (
            <Customer
              customer={item}
              key={"item_" + item.id}
              deleteUrl={Routes.merchant_customer_path.localize(item.id)}
              handleSelect={this.handleSelect}
              handleDeleteItem={this.deleteItem} check={item.checked} />
          );
          break;
        case "shipping_rate":
          itemChildren = (
            <ShippingRate
              shipping_rate={item}
              key={"item_" + item.id}
              deleteUrl={Routes.merchant_shipping_rate_path.localize(item.id)}
              handleSelect={this.handleSelect}
              handleDeleteItem={this.deleteItem} check={item.checked} />
          );
          break;
        case "banner":
          itemChildren = (
            <Banner
              banner={item}
              key={"item_" + item.id}
              deleteUrl={Routes.merchant_banner_path.localize(item.id)}
              handleSelect={this.handleSelect}
              handleDeleteItem={this.deleteItem} check={item.checked} />
          );
          break;
        case "discount":
          itemChildren = (
            <Discount
              discount={item}
              key={"item_" + item.id}
              deleteUrl={Routes.merchant_banner_path.localize(item.id)}
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
        <BulkAction
          checkCount={this.state.checkCount}
          exportable={this.props.exportable}
          exportHandler={this.handleExport}
          deleteAllHandler={this.handleDeleteAll} />
        <div className="table-responsive">
          <table className="table item-list">
            <thead>
              <tr>
                <th>
                  <SelectAllCb isSelectAll={this.state.isSelectAll} selectAllHandler={this.handleSelectAll}
                    isDisabled={this.state.items.length == 0} />
                </th>
                {this.renderHeaders()}
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
  renderHeaders() {
    return this.props.headers.map(function(h, index){
      if (this.props.sortable && this.props.sortableColumns) {
        var column = this.getSortableColumn(index);

        if (column != null) {
          return (
            <th key={"h_" + index} className="sortable" onClick={this.sort.bind(this, index)}>
              {h}
              {(column.name == this.state.sortBy) ?
                <span>
                  {(this.state.sortDirection == "desc") ? <i className="fa fa-caret-down"></i> : <i className="fa fa-caret-up"></i>}
                </span> : null}
            </th>
          )
        }
        else {
          return <th key={"h_" + index}>{h}</th>
        }
      }
      else {
        return <th key={"h_" + index}>{h}</th>
      }
    }.bind(this))
  },
  getSortableColumn(index) {
    var result = null;

    this.props.sortableColumns.forEach(function(column) {
      if (column.index == index) {
        result = column;
        return;
      }
    })

    return result;
  },
  sort(index) {
    var url = Routes.merchant_products_path();
    var sortBy = this.getSortableColumn(index).name;
    var sortDirection = "asc";

    if (this.state.sortDirection != null) {
      sortDirection = (this.state.sortDirection == "asc") ? "desc" : "asc";
    }

    this.setState({sortBy: sortBy, sortDirection: sortDirection}, function() {
      $.getJSON(url, {sorted_by: sortBy, sort_direction: sortDirection}, function(data) {
        var newUrl = url.addParams("sorted_by", sortBy).addParams("sort_direction", sortDirection);
        this.props.updateData(data, newUrl);
      }.bind(this))

    }.bind(this))
  },
  deleteItem(item) {
    var items = this.state.items;
    var index = items.indexOf(item);

    items.splice(index, 1);

    if (item.checked == true) {
      this.state.checkCount --;
    }

    if (typeof this.props.redirectUrl !== "undefined") {
      if (this.state.items.length == 0 && this.props.page > 1) {
        window.location = this.props.redirectUrl.addParams("page", this.props.page - 1);
      }
      else {
        window.location = this.props.redirectUrl.addParams("page", this.props.page);
      }
    }
    else {
      this.replaceState({items: items, checkCount: this.state.checkCount});
    }
  },
  deleteAllItem(item_ids) {
    var items = this.state.items;

    items = items.filter(function(item) {
      return (item_ids.indexOf(item.id) == -1)
    });

    if (typeof this.props.redirectUrl !== "undefined") {
      if (this.props.totalPage > 1) {
        window.location = this.props.redirectUrl.addParams("page", this.props.page - 1);
      }
      else {
        window.location = this.props.redirectUrl;
      }
    }
    else {
      this.replaceState({items: items, checkCount: 0, isSelectAll: false});
    }
  },
  handleExport(e) {
    e.preventDefault();

    var item_ids = [];
    this.state.items.forEach(function(item) {
      if (item.checked == true) {
        item_ids.push(item.id);
      }
    })

    this.props.handleExport(item_ids);
  },
  handleDeleteAll(e) {
    e.preventDefault();

    var item_ids = [];
    this.state.items.forEach(function(item) {
      if (item.checked == true) {
        item_ids.push(item.id);
      }
    })

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
      case "banner":
        data = {banner_ids: item_ids};
        break;
      case "discount":
        data = {discount_ids: item_ids};
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
  handleSelectAll(checked) {
    var items = this.state.items.map(function(item) {

      item.checked = checked;
      return item;
    });
    var checkCount = (checked) ? items.length : 0;

    this.replaceState({items: items, checkCount: checkCount, isSelectAll: checked});
  },
  handleSelect(item, checked) {
    var items = this.state.items;
    var index = items.indexOf(item);
    var currentChecked = items[index].checked;
    var checkCount = (checked && !currentChecked) ? this.state.checkCount + 1 : this.state.checkCount - 1;
    var isSelectAll = (checkCount < items.length) ? false : true;

    items[index].checked = checked;
    this.replaceState({items: items, checkCount: checkCount, isSelectAll: isSelectAll});
  }
}
