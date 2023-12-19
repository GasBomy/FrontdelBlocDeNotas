import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);

    const login = () => {
        // Lógica de autenticación (puedes hacer una solicitud al servidor aquí)
        setAuthenticated(true);
    };

    const logout = () => {
        // Lógica de cierre de sesión
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated ,login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};