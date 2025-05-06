import { useState, useEffect } from "react"
import { getWeather } from "../services/weather"

const Weather = ({info}) => {
    if (info && info != undefined) {
        const city = info.weather[0].name
        const temp = info.main.temp - 273.15
        const wind = info.wind.speed
        const icon = info.weather[0].icon
        const desc = info.weather[0].description
        const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`
        return (
            <div>
                <h3>Weather in {city}</h3>
                <p>
                    Temperature: {temp} Celsius <br/>
                    <img src={iconURL} alt={desc}></img> <br/>
                    Wind: {wind} m/s
                </p>
            </div>
        )
    }
}

const CountryInfo = ({ country }) => {
    const [weatherInfo, setWeatherInfo] = useState(null)

    useEffect(() => {
        if(country) {
            const weather = getWeather(country.capital[0])
            .then((data) => {
                if (data.cod == "200") {
                    setWeatherInfo(data.list[0])
                }
            })
            .catch((error) => console.log(error))
        }
    }, [country])

    if (country) {
        const languages = Object.entries(country.languages).map(([key, value]) => {
            return <li key={country.area + "_" + key}> {value} </li>
        })
        return (
            <div>
                <h2> {country.name.common} </h2>
                <div>
                    Capital: {country.capital}
                    <br />
                    Area: {country.area}
                </div>
                <h3>Languages</h3>
                <div>
                    <ul>
                        {languages}
                    </ul>
                </div>
                <img src={country.flags.png} alt={country.flag.alt}></img>
                <Weather info={weatherInfo}></Weather>
            </div>
        )
    }
}

export default CountryInfo