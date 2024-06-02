import React from 'react';
import Chart from 'chart.js/auto';
import { translate } from '../../../functions';

export default class BarChart extends React.Component {
  componentDidMount() {
    this.draw();
  }

  draw() {
    var ctx = $(this.refs.chart);
    var dataSetLabel = this.props.dataSetLabel;
    var labels = [];
    var data = [];

    this.props.data.forEach(function(d) {
      labels.push(translate(d.product, "name"));
      data.push(d.total_sale);
    })

    var barChart = new Chart(ctx, {
      type: "bar",
      data: {
          labels: labels,
          datasets: [{
              label: dataSetLabel,
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
      }
    );
  }

  render() {
    return (
      <div className="chart-container">
        <canvas ref="chart" id="barChart" width="400" height="150"></canvas>
      </div>
    )
  }
}
