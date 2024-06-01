import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '../../../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userRole, userName, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleCartClick = () => {
    navigate('/carrito');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
        {isAuthenticated && userRole === 'ADMIN' && (
          <>
            <Typography component="div" sx={{ flexGrow: 1 }}>
              <Link to="/categorias" style={{ textDecoration: 'none', color: 'inherit' }}>Categorías</Link>
            </Typography>
            <Typography component="div" sx={{ flexGrow: 1 }}>
              <Link to="/instrumentos" style={{ textDecoration: 'none', color: 'inherit' }}>Instrumentos</Link>
            </Typography>
          </>
        )}
        {isAuthenticated && userRole === 'OPERADOR' && (
          <IconButton aria-label="Carrito de Compras" onClick={handleCartClick} color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        )}
        {!isAuthenticated ? (
          <IconButton aria-label="Iniciar Sesión" onClick={handleLoginClick} color="inherit">
            <AccountCircleIcon />
          </IconButton>
        ) : (
          <>
            <IconButton aria-label="Usuario" onClick={handleMenuClick} color="inherit">
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem disabled>{userName}</MenuItem>
              <MenuItem disabled>{userRole}</MenuItem>
              <MenuItem onClick={handleLogoutClick}>Cerrar Sesión</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
