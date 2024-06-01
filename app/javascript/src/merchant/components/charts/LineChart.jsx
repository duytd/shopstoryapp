import React from 'react';
import Chart from 'chart.js/auto';

export default class LineChart extends React.Component {
  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
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
            pointHoverRadius: 5,
            lineTension: 0,
          }]
      },
      options: {
        xAxes: [{
            display: false
        }]
      }
    });
  }

  render() {
    return (
      <div className="chart-container">
        <canvas ref="chart" id="lineChart" width={(this.props.width) ? this.props.width : "400"} height={(this.props.height) ? this.props.height : "200"}></canvas>
      </div>
    )
  }
}
