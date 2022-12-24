import './App.css'
import { useState, useEffect } from 'react'
import CheckBox from './components/CheckBox'
import PopulationGrowth from './components/Charts'

function App () {
  const [prefCode, setPrefCode] = useState(13)
  const [prefName, setPrefName] = useState("東京都")
  const [random, setRandom] = useState(null)
  const [dataList, setDataList] = useState([])
  const [prefList, setPrefList] = useState([13])
  const [isLoading, setIsLoading] = useState(true)


  const getMsg = (msg1, msg2, msg3) => {
    if (msg1 !== null) {
      if (prefList.includes(msg1)) {
        const newList = prefList.filter(item => item !== msg1)
        const newDataList = dataList.filter(item => item.name !== msg2)
        console.log("NEWdatalist", newDataList)
        setPrefList([...newList])
        setDataList([...newDataList])
      } else {
        const newList = [...prefList, msg1]
        setPrefCode(msg1)
        setPrefList([...newList])
        setRandom(msg3)
        setPrefName(msg2)
      }
    }
  }
  //
  const ischecked = (result) => {
    var data_copy = []
    var tem_obj = {}
    result.forEach((item) => {
      data_copy.push(item.value)
    })
    tem_obj = { name: prefName, data: data_copy }
    setDataList([...dataList, tem_obj])
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
  }, [prefCode, random, prefName])
  //
  console.log(dataList)
  return (
    <div className="App">
      <h2>都道府県別の総人口推移グラフ</h2>
      <CheckBox getMsg={getMsg} />
      <PopulationGrowth sendMsg={[dataList, isLoading]} />
    </div>

  )
}
export default App
