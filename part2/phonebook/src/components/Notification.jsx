import errorBG from "./../assets/errorror.png"
import successBG from "./../assets/fulfifu.png"

const Notification = ({text, isError = false}) => {
    if (text == null) return null
    const errorStyle = {
        backgroundImage: `url(${errorBG})`,
        backgroundPosition: 'center',
        fontSize: '20px',
        borderColor: '#e87eb0',
        color: '#8a114a',
        padding: "10px",
        borderStyle: 'solid',
        borderRadius: '5px',
        marginBottom: '10px'
    }

    const successStyle = {
        backgroundImage: `url(${successBG})`,
        backgroundPosition: 'center',
        fontSize: '20px',
        borderColor: '#23ad2c',
        color: '#08400c',
        padding: "10px",
        borderStyle: 'solid',
        borderRadius: '5px',
        marginBottom: '10px'
    }
    return <div style={isError? errorStyle: successStyle}>{text}</div>
}

export default Notification