var BarChart = React.createClass({
  componentDidMount: function() {
    var ctx = $(this.refs.chart);
    var labels = [];
    var data = [];

    this.props.data.forEach(function(d) {
      labels.push(translate(d.product, "name"));
      data.push(d.total_sale);
    })

    var myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: labels,
        datasets: [{
            label: I18n.t("merchant.admin.reports.product.data_title"),
            data: data,
            backgroundColor: "rgba(46, 204, 113, 0.9)",
            borderColor: "rgba(46, 204, 113, 1.0)",
            hoverBackgroundColor: "rgba(39, 174, 96, 0.9)",
            hoverBorderColor: "rgba(39, 174, 96, 1.0)",
            borderWidth: 2,
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
      }
    });
  },
  render: function() {
    return (
      <div className="chart-container">
        <canvas ref="chart" id="barChart" width="400" height="200"></canvas>
      </div>
    )
  }
})
