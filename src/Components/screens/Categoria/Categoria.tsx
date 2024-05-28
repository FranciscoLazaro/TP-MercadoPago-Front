import React, { useState, useEffect } from 'react';
import { Box, Button, List, ListItem, ListItemText, Typography, Container } from '@mui/material';
import Categoria from '../../../types/Categoria';
import CategoriaModal from '../../ui/Modals/CategoriaModal';
import CategoriaService from '../../../service/CategoriaService';

const Categorias: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const categoriaService = new CategoriaService();
  const url = import.meta.env.VITE_API_URL;
  const  [isEditing, setIsEditing] = useState<boolean>(false)

  const fetchCategorias = async () => {
    try {
      const categoriasData = await categoriaService.getAll(url + '/categoria');
      setCategorias(categoriasData);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleAbrirModal = (categoria: Categoria | null) => {
    if(categoria){
      setIsEditing(true)
      setCategoriaSeleccionada(categoria);
    }
    setIsEditing(false)
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleEditarCategoria = (categoria: Categoria) => {
    handleAbrirModal(categoria);
  };

  const handleEliminarCategoria = async (categoriaId: number) => {
    try {
      await categoriaService.delete(url + '/categoria', categoriaId);
      // Actualizar las categorías después de eliminar
      const categoriasActualizadas = categorias.filter(categoria => categoria.id !== categoriaId);
      setCategorias(categoriasActualizadas);
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
    }
  };

  return (
    <div>
      <Container maxWidth="md">
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Categorías
          </Typography>
          <Button variant="contained" onClick={() => handleAbrirModal(null)}>Crear Categoría</Button>
        </Box>

        <List>
          {categorias.map(categoria => (
            <ListItem key={categoria.id}>
              <ListItemText primary={categoria.denominacion} />
              <Button variant="contained" sx={{mr: 1}} color="primary" onClick={() => handleEditarCategoria(categoria)}>Editar</Button>
              <Button variant="contained" color="error" onClick={() => handleEliminarCategoria(categoria.id)}>Eliminar</Button>
            </ListItem>
          ))}
        </List>

        <CategoriaModal
          open={modalOpen}
          handleClose={handleCloseModal}
          initialValues={categoriaSeleccionada || { id: 0, denominacion: '' }} 
          getCategorias={fetchCategorias}
          isEditing={isEditing}
        />
      </Container>
    </div>
  );
};

export default Categorias;
