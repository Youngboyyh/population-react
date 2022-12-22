import { useState, useEffect } from "react"
// import './checkBox.css'
const CheckBox = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [options, setOptions] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([13])

  useEffect(() => {
    async function fetchData () {
      const response = await fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'CDmRptvssqaJNGutJw9ARyG8TujoA6q5o5LtwaFe',
        },
      })
      const result = await response.json()
      setOptions(result)
      setIsLoading(false)
    }
    fetchData()
  }, [])
  function handleChange (event, pref_name) {
    const option = Number(event.target.value)
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option))
    } else {
      setSelectedOptions([...selectedOptions, option])
    }
    props.getMsg(option, pref_name, Math.random())
  }
  if (isLoading) {
    return (
      <div><h1>Loading...</h1></div>
    )
  }

  return (
    <div className='checkBox'>
      {options.result.map((option) => (
        <label key={option.prefCode} >
          <span className="input_con">
            <input
              type="checkbox"
              value={option.prefCode}
              checked={selectedOptions.includes(option.prefCode)}
              onChange={(e) => handleChange(e, option.prefName)}
            />
            {option.prefName}
          </span>

        </label>
      ))}
    </div>
  )
}

export default CheckBox