import React, { useEffect, useState } from 'react';
import { getLaboratorios, crearLaboratorio, eliminarLaboratorio, editarLaboratorio } from '../services/laboratorioServices';
import { getUsuario } from '../services/authService';
import LaboratorioForm from './LaboratorioForm';

function Laboratorios() {
  const [laboratorios, setLaboratorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [editLab, setEditLab] = useState(null);
  const usuario = getUsuario();

  const cargarLaboratorios = () => {
    setLoading(true);
    getLaboratorios()
      .then(data => {
        setLaboratorios(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar laboratorios');
        setLoading(false);
      });
  };

  useEffect(() => {
    cargarLaboratorios();
  }, []);

  const handleCrear = async (form) => {
    setFormLoading(true);
    try {
      await crearLaboratorio(form);
      cargarLaboratorios();
    } catch (e) {
      alert('Error al crear laboratorio');
    }
    setFormLoading(false);
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este laboratorio?')) {
      try {
        await eliminarLaboratorio(id);
        cargarLaboratorios();
      } catch (e) {
        alert(e?.response?.data?.message || 'Error al eliminar laboratorio');
      }
    }
  };

  const handleEditar = (lab) => {
    setEditLab(lab);
  };

  const handleActualizar = async (form) => {
    setFormLoading(true);
    try {
      await editarLaboratorio(editLab.CodLab, form);
      setEditLab(null);
      cargarLaboratorios();
    } catch (e) {
      alert('Error al actualizar laboratorio');
    }
    setFormLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <span className="text-gray-300">Cargando laboratorios...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <span className="text-red-400">{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">Laboratorios</h2>
      {(usuario?.rol === 'admin' || usuario?.rol === 'moderador') && (
        editLab ? (
          <LaboratorioForm
            onSubmit={handleActualizar}
            loading={formLoading}
            initialData={editLab}
            onCancel={() => setEditLab(null)}
          />
        ) : (
          usuario?.rol === 'admin' && (
            <LaboratorioForm onSubmit={handleCrear} loading={formLoading} />
          )
        )
      )}
      <div className="bg-gray-800 rounded-lg shadow p-6 mt-6">
        <table className="w-full text-left text-gray-200">
          <thead>
            <tr>
              <th className="pb-2">Razón Social</th>
              <th className="pb-2">Dirección</th>
              <th className="pb-2">Teléfono</th>
              {(usuario?.rol === 'admin' || usuario?.rol === 'moderador') && <th className="pb-2">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {laboratorios.map(lab => (
              <tr key={lab.CodLab} className="border-t border-gray-700">
                <td className="py-2">{lab.razonSocial}</td>
                <td>{lab.direccion}</td>
                <td>{lab.telefono}</td>
                {(usuario?.rol === 'admin' || usuario?.rol === 'moderador') && (
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleEditar(lab)}
                      className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white font-semibold flex items-center"
                      title="Editar"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    {usuario?.rol === 'admin' && (
                      <button
                        onClick={() => handleEliminar(lab.CodLab)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white font-semibold flex items-center"
                        title="Eliminar"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Laboratorios;