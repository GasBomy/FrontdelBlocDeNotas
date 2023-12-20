import { useState, useEffect } from 'react';
import axios from 'axios';
import style from './Profile.module.css'
import imagenUser from '../../images/pinguino.jpeg'

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [hora, setHora] = useState(new Date());

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('https://back-de-bloc.onrender.com/api/Profile', { withCredentials: true });
                setUserData(response.data.userTokenFound);
            } catch (error) {
                setError(error.response.data.mensaje);
            }
        };
        fetchProfileData();
    }, []);
    /* ========================================================================== */
    //hora
    useEffect(() => {
        const intervalId = setInterval(() => {
            setHora(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);



    /* ========================================================================== */
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!userData) {
        return <div>Cargando...</div>;
    }

    /* ====================================================== */

    // Renderiza la información del perfil
    return (
        <div className={style.principal}>
            <div className={style.cajaStyle}>
                <div className={style.divImg}>
                    <img src={imagenUser} alt="imagen" className={style.imagen} />
                </div>
                <div className={style.divH}>
                    <p className={style.parrafo1}>Nombre: {userData.nombre}</p>
                    <p className={style.parrafo2}>Correo: {userData.email}</p>
                </div>
                <div className={style.Time}>
                    <h2 className={style.hour}>{hora.toLocaleTimeString()}</h2>
                </div>
                <div className={style.contenedorh1}>
                    <h1 className={style.h1}>Hola  bienvenido a mi proyecto humilde</h1>
                </div>
            </div>
        </div>
    );
};

export default Profile;