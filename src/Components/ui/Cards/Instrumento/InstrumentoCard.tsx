import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import InstrumentoType from '../../../../types/Instrumento';

interface InstrumentoCardProps {
  instrumento: InstrumentoType;
  onAddToCart: (instrumento: InstrumentoType) => void;
}

const InstrumentoCard: React.FC<InstrumentoCardProps> = ({ instrumento, onAddToCart }) => {
  const { instrumento: nombreInstrumento, marca, modelo, imagen, precio } = instrumento;

  const handleClick = () => {
    onAddToCart(instrumento);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{nombreInstrumento}</Typography>
        <Typography variant="body1">Marca: {marca}</Typography>
        <Typography variant="body1">Modelo: {modelo}</Typography>
        <img src={imagen} alt={nombreInstrumento} style={{ maxWidth: '100%' }} />
        <Typography variant="body1">Precio: ${precio}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={handleClick}>Agregar al carrito</Button>
      </CardActions>
    </Card>
  );
};

export default InstrumentoCard;
