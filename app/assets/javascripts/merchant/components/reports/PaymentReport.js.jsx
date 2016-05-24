var PaymentReport = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  render: function() {
    return (
      <div className="reports block">
        <div className="chart">
          <a className="btn btn-sm btn-primary pull-right" href={Routes.payment_merchant_reports_path({"format": "csv", "locale": I18n.locale})}>
            {I18n.t("merchant.admin.buttons.export")}
          </a>
          <PieChart data={this.state.data} />
        </div>

        <div className="report-table table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>{I18n.t("activerecord.attributes.payment_method.id")}</th>
                <th>{I18n.t("activerecord.attributes.payment_method.name")}</th>
                <th>{I18n.t("activerecord.attributes.payment_method.total_sale")}</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(function(d, index) {
                return (
                  <tr key={"d_" + index}>
                    <td>{d.payment_method.id}</td>
                    <td>{d.payment_method.name}</td>
                    <td>{d.total_sale}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
})
