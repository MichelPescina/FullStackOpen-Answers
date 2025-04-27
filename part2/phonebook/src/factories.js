const factoryUpdate = (setState) => {
    return (event) => setState(event.target.value)
}

const basicError = (message) => {
    return (error) => {
        console.log(error)
        alert(message)
    } 
}

export {factoryUpdate, basicError}