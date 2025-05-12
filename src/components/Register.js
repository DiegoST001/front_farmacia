//componentes/Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir después de registrarse
import { register } from '../services/authService'; // Importamos la función de registro

function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('usuario'); // Por defecto 'usuario'
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Para redirigir después del registro exitoso

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !email || !password || !rol) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    setError('');
    try {
      const { usuario } = await register(nombre, email, password, rol);
      navigate('/'); // Redirige a la página de inicio después de registrarse
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Registrarse</h2>
        {error && (
          <div className="mb-4 text-red-400 bg-gray-900 rounded p-2 text-center">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="nombre">
            Nombre
          </label>
          <input
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2" htmlFor="rol">
            Rol
          </label>
          <select
            id="rol"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="usuario">Usuario</option>
            <option value="moderador">Moderador</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition duration-200"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default Register;
