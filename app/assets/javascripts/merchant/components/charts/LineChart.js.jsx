var LineChart = React.createClass({
  componentDidMount: function() {
    this.draw();
  },
  componentDidUpdate: function() {
    this.draw();
  },
  draw: function() {
    var ctx = $(this.refs.chart);
    var labels = [];
    var data = [];
    var dataSetLabel = this.props.dataSetLabel;

    this.props.data.forEach(function(d) {
      labels.push(d.time);
      data.push(d.revenue);
    })

    var myChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: labels,
        datasets: [{
            label: dataSetLabel,
            data: data,
            backgroundColor: "transparent",
            borderColor: "rgba(46, 204, 113, 1.0)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(46, 204, 113, 0.9)",
            pointBorderColor: "rgba(46, 204, 113, 1.0)",
            pointHoverBackgroundColor: "rgba(39, 174, 96, 0.9)",
            pointHoverBorderColor: "rgba(39, 174, 96, 1.0)",
            pointBorderWidth: 1,
            pointHoverRadius: 5
        }]
    },
    options: {
        xAxes: [{
            display: false
        }]
      }
    });
  },
  render: function() {
    var reportTypes = ["hourly", "daily", "weekly", "monthly", "yearly"]

    return (
      <div className="chart-container">
        {reportTypes.map(function(type, index) {
          return <button key={"type_" + index} onClick={this.updateData.bind(this, type)}>{I18n.t("merchant.admin.reports.order.time." + type)}</button>
        }.bind(this))}
        <canvas ref="chart" id="lineChart" width="400" height="200"></canvas>
      </div>
    )
  },
  updateData: function(type) {
    this.props.updateData(type);
  }
})