
import styles from './Footer.module.css'

function Footer(){
    return(
        <footer className={styles.footer}>
            <div className="">
                <span className="">&copy; 2023 Company, Inc</span>
            </div>

            <ul className="">
                <li className=""><a className="" href="#">Youtube</a></li>
                <li className=""><a className="" href="https://github.com/GasBomy" target="_blank">GitHub</a></li>
                <li className=""><a className="" href="#">Facebook</a></li>
            </ul>
        </footer>
    )
}
export default Footer;