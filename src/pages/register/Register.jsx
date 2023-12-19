import style from './Register.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mensaje, setMensaje] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await axios.post('https://back-de-bloc.onrender.com/api/Register', {
                nombre,
                email,
                password
            })
            console.log(data)
            setMensaje(data.data.mensaje)
            navigate('/', { replace: true });

        } catch (error) {
            console.log(error)
            setMensaje(error.response.data.mensaje)
        }
        setNombre('')
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
                    <div className={style.contenedorform}>
                        <div className={style.contenedorTitulo}>
                            <h1 className={style.logo}>REGISTER</h1>
                        </div>
                        <form /* action="/user/create" */ className={style.empa} /* method="post" */ onSubmit={handleSubmit}>
                            <div className={style.pame}>
                                <span className={style.icon}>
                                    <ion-icon name="person-outline" className={style.ionicon}></ion-icon>
                                </span>
                                <input className={style.input} type="text"
                                    name="nombre"
                                    placeholder="Nombre"
                                    id="nombre"
                                    onChange={(e) => setNombre(e.target.value)}
                                    required />
                                <label htmlFor="nombre"></label>
                            </div>
                            <div className={style.pame}>
                                <span className={style.icon}>
                                    <ion-icon name="mail-outline" className={style.ionicon}></ion-icon>
                                </span>
                                <input className={style.input} type="email"
                                    name="email"
                                    placeholder="Email"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />
                                <label htmlFor="email"></label>
                            </div>
                            <div className={style.pame}>
                                <span className={style.icon}>
                                    <ion-icon name="lock-closed-outline" className={style.ionicon}></ion-icon>
                                </span>
                                <input className={style.input} type="password"
                                    name="password"
                                    placeholder="Password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                                <label htmlFor="password"></label>
                            </div>
                            {mensaje && <p className={style.mensaje}>{mensaje}</p>}
                            <div className={style.botones}>
                                <button type='submit' className={style.button} onClick={handleSubmit}>Register</button>
                                {/* <button type="reset" className={style.button}>Reset</button> */}
                            </div>
                        </form>
                        <p> Ya estas registrado?<Link to={'/'}> Login</Link></p>
                    </div>
                </div>
            </main>

        </>
    )
}

export default Register