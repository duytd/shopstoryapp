var OrderReport = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data,
      reportType: "daily",
    }
  },
  render: function() {
    return (
      <div className="reports block">
        <div className="chart">
          <a className="btn btn-sm btn-primary pull-right" href={Routes.order_merchant_reports_path({"format": "csv", "report_type": this.state.reportType, "locale": I18n.locale})}>
            {I18n.t("merchant.admin.buttons.export")}
          </a>
          <LineChart data={this.state.data} dataSetLabel={I18n.t("merchant.admin.reports.order.data_title")} updateData={this.updateData} />
        </div>
      </div>
    )
  },
  updateData: function(reportType) {
    var url = this.props.url;

    $.get(url, {report_type: reportType}, function(data) {
      this.setState({data: data, reportType: reportType});
    }.bind(this))
  }
})
