import axios from "axios"
const url = "/api/persons"

const getAll = () => {
    return axios.get(url).then(response => response.data)
}

const create = (person) => {
    return axios.post(url, person).then(response => response.data)
}

const update = (person) => {
    return axios.put(`${url}/${person.id}`, person)
}

const eliminate = (id) => {
    return axios.delete(`${url}/${id}`)
}

export default {getAll, create, update, eliminate}