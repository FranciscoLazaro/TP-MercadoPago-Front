// src/Components/ui/common/NavBar/NavBar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/carrito');
  };

  const handleLoginClick = () => {
    navigate('/login');
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
        <IconButton
          aria-label="Iniciar Sesión"
          onClick={handleLoginClick}
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
