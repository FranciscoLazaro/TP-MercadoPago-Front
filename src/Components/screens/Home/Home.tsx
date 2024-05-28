import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import InstrumentoService from '../../../service/InstrumentoService';
import InstrumentoType from '../../../types/Instrumento';
import InstrumentoCard from '../../ui/Cards/Instrumento/InstrumentoCard';

interface HomeProps {
  handleAddToCart: (instrumento: InstrumentoType) => void;
}

const Home: React.FC<HomeProps> = ({ handleAddToCart }) => {
  const [instrumentos, setInstrumentos] = useState<InstrumentoType[]>([]);
  const instrumentoService = new InstrumentoService();
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchInstrumentos = async () => {
      try {
        const instrumentosData = await instrumentoService.getAll(url + '/instrumento');
        setInstrumentos(instrumentosData);
      } catch (error) {
        console.error('Error al obtener los instrumentos:', error);
      }
    };

    fetchInstrumentos();
  }, []);

  return (
    <Container maxWidth='lg'>
      <Typography variant='h5' sx={{ my: 2 }}>Instrumentos Disponibles</Typography>
      <Grid container spacing={2}>
        {instrumentos.map((instrumento) => (
          <Grid item key={instrumento.id} xs={12} sm={6} md={4}>
            <InstrumentoCard instrumento={instrumento} onAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
