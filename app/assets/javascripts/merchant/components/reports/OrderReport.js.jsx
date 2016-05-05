var OrderReport = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  render: function() {
    return (
      <div className="reports block">
        <div className="chart">
          <LineChart data={this.state.data} dataSetLabel={I18n.t("merchant.admin.reports.order.data_title")} updateData={this.updateData} />
        </div>
      </div>
    )
  },
  updateData: function(reportType) {
    var url = this.props.url;

    $.get(url, {report_type: reportType}, function(data) {
      this.setState({data: data});
    }.bind(this))
  }
})
