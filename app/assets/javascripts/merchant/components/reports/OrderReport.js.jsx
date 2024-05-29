export default class OrderReport extends React.Component {
  getInitialState() {
    return {
      data: this.props.data,
      reportType: "daily",
    }
  },
  render() {
    var reportTypes = ["hourly", "daily", "weekly", "monthly", "yearly"]

    return (
      <div className="reports block">
        {reportTypes.map(function(type, index) {
          return <button key={"type_" + index} onClick={this.updateData.bind(this, type)}>{I18n.t("merchant.admin.reports.order.time." + type)}</button>
        }.bind(this))}

        <div className="chart">
          <a className="btn btn-sm btn-primary pull-right" href={Routes.order_merchant_reports_path({"format": "csv", "report_type": this.state.reportType, "locale": I18n.locale})}>
            {I18n.t("merchant.admin.buttons.export")}
          </a>
          <LineChart data={this.state.data} dataSetLabel={I18n.t("merchant.admin.reports.order.data_title")} />
        </div>
      </div>
    )
  },
  updateData(reportType) {
    var url = this.props.url;

    $.get(url, {report_type: reportType}, function(data) {
      this.setState({data: data, reportType: reportType});
    }.bind(this))
  }
}
