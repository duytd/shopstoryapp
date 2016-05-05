var ProductReport = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  render: function() {
    return (
      <div className="reports block">
        <div className="chart">
          <BarChart data={this.state.data} dataSetLabel={I18n.t("merchant.admin.reports.product.data_title")} />
        </div>

        <div className="report-table table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>{I18n.t("activerecord.attributes.product.id")}</th>
                <th>{I18n.t("activerecord.attributes.product.name")}</th>
                <th>{I18n.t("activerecord.attributes.product.total_sale")}</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(function(d, index) {
                return (
                  <tr key={"d_" + index}>
                    <td>{d.product.id}</td>
                    <td>{translate(d.product, "name")}</td>
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
