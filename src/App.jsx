import './App.css';

import Login from './pages/login/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/register/Register';
/* import RouterApp from './routes/routerApp'; */
import { AuthProvider } from './context/authContext';
/* import PrivateRoute from './routes/protectedRouter'; */
import Profile from './pages/home/Profile'
import Notes from './pages/notes/Notes'
import Editar from './pages/edit/edit'
import ErrorScreen from './pages/error/ErrorScreen'
import Footer from './components/footer/Footer'
import BarNav from './components/navegacion/Navbar'
import { useAuth } from './context/authContext';


const ProtectedRoutes = ({element})=>{
  const {isAuthenticated } = useAuth()
  return isAuthenticated ? element : <Navigate to="/" />;
}


function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <BarNav />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/profile" element={<ProtectedRoutes element={<Profile/>}/>} />
            <Route path="/notes" element={<ProtectedRoutes element={<Notes/>}/>}  />
            <Route path="/Edit/:id" element={<ProtectedRoutes element={<Editar/>}/>}  />
            <Route path="*" element={<ErrorScreen />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;