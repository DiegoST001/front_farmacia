import React, { useState, useEffect } from 'react';

function LaboratorioForm({ onSubmit, loading, initialData = null, onCancel }) {
  const [form, setForm] = useState({
    razonSocial: '',
    direccion: '',
    telefono: '',
    email: '',
    contacto: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.razonSocial || !form.direccion || !form.telefono || !form.email || !form.contacto) {
      setError('Completa todos los campos.');
      return;
    }
    setError('');
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow max-w-lg mx-auto mt-8"
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-400">
        {initialData ? 'Editar Laboratorio' : 'Registrar Laboratorio'}
      </h2>
      {error && <div className="mb-4 text-red-400 bg-gray-900 rounded p-2 text-center">{error}</div>}
      <div className="mb-3">
        <label className="block text-gray-300 mb-1">Razón Social</label>
        <input
          type="text"
          name="razonSocial"
          value={form.razonSocial}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
        />
      </div>
      <div className="mb-3">
        <label className="block text-gray-300 mb-1">Dirección</label>
        <input
          type="text"
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
        />
      </div>
      <div className="mb-3">
        <label className="block text-gray-300 mb-1">Teléfono</label>
        <input
          type="text"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
        />
      </div>
      <div className="mb-3">
        <label className="block text-gray-300 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Contacto</label>
        <input
          type="text"
          name="contacto"
          value={form.contacto}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition duration-200"
        >
          {loading ? 'Guardando...' : initialData ? 'Actualizar' : 'Registrar'}
        </button>
        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded transition duration-200"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default LaboratorioForm;