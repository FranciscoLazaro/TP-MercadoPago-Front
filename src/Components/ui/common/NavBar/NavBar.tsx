// src/Components/ui/common/NavBar/NavBar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Instrumento from '../../../../types/Instrumento';

interface NavbarProps {
  carrito: Instrumento[];
}

const Navbar: React.FC<NavbarProps> = ({ carrito }) => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/carrito');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Mi Tienda
        </Typography>
        <Typography component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Inicio</Link>
        </Typography>
        <Typography component="div" sx={{ flexGrow: 1 }}>
          <Link to="/categorias" style={{ textDecoration: 'none', color: 'inherit' }}>Categorías</Link>
        </Typography>
        <Typography component="div" sx={{ flexGrow: 1 }}>
          <Link to="/instrumentos" style={{ textDecoration: 'none', color: 'inherit' }}>Instrumentos</Link>
        </Typography>
        <IconButton
          aria-label="Carrito de Compras"
          onClick={handleCartClick}
          color="inherit"
        >
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
