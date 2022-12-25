import React, { Component } from 'react'
import Highcharts from 'highcharts'

export default class chart extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate () {
    const chart = Highcharts.chart('graph', {
      title: {
        text: '都道府県総人数',
      },
      xAxis: {
        title: {
          text: '年度'
        },
      },
      yAxis: {
        title: {
          text: '総人数'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      plotOptions: {
        series: {
          animation: true,
          label: {
            connectorAllowed: false
          },
          pointStart: 1960,
          pointInterval: 5
        }
      },
      series: this.props.sendMsg,
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    })
  }
  render () {
    return (
      <div>
        <div id="graph"></div>
      </div>
    )
  }
}
