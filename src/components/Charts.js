// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useState, useEffect } from 'react'

const PopulationGrowth = (props) => {
  var msg1 = props.sendMsg[0]
  var msg2 = props.sendMsg[1] || "東京都"
  var msg3 = props.sendMsg[2]
  // const [dataP, setDataP] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [prefList, setPrefList] = useState([13])
  const [prefCode, setPrefCode] = useState(13)
  const [dataList, setDataList] = useState([])
  const [prefN, setPrefN] = useState(null)
  useEffect(() => {
    if (msg1 !== null) {
      if (prefList.includes(msg1)) {
        const newList = prefList.filter(item => item != msg1)
        const newDataList = dataList.filter(item => item.name != msg2)
        setPrefList([...newList])
        setDataList([...newDataList])
        // setPrefList([...prefList.filter(item => item != msg1)])
      } else {
        const newList = [...prefList, msg1]
        setPrefCode(msg1)
        setPrefList([...newList])
        setPrefN(msg3)
      }
    }
  }, [msg3])
  const ischecked = (result) => {
    var data_copy = []
    var tem_obj = {}
    result.forEach((item, index) => {
      data_copy.push(item.value)
    })
    tem_obj = { name: msg2, data: data_copy }
    setDataList([...[...dataList, tem_obj]])
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'CDmRptvssqaJNGutJw9ARyG8TujoA6q5o5LtwaFe',
        },
      })
      const result = await response.json()
      // setDataP(result.result.data[0].data)
      ischecked(result.result.data[0].data)
      setIsLoading(false)
    }
    fetchData()
  }, [prefCode, prefN])
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
    series: dataList
  }
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={config}></HighchartsReact>
    </>

  )
}

export default PopulationGrowth
