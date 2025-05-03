import { useState, useEffect } from 'react'
import { getAllNames, getCountry } from './services/countriesConnect'

const CountryInfo = ({country}) => {
  if (country) {
    const languages = Object.entries(country.languages).map(([key, value]) => {
      return <li key={country.area +"_"+key}> {value} </li>
    })
    return (
      <div>
        <h2> {country.name.common} </h2>
        <div>
          Capital: {country.capital}
          <br/>
          Area: {country.area}
        </div>
        <h3>Languages</h3>
        <div>
          <ul>
            {languages}
          </ul>
        </div>
        <img src={country.flags.png} alt={country.flag.alt}></img>
      </div>
    )
  }
}

const Notification = ({text}) => {
  if (text) {
    return <div>{text}</div>
  }
  else {
    return null
  }
}

const Country = ({name}) => {
  return <div>{name}</div>
}

const Countries = ({countries}) => {
  if (!countries) {
    return null
  }
  let elements = countries.map((elem) => {
    return <Country key={elem} name={elem}></Country>
  })
  return <div>{elements}</div>
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

  return (
    <div>
      <form onSubmit={submitHandler}> 
        find countries: 
        <input value={country} onChange={changeHandler}></input>
        <button type="submit"> Search </button>
      </form>
      <Notification text={notification}></Notification>
      <Countries countries={availables}></Countries>
      <CountryInfo country={shown}></CountryInfo>
    </div>
  )
}

export default App
