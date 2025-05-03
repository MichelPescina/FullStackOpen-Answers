const Notification = ({ text }) => {
    if (text) {
        return <div>{text}</div>
    }
    else {
        return null
    }
}

export default Notification