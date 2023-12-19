import { Routes, Route, Navigate} from "react-router-dom"

import Notes from "../pages/notes/Notes"
import Editar from "../pages/edit/edit"
import ErrorScreen from "../pages/error/ErrorScreen"
import BarNav from "../components/navegacion/Navbar"
import Profile from "../pages/home/Profile"
import Footer from "../components/footer/Footer"
import { AuthProvider} from "../context/authContext"
import { useAuth } from "../context/authContext"


const routerApp = () => {

    const { token } = useAuth();

    // Si no hay token, redirige a la página de inicio de sesión
    if (!token) {
        return <Navigate to="/" />;
    }


    return (
        <>
            <AuthProvider>
                <BarNav />
                <Routes>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/Edit/:id" element={<Editar />} />
                    <Route path="*" element={<ErrorScreen />} />
                </Routes>
                <Footer />
            </AuthProvider>

        </>
    )
}

export default routerApp