import { useAuth } from "../../context/authContext"
import Cookies from 'js-cookie'

const Logout = () => {
    const {/* isAutenticated, */logout}= useAuth()

    const outUser = ()=>{
        Cookies.remove('token')
        logout()
    }

    return (
        <>
        <button onClick={outUser} style={{ width: '6rem', height: '3rem' }}>Logout</button>
        </>
    )
}

export default Logout