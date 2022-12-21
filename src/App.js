import './App.css'
import { useState } from 'react'
import CheckBox from './components/CheckBox'
import PopulationGrowth from './components/Charts'

function App () {
  const [prefCode, setPreCode] = useState(null)
  const [prefName, setPrefName] = useState(null)
  const getMsg = (msg1, msg2) => {
    if (msg1 != null) {
      setPreCode(msg1)
      setPrefName(msg2)
    }
  }

  return (
    <div className="App">
      <h1>Title</h1>
      <CheckBox getMsg={getMsg} />
      <PopulationGrowth sendMsg={[prefCode, prefName]} />
    </div>

  )
}
export default App
