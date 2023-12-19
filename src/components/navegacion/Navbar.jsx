import Logout from '../logout/logout'
import style from './NavBar.module.css'
import { Link } from 'react-router-dom'
import logo from '../../images/logofullstack.png'
import { useState } from 'react'

const BarNav = () => {

    const [menu,setMenu ] = useState (false)
    const toggleMenu =()=>{
        setMenu(!menu)
    }


    return (
        <>
            <div className={style.header}>
                <span className={style.headerLogo}><Link to={'/profile'}> <img src={logo}alt="logo" /> </Link></span>
                <div className={style.headerSearch}>
                    <input type="search" name="search" placeholder="Search"/>
                        {/* <span><img src="./images/search-outline.svg"/></span> */}
                </div>
                <button className={style.headerHamburguesa} id="hamburguesa"  onClick={ toggleMenu }><ion-icon size="large" name="reorder-four-outline"></ion-icon></button>
                <ul className={`${style.headerUl} ${menu ? `${style.isActive}` : ''}`} >
                    <li><Link to={'/profile'}>Profile</Link></li>
                    {/* <li><Link to={'/register'}>Register</Link></li>
                    <li><Link to={'/'}>Login</Link></li> */}
                    <li><Link to={'/notes'}>Notes</Link></li>
                    <Logout/>
                </ul>
            </div>
        </>
    )
}

export default BarNav