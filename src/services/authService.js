import axios from 'axios';

const API_URL = 'https://farmacia-expres-4.onrender.com/api'; // Cambia el puerto si tu backend usa otro

// Función de login
export async function login(email, password) {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token, rol } = response.data;
    const usuario = { email, rol, nombre: email.split('@')[0] };
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
    return { token, usuario };
  } catch (error) {
    throw error.response?.data?.message || 'Error al iniciar sesión';
  }
}

// Función de registro
export async function register(nombre, email, password, rol) {
  const token = getToken(); // Obtenemos el token del localStorage
  const usuario = getUsuario(); // Obtenemos los datos del usuario autenticado
  
  // Verificamos si hay token y si el usuario tiene rol admin
  if (!token || !usuario || usuario.rol !== 'admin') {
    throw new Error('No tienes permisos para registrar usuarios o no estás autenticado como administrador');
  }
  
  try {
    const response = await axios.post(`${API_URL}/usuarios`, { nombre, email, password, rol }, {
      headers: { Authorization: `Bearer ${token}` } // Enviamos el token como parte de la cabecera
    });
    const { token: newToken, rol: usuarioRol } = response.data;
    const usuarioRegistrado = { email, rol: usuarioRol, nombre };
    if (newToken) {
      localStorage.setItem('token', newToken);
      localStorage.setItem('usuario', JSON.stringify(usuarioRegistrado));
    }
    return { newToken, usuarioRegistrado };
  } catch (error) {
    throw error.response?.data?.message || 'Error al registrar usuario';
  }
}

// Función para logout
export function logout() {
  localStorage.removeItem('usuario');
  localStorage.removeItem('token');
}

// Función para obtener el token
export function getToken() {
  return localStorage.getItem('token');
}

// Función para obtener el usuario
export function getUsuario() {
  const usuario = localStorage.getItem('usuario');
  if (!usuario || usuario === 'undefined') return null;
  try {
    return JSON.parse(usuario);
  } catch {
    return null;
  }
}
