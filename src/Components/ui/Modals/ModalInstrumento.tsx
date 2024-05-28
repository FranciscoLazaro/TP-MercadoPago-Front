import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import CategoriaService from '../../../service/CategoriaService';
import Categoria from '../../../types/Categoria';
import Instrumento from '../../../types/Instrumento';
import InstrumentoService from '../../../service/InstrumentoService';
import { SelectChangeEvent } from '@mui/material';

interface ModalInstrumentoProps {
    open: boolean;
    handleClose: () => void;
    initialValues: Instrumento;
    isEditing: boolean;
}

const ModalInstrumento: React.FC<ModalInstrumentoProps> = ({ open, handleClose, initialValues, isEditing }) => {
    const [instrumento, setInstrumento] = useState<Instrumento>(initialValues);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const categoriaService = new CategoriaService();
    const instrumentoService = new InstrumentoService();
    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const categoriasData = await categoriaService.getAll(url + '/categoria');
                setCategorias(categoriasData);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };
        fetchCategorias();
    }, [url]);

    const resetForm = () => {
        setInstrumento({
            id: 0,
            instrumento: '',
            marca: '',
            modelo: '',
            imagen: '',
            precio: 0,
            costoEnvio: '',
            cantidadVendida: 0,
            descripcion: '',
            cantidad: 0,
            categoria: {
                id: 0,
                denominacion: ''
            },
        });
    };

    useEffect(() => {
        if (open && !isEditing) {
            resetForm();
        }
    }, [open, isEditing]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInstrumento(prevState => ({
            ...prevState,
            [name]: name === 'precio' || name === 'cantidad' || name === 'cantidadVendida' ? Number(value) : value
        }));
    };

    const handleCategoriaChange = (e: SelectChangeEvent<string>) => {
        const selectedCategoria = categorias.find(categoria => categoria.id === Number(e.target.value));
        setInstrumento((prevState: any) => ({
            ...prevState,
            categoria: selectedCategoria || null
        }));
    };

    const handleSubmit = async (values: Instrumento) => {
        try {
            if (isEditing) {
                await instrumentoService.put(url + '/instrumento', initialValues.id, values);
            } else {
                await instrumentoService.post(url + '/instrumento', values);
            }
            handleClose();
        } catch (error) {
            console.error('Error al guardar el producto:', error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{isEditing ? 'Editar Instrumento' : 'Crear Instrumento'}</DialogTitle>
            <DialogContent>
                <TextField
                    name="instrumento"
                    label="Instrumento"
                    value={instrumento.instrumento}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="categoria-label">Categoría</InputLabel>
                    <Select
                        labelId="categoria-label"
                        id="categoria"
                        value={instrumento.categoria ? instrumento.categoria.id.toString() : ''}
                        onChange={handleCategoriaChange}
                    >
                        <MenuItem value="">
                            <em>Seleccione una categoría</em>
                        </MenuItem>
                        {categorias.map(categoria => (
                            <MenuItem key={categoria.id} value={categoria.id.toString()}>{categoria.denominacion}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    name="marca"
                    label="Marca"
                    value={instrumento.marca || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="modelo"
                    label="Modelo"
                    value={instrumento.modelo || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="imagen"
                    label="URL de Imagen"
                    value={instrumento.imagen || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="precio"
                    label="Precio"
                    type="number"
                    value={instrumento.precio}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="costoEnvio"
                    label="Costo de Envío"
                    value={instrumento.costoEnvio || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="cantidadVendida"
                    label="Cantidad Vendida"
                    type="number"
                    value={instrumento.cantidadVendida || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="descripcion"
                    label="Descripción"
                    multiline
                    rows={4}
                    value={instrumento.descripcion || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancelar</Button>
                <Button onClick={() => handleSubmit(instrumento)} color="primary">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalInstrumento;
