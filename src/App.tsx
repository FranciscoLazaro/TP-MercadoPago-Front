import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Categoria from './Components/screens/Categoria/Categoria';
import Home from './Components/screens/Home/Home';
import Instrumento from './Components/screens/Instrumento/Instrumento';
import Navbar from './Components/ui/common/NavBar/NavBar';
import CarritoPage from './Components/screens/CarritoPage/CarritoPage';
import Login from './Components/screens/Login/Login';
import Register from './Components/screens/Register/Register';
import InstrumentoType from './types/Instrumento';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './Components/PrivateRoute';

const App: React.FC = () => {
  const [carrito, setCarrito] = useState<InstrumentoType[]>([]);

  const handleAddToCart = (instrumento: InstrumentoType) => {
    setCarrito((prevCarrito) => [...prevCarrito, instrumento]);
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home handleAddToCart={handleAddToCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/carrito"
            element={<PrivateRoute requiredRole="OPERADOR" element={<CarritoPage carrito={carrito} />} />}
          />
          <Route
            path="/categorias"
            element={<PrivateRoute requiredRole="ADMIN" element={<Categoria />} />}
          />
          <Route
            path="/instrumentos"
            element={<PrivateRoute requiredRole="ADMIN" element={<Instrumento />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
