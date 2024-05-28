// src/Components/screens/CarritoPage/CarritoPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import Swal from 'sweetalert2';
import CheckoutMP from '../CheckoutMP/CheckoutMP';
import Instrumento from '../../../types/Instrumento';
import { PedidoPost } from '../../../types/PedidoPost';
import PedidoDetalleService from '../../../service/PedidoDetalleService';
import PedidoService from '../../../service/PedidoService';
import { PedidoDetallePost } from '../../../types/PedidoDetallePost';

interface CarritoPageProps {
  carrito: Instrumento[];
}

const CarritoPage: React.FC<CarritoPageProps> = ({ carrito }) => {
  const [cantidadItems, setCantidadItems] = useState<{ [key: number]: number }>({});
  const [montoCarrito, setMontoCarrito] = useState<number>(0);
  const [finalizado, setFinalizado] = useState<boolean>(false);
  const pedidoDetalleService = new PedidoDetalleService();
  const pedidoService = new PedidoService();
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleAgregarCantidad = (id: number) => {
    setCantidadItems(prevState => ({
      ...prevState,
      [id]: (prevState[id] || 0) + 1
    }));
  };

  const handleQuitarCantidad = (id: number) => {
    setCantidadItems(prevState => ({
      ...prevState,
      [id]: Math.max((prevState[id] || 0) - 1, 0)
    }));
  };

  const handleFinalizarCompra = async () => {
    for (const item of carrito) {
      const cantidad = cantidadItems[item.id] || 0;
      if (cantidad > 0) {
        const pedidoDetalle: PedidoDetallePost = {
          cantidad,
          idInstrumento: item.id
        };
        await pedidoDetalleService.post(url + '/pedidoDetalle', pedidoDetalle);
      }
    }

    const totalPedido = carrito.reduce((total, item) => total + (item.precio * (cantidadItems[item.id] || 0)), 0);

    const pedidosDetalle = carrito.map(item => item.id);

    const pedido: PedidoPost = {
      totalPedido,
      pedidosDetalle
    };

    await pedidoService.post(url + '/pedido', pedido);

    setMontoCarrito(totalPedido);
    setFinalizado(true);

    Swal.fire({
      icon: 'success',
      title: 'Pedido realizado exitosamente',
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {carrito && carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        carrito.map((item, index) => (
          <div key={index}>
            {item.instrumento} - ${item.precio} x
            <button onClick={() => handleQuitarCantidad(item.id)}>-</button>
            {cantidadItems[item.id] || 0}
            <button onClick={() => handleAgregarCantidad(item.id)}>+</button>
          </div>
        ))
      )}
      {!finalizado ? (
        <button onClick={handleFinalizarCompra}>Finalizar Compra</button>
        
        
        
      ) : (
        <CheckoutMP montoCarrito={montoCarrito} />
      )}
   
    </div>
  );
};

export default CarritoPage;
