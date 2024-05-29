export default class PieChart extends React.Component {
  componentDidMount() {
    this.draw();
  },
  draw() {
    var ctx = $(this.refs.chart);
    var dataSetLabel = this.props.dataSetLabel;
    var labels = [];
    var data = [];

    this.props.data.forEach(function(d) {
      labels.push(d.payment_method.name);
      data.push(d.percentage);
    })

    var pieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ["#3498db", "#2ecc71", "#e74c3c", "#f1c40f", "#34495e"]
        }]
      },
    });
  },
  render() {
    return (
      <div className="chart-container">
        <canvas ref="chart" id="pieChart" width="400" height="150"></canvas>
      </div>
    )
  }
}
