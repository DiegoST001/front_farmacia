import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ usuario, onLogout }) {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-bold text-blue-400 hover:text-blue-300">
          LaboratorioApp
        </Link>
        <Link to="/laboratorios" className="hover:text-blue-300">
          Laboratorios
        </Link>
        <Link to="/ordenes" className="hover:text-blue-300">
          {/* Órdenes */}
        </Link>
        {/* Solo visible para el rol admin */}
        {usuario?.rol === 'admin' && (
          <Link to="/register" className="hover:text-blue-300">
            Registrar Usuario
          </Link>
        )}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-300">{usuario?.nombre} ({usuario?.rol})</span>
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white font-semibold"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
