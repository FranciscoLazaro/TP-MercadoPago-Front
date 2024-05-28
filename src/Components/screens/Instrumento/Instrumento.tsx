import React, { useState, useEffect } from 'react';
import { Button, CircularProgress } from '@mui/material';
import Column from '../../../types/Column';
import Instrumento from '../../../types/Instrumento';
import InstrumentoService from '../../../service/InstrumentoService';
import TableComponent from '../../ui/TableComponent/TableComponent';
import ModalInstrumento from '../../ui/Modals/ModalInstrumento';


const InstrumentoPage: React.FC = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [instrumentoSeleccionado, setInstrumentoSeleccionado] = useState<Instrumento | null>(null);
  

  const instrumentoService = new InstrumentoService();
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchInstrumentos = async () => {
      try {
        const data = await instrumentoService.getAll(url + '/instrumento');
        setInstrumentos(data);
      } catch (error) {
        console.error('Error al obtener los instrumentos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstrumentos();
  }, [instrumentoService, url]);

  const handleAgregarInstrumento = (instrumento: Instrumento | null) => {
    setModalOpen(true);
    if (instrumento) {
      setIsEditing(true);
      setInstrumentoSeleccionado(instrumento);
    } else {
      setIsEditing(false);
      setInstrumentoSeleccionado(null);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEditing(false);
    setInstrumentoSeleccionado(null);
  };

  const handleDeleteInstrumento = async (instrumento: Instrumento) => {
    try {
      await instrumentoService.delete(url + '/instrumento', instrumento.id);
      setInstrumentos(instrumentos.filter((item) => item.id !== instrumento.id));
    } catch (error) {
      console.error('Error al eliminar el instrumento:', error);
    }
  };

  const initialInstrumento: Instrumento = {
    id: 0,
    instrumento: "",
    marca: "",
    modelo: "",
    imagen: "",
    precio: 0,
    cantidad: 0,
    categoria: {
      id: 0,
      denominacion: ""
    }
  };

  const columns: Column[] = [
    { id: 'instrumento', label: 'Instrumento', renderCell: (row) => row.instrumento },
    { id: 'marca', label: 'Marca', renderCell: (row) => row.marca || '-' },
    { id: 'modelo', label: 'Modelo', renderCell: (row) => row.modelo || '-' },
    { id: 'imagen', label: 'Imagen', renderCell: (row) => <img src={row.imagen} alt="Instrumento" style={{ width: '50px', height: '50px' }} /> },
    { id: 'precio', label: 'Precio', renderCell: (row) => `$${row.precio}` },

  ];

  return (
    <div>
      <Button variant="contained" onClick={() => handleAgregarInstrumento(null)}>Agregar Instrumento</Button>
      {isLoading ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      ) : (
        <TableComponent data={instrumentos} columns={columns} onEdit={handleAgregarInstrumento} onDelete={handleDeleteInstrumento} />
      )}
      
      <ModalInstrumento open={modalOpen} handleClose={handleCloseModal} initialValues={instrumentoSeleccionado || initialInstrumento} isEditing={isEditing} />
    </div>
  );
};

export default InstrumentoPage;


