import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css'; 
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Laboratorios from './components/Laboratorios';
import { login, register, getUsuario, logout } from './services/authService';

function Dashboard({ usuario }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Bienvenido, {usuario.nombre}</h1>
      <p className="mb-6">Rol: <span className="font-semibold">{usuario.rol}</span></p>
    </div>
  );
}

// Componente para proteger rutas solo para administradores
function AdminRoute({ usuario, children }) {
  if (usuario?.rol !== 'admin') {
    return <Navigate to="/laboratorios" replace />; // Redirige si no es admin
  }

  return children;
}

function App() {
  const [usuario, setUsuario] = useState(getUsuario());

  const handleLogin = async (email, password) => {
    try {
      const { usuario } = await login(email, password);
      setUsuario(usuario); // Esto debe actualizar el estado
    } catch (error) {
      alert(error);
    }
  };

  const handleRegister = async (email, password) => {
    try {
      const { usuario } = await register(email, password);
      setUsuario(usuario); // Esto debe actualizar el estado
    } catch (error) {
      alert(error);
    }
  };

  const handleLogout = () => {
    logout();
    setUsuario(null);
  };

  return (
    <Router>
      {usuario && <Navbar usuario={usuario} onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/login"
          element={usuario ? <Navigate to="/laboratorios" replace /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/register"
          element={
            <AdminRoute usuario={usuario}>
              <Register onRegister={handleRegister} />
            </AdminRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard usuario={usuario} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/laboratorios"
          element={
            <ProtectedRoute>
              <Laboratorios />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
