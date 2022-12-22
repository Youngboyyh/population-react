import './App.css'
import { useState } from 'react'
import CheckBox from './components/CheckBox'
import PopulationGrowth from './components/Charts'

function App () {
  const [prefCode, setPreCode] = useState(null)
  const [prefName, setPrefName] = useState(null)
  const [random, setRandom] = useState(null)
  const getMsg = (msg1, msg2, msg3) => {
    if (msg1 != null) {
      setPreCode(msg1)
      setPrefName(msg2)
      setRandom(msg3)
    }
  }

  return (
    <div className="App">
      <h1>都道府県別の総人口推移グラフ</h1>
      <CheckBox getMsg={getMsg} />
      <PopulationGrowth sendMsg={[prefCode, prefName, random]} />
    </div>

  )
}
export default App
