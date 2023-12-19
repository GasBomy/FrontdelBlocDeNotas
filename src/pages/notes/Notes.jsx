import style from './Notes.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
/* import { useAuth } from '../../context/authContext' */


const Notes = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [persona, setPersona] = useState([])
    /* const {credentials}= useAuth()
    console.log(credentials) */

    /* const showTareas = async () => {
        try {
            const getData = await axios.get('http://localhost:9500/api/Tareas/Get',{
                withCredentials: true,
            })
            setPersona(getData.data.dataTareas)
            console.log(getData)
        } catch (error) {
            console.log(error)
        }
    } */

    const showByUser = async () => {
        try {
            const getDataUser = await axios.get('https://back-de-bloc.onrender.com/api/Tareas/GetByUser', {
                withCredentials: true,
            })
            setPersona(getDataUser.data.dataTareas)
            console.log(getDataUser)
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        showByUser()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const sendNote = await axios.post('https://back-de-bloc.onrender.com/api/Tareas/Create', {
                title,
                description
            }, {
                withCredentials: true, // Importante: Habilitar el uso de cookies
            })
            setMensaje(sendNote.data.mensaje)
            /* setTitle('')
            setDescription('') */
            /* showTareas() */
            showByUser()

        } catch (error) {
            console.log(error)
            setMensaje(error.response.data.mensaje)
        }

        setTitle('')
        setDescription('')
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
                    <form className={style.empa} onSubmit={handleSubmit}>
                        <div className={style.pam1}>
                            {/*  <span class="icon">
                                <ion-icon name="mail-outline"></ion-icon>
                            </span> */}
                            <input
                                type="text"
                                value={title}
                                placeholder="Titulo"
                                onChange={(e) => setTitle(e.target.value)}
                                required />
                            <label htmlFor="titulo"></label>
                        </div>
                        <div className={style.pam2}>
                            {/* <span class="icon">
                                <ion-icon name="lock-closed-outline"></ion-icon>
                            </span> */}
                            <textarea
                                value={description}
                                placeholder="Add Note"
                                cols="30"
                                onChange={(e) => setDescription(e.target.value)}
                                rows="10"
                                required></textarea>
                            <label htmlFor="content"></label>
                        </div>

                        <div className={style.botones}>
                            <button type='submit' >Save</button>
                            {/* <button type='reset'>Reset</button> */}
                        </div>
                        {mensaje && <p className={style.mensaje}>{mensaje}</p>}
                    </form>
                </div>
                <section className={style.contenedorNotas} >
                    {persona && Array.isArray(persona) && persona.map((tarea) => (
                        <Link key={tarea._id} to={`/Edit/${tarea._id}`} className={style.notas}>
                            <div className={style.div1} >
                                <h2>{tarea.title}</h2>
                                <div className={style.contP}>
                                    {/* <p>{tarea.description}</p> */}
                                    <p>{tarea.date}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>
            </main >
        </>
    )
}

export default Notes