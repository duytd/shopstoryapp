var LineChart = React.createClass({
  componentDidMount: function() {
    var ctx = $(this.refs.chart);
    var labels = [];
    var data = [];
    var dataSetLabel = this.props.dataSetLabel;

    this.props.data.forEach(function(d) {
      labels.push(translate(d.time);
      data.push(d.revenue);
    })

    var myChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: labels,
        datasets: [{
            label: dataSetLabel,
            data: data,
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
    return (
      <div className="chart-container">
        <canvas ref="chart" id="lineChart" width="400" height="200"></canvas>
      </div>
    )
  }
})
