import style from './Login.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'

const Login = () => {
     /* const [email, setEmail] = useState('') */
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
   /*  const { credentials, setCredentials, logueoSubmit } = useAuth(); */
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const {login}= useAuth()


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const data = await axios.post('https://back-de-bloc.onrender.com/api/Login', {
                email,
                password
            },{ withCredentials: true })
            login()
            console.log(data)
            setMensaje(data.data.mensaje);
            navigate('/profile', { replace: true });
        } catch (error) {
            console.error(error.response);
            setMensaje(error.response.data.mensaje)

        }
        /* setCredentials({ email: '', password: '' }); */
        setEmail('')
        setPassword('')
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setMensaje('')
        }, 3000)
        return () => clearTimeout(timer)
    }, [mensaje])





    return (
        <>
            <main className={style.principal}>
                <div className={style.contenido}>
                    <h1 className={style.logo}>LOGIN</h1>
                    <div className={style.contenedorform}>
                        <form /* action="/user/login"  */ className={style.empa} /* method="post" */>
                            <div className={style.pame}>
                                <span className={style.icon}>
                                    <ion-icon name="mail-outline"></ion-icon>
                                </span>
                                <input type="email"
                                    name="email"
                                    placeholder="Email"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />
                                <label htmlFor="email"></label>
                            </div>
                            <div className={style.pame}>
                                <span className={style.icon}>
                                    <ion-icon name="lock-closed-outline"></ion-icon>
                                </span>
                                <input type="password"
                                    name="password"
                                    placeholder="Password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                                <label htmlFor="password"></label>
                            </div>
                            {mensaje && <p className={style.mensaje}>{mensaje}</p>}
                            <div className={style.botones}>
                                <button className={style.button} onClick={handleSubmit}  >Acceder</button>
                                {/*  <button type="reset" className={style.button}>Reset</button> */}
                            </div>
                        </form>

                        <p> No estas registrado?<Link to={'/register'}> Register</Link></p>
                    </div>
                </div>

            </main>
        </>

    )
}

export default Login