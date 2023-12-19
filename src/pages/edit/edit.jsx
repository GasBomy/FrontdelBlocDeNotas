
import style from './noteEdit.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Editar = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const UpdateTareas = async (e) => {

        e.preventDefault()
        try {
            const putData = await axios.put(`https://back-de-bloc.onrender.com/api/Tareas/Update/${id}`, {
                title: title,
                description: description
            },{
                withCredentials: true,
            })
            console.log(putData)
            navigate('/notes')
        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => {
        getDataById(id)
    }, [id])


    const getDataById = async (id) => {
        const res = await axios.get(`https://back-de-bloc.onrender.com/api/Tareas/GetById/${id}`,{
            withCredentials: true,
        })
        console.log(res)
        setTitle(res.data.dataById.title)
        setDescription(res.data.dataById.description)
    }

    /* =============================================================== */

    const deleteTarea= async(id)=>{
        const deleteById= await axios.delete(`https://back-de-bloc.onrender.com/api/Tareas/Delete/${id}`,{
            withCredentials: true,
        })
        console.log(deleteById)
        return navigate('/notes')
    }


    return (
        <>
            <section className={style.principal}>
                <div className={style.contenido}>
                    <form onSubmit={UpdateTareas} className={style.empa}>
                        <div className={style.pam1}>
                            <input
                                type="text"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                required />
                            <label htmlFor="title"></label>
                        </div>
                        <div className={style.pam2}>
                            <textarea
                                cols="30"
                                rows="10"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required></textarea>
                            <label htmlFor="description"></label>
                        </div>

                        <div className={style.botones}>
                            <button type='submit' className={style.button}>Save</button>
                            {/* <input type="hidden" value="" name="id" /> */}
                            <button className={style.button} type="reset">Reset</button>
                            <button className={style.button} onClick={()=>deleteTarea(id)} id="">Delete</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Editar