import axios from "axios";

const url = "https://studies.cs.helsinki.fi/restcountries/api/"

const getAllNames = () => {
    return axios.get(url + "/all")
        .then((response) => {
            let names = []
            response.data.forEach(element => {
                names.push(element.name.common)
                //names.push(element.name.official)
            })
            return names.sort()
        })
}

const getCountry = (name) => {
    return axios.get(url + `/name/${name}`)
        .then(response => response.data)
}

export {getAllNames, getCountry}