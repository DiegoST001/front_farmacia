import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUsuario } from '../services/authService';

function ProtectedRoute({ children, roles }) {
  const usuario = getUsuario();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(usuario.rol)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="bg-gray-800 p-8 rounded shadow text-center">
          <h2 className="text-2xl font-bold mb-4">Acceso denegado</h2>
          <p>No tienes permisos para ver esta página.</p>
        </div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;