// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
// import { useState, useEffect } from 'react'


const PopulationGrowth = (props) => {
  let dataList = props.sendMsg[0]
  let isLoading = props.sendMsg[1]
  console.log(dataList, isLoading)

  if (isLoading) {
    return (
      <div><h1>Loading...</h1></div>
    )
  }
  const config = {
    chart: {
      type: "line",
    },
    title: {
      text: "都道府県別 総人口推移",
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      itemMarginTop: 20,
      itemStyle: {
        fontSize: "15px",
      },
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointInterval: 5,
        pointStart: 1960,
      },
    },
    yAxis: {
      labels: {
        formatter: function () {
          return this.value === 0 ? "" : this.value.toLocaleString() + "人"
        },
      },
      min: 0,
      gridLineColor: "transparent",
      tickWidth: 1,
      tickInterval: 500000,
      lineWidth: 1,
    },
    xAxis: {
      labels: {
        formatter: function () {
          return this.value + "年"
        },
      },
      tickInterval: 5,
    },
    series: dataList,
  }
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={config}></HighchartsReact>
    </>

  )
}

export default PopulationGrowth
