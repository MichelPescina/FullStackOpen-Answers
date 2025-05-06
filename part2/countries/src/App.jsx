import { useState, useEffect } from 'react'
import { getAllNames, getCountry } from './services/countriesConnect'
import CountryInfo from './components/CountryInfo'
import Countries from './components/Countries'
import Notification from './components/Notification'

const SearchBox = ({text, changeHandler, submitHandler}) => {
  return (
    <form onSubmit={submitHandler}> 
      find countries: 
      <input value={text} onChange={changeHandler}></input>
      <button type="submit"> Search </button>
    </form>
  )
}

const App = () => {
  const [country, setCountry] = useState("")
  const [countries, setCountries] = useState(null)
  const [availables, setAvailables] = useState(null)
  const [notification, setNotification] = useState(null)
  const [shown, setShown] = useState(null)

  useEffect(() => {
    getAllNames()
      .then((names) => {
        setCountries(names)
      })
  }, [])

  const showNotif = (text) => {
    setNotification(text)
    setTimeout(() => setNotification(null), 5000)
  }

  const changeHandler = (event) => {
    setCountry(event.target.value)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    const query = country.toLowerCase()
    const result = countries.filter(
      (entry) => entry.toLowerCase().includes(query)
    )
    if (result.length == 1) {
      getCountry(result[0])
        .then((data) => setShown(data))
        .catch((error) => {
          showNotif("An error ocurred while retrieving the information from the server")
          console.log(error.message)
        })
    }
    else if (result.length <= 10) {
      setAvailables(result)
      showNotif(null)
    }
    else if (result.length > 10){
      showNotif("Too many matches, specify another filter")
      setAvailables(null)
    }
    setShown(null)
  }

  const buttonHandler = (name) => {
    getCountry(name)
      .then((data) => setShown(data))
      .catch((error) => {
        showNotif("An error ocurred while retrieving the information from the server")
        console.log(error.message)
      })
  }

  return (
    <div>
      <SearchBox
        text={country}
        changeHandler={changeHandler} 
        submitHandler={submitHandler}
      ></SearchBox>
      <Notification text={notification}></Notification>
      <Countries countries={availables} buttonHandler={buttonHandler}></Countries>
      <CountryInfo country={shown}></CountryInfo>
    </div>
  )
}

export default App
