const factoryUpdate = (setState) => {
    return (event) => setState(event.target.value)
}

export {factoryUpdate}