import axios from "axios"

const api_key = import.meta.env.VITE_WEATHER_KEY

const getWeather = (city) => {
    return new Promise((resolve, reject) => {
        if (api_key != undefined) {
            axios.get(
                "https://api.openweathermap.org/data/2.5/find",
                {
                    params: {
                        q: city,
                        appid: api_key
                    }
                }
            ).then((response) => resolve(response.data))
        }
        else {
            reject("The API Key for OpenWeatherMap is not defined as an ENV variable.")
        }
    })
}

export {getWeather}