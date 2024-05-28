import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Categoria from '../../../types/Categoria';
import CategoriaService from '../../../service/CategoriaService';

interface CategoriaModalProps {
  open: boolean;
  handleClose: () => void;
  initialValues: Categoria;
  getCategorias: () => void;
  isEditing: boolean; 
}

const CategoriaModal: React.FC<CategoriaModalProps> = ({ open, handleClose, initialValues, isEditing, getCategorias }) => {
  const validationSchema = Yup.object().shape({
    denominacion: Yup.string().required('El campo denominación es requerido'),
  });

  const url = import.meta.env.VITE_API_URL;
  const categoriaService = new CategoriaService();

  const handleSubmit = async (values: Categoria) => {
    try {
      if (isEditing) {
        // Editar categoría existente (PUT)
        await categoriaService.put(url+'/categoria', initialValues.id, values);
        getCategorias();
      } else {
        // Crear nueva categoría (POST)
        await categoriaService.post(url+'/categoria', values);
        getCategorias();
      }
      handleClose();
    } catch (error) {
      console.error('Error al guardar la categoría:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEditing ? 'Editar Categoría' : 'Crear Categoría'}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values: Categoria) => handleSubmit(values)}
        >
          {() => (
            <Form>
              <Field name="denominacion" as={TextField} label="Denominación" fullWidth />
              <div style={{ color: 'red' }}>
                <ErrorMessage name="denominacion" component="div" />
              </div>
              <DialogActions>
                <Button type="submit" color="primary">{isEditing ? 'Guardar' : 'Crear'}</Button>
                <Button onClick={handleClose} color="secondary">Cancelar</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CategoriaModal;
