var Dashboard = React.createClass({
  renderOrders: function() {
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>{I18n.t("merchant.admin.orders.order_id")}</th>
              <th>{I18n.t("merchant.admin.orders.products")}</th>
              <th>{I18n.t("merchant.admin.orders.order_status")}</th>
              <th>{I18n.t("merchant.admin.orders.total")}</th>
            </tr>
          </thead>
          <tbody>
            {this.props.recent_orders.map(function(order, index) {
              return (
                <tr key={"order_" + index}>
                  <td>
                    <a href={Routes.edit_merchant_product_order_path.localize(order)}>
                      {"#" + order.id}
                    </a>
                  </td>
                  <td>{this.renderProducts(order.order_products)}</td>
                  <td><div className={"label " + this.getStatusKlass(order.status)}>#{order.status.toUpperCase()}</div></td>
                  <td>{I18n.toNumber(order.total, {precision: 0, delimiter: ","})}</td>
                </tr>
              )
            }.bind(this))}
          </tbody>
        </table>
      </div>
    )
  },
  renderProducts: function(orderProducts) {
    return (
      <span>
        {orderProducts.map(function(orderProduct, index) {
          return (
            <a key={"order_product_" + index} href={Routes.edit_merchant_product_path.localize(orderProduct.variation.product_slug)}>
              <img src={orderProduct.variation.image.image.thumb.url} width="20" height="20" />
            </a>
          )
        })}
      </span>
    )
  },
  getPaymentStateKlass: function(state) {
    switch(state) {
      case "pending":
        paymentStatusKlass = "label-default";
        break;
      case "paid":
        paymentStatusKlass = "label-success";
        break;
      case "refunded":
        paymentStatusKlass = "label-danger";
        break;
      default:
        break;
    }
  },
  getStatusKlass: function(status) {
    switch(status) {
      case "incompleted":
        statusKlass = "label-default";
        break;
      case "pending":
        statusKlass = "label-warning";
        break;
      case "processing":
        statusKlass = "label-success";
        break;
      case "processed":
        statusKlass = "label-success";
        break;
      case "shipping":
        statusKlass = "label-info";
        break;
      case "shipped":
        statusKlass = "label-primary";
        break;
      case "returned":
        statusKlass = "label-danger";
        break;
      case "cancelled":
        statusKlass = "label-danger";
        break;
      default:
        break;
    }

    return statusKlass;
  },
  renderRevenueNumber: function() {
    return (
      <div className="block">
        <h3 className="text-center">
          {I18n.t("merchant.admin.dashboard.today_revenue")}
        </h3>

        <div className="highlight-number">{I18n.toNumber(this.props.today_revenue, {precision: 0, delimiter: ","})}</div>
        <div className="row">
          <div className="col-xs-6 text-center">
            <h4>
              {I18n.t("merchant.admin.dashboard.last_7_days")}
            </h4>
            <p>{I18n.toCurrency(this.props.last_7_days_revenue, {precision: 0, delimiter: ",", unit: "₩"})}</p>
          </div>
          <div className="col-xs-6 text-center">
            <h4>
              {I18n.t("merchant.admin.dashboard.last_30_days")}
            </h4>
            <p>{I18n.toCurrency(this.props.last_30_days_revenue, {precision: 0, delimiter: ",", unit: "₩"})}</p>
          </div>
        </div>
      </div>
    )
  },
  renderStatistics: function() {
    var data = [
      ["icon-success", <i className="fa fa-3x fa-won"></i>, I18n.t("merchant.admin.dashboard.total_revenue"), this.props.total_revenue, "javascript:void(0)"],
      ["icon-primary", <i className="fa fa-3x fa-cart-plus"></i>, I18n.t("merchant.admin.dashboard.today_sales"), this.props.today_sales, Routes.merchant_product_orders_path.localize()],
      ["icon-success", <i className="fa fa-3x fa-tag"></i>, I18n.t("merchant.admin.dashboard.total_products"), this.props.total_products, Routes.merchant_products_path.localize()],
      ["icon-primary", <i className="fa fa-3x fa-user"></i>, I18n.t("merchant.admin.dashboard.total_customers"), this.props.total_customers, Routes.merchant_customers_path.localize()]
    ]
    return (
      <div className="row">
        {data.map(function(d, index) {
          return (
            <div className="col-sm-3" key={"statistics_" + index}>
              <div className="block">
                <div className="row">
                  <div className="col-xs-6">
                    <div className={"icon " + d[0]}>
                      {d[1]}
                    </div>
                  </div>
                  <div className="col-xs-6">
                    <a href={d[4]}>
                      <h3>{I18n.toNumber(d[3], {precision: 0, delimiter: ","})}</h3>
                    </a>
                    <p>{d[2]}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  },
  render: function() {
    return (
      <div className="dashboard">
        {this.renderStatistics()}
        <div className="block">
          <LineChart data={this.props.weeky_chart_data} dataSetLabel={I18n.t("merchant.admin.reports.order.data_title")} height="200" />
        </div>
        <div className="row">
          <div className="col-sm-4">
            {this.renderRevenueNumber()}
          </div>
          <div className="col-sm-8">
            <div className="block">
              <a href={Routes.merchant_product_orders_path.localize()} className="btn btn-sm btn-danger pull-right">
                {I18n.t("merchant.admin.buttons.view_all")}
              </a>
              <h3>{I18n.t("merchant.admin.dashboard.recent_orders")}</h3>
              {this.renderOrders()}
            </div>
          </div>
        </div>
      </div>
    )
  }
})
