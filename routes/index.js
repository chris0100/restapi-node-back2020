const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');

module.exports = function () {

    //********************************************
    //*********** CLIENTES **********************

    // POST AGREGAR NUEVOS CLIENTE
    router.post('/clientes', clienteController.nuevoCliente);

    //GET OBTENER CLIENTES
    router.get('/clientes', clienteController.obtenerClientes);

    //GET MUESTRA UN CLIENTE EN ESPECIFICO(ID)
    router.get('/clientes/:id', clienteController.mostrarCliente);

    //PUT ACTUALIZAR CLIENTE
    router.put('/clientes/:id', clienteController.actualizarCliente);

    //DELETE Eliminar cliente
    router.delete('/clientes/:id', clienteController.eliminarCliente);




    //********************************************
    //*********** PRODUCTOS **********************

    //POST NUEVO PRODUCTO
    router.post('/productos', productosController.subirImagen,
        productosController.nuevoProducto);

    //GET MUESTRA TODOS LOS PRODUCTOS
    router.get('/productos', productosController.mostrarProductos);

    //GET MUESTRA UN PRODUCTO EN ESPECIFICO POR ID
    router.get('/productos/:id', productosController.mostrarUnProducto);

    //PUT ACTUALIZAR PRODUCTOS
    router.put('/productos/:id', productosController.subirImagen,
        productosController.actualizarProducto);

    // DELETE ELIMINAR PRODUCTOS
    router.delete('/productos/:id', productosController.eliminarProducto);



    //********************************************
    //*********** PEDIDOS **********************

    //POST - AGREGA UN NUEVO PEDIDO
    router.post('/pedidos', pedidosController.nuevoPedido);

    //GET - MUESTRA LOS PEDIDOS
    router.get('/pedidos', pedidosController.mostrarPedidos);

    //Mostrar un pedido por su ID
    router.get('/pedidos/:id', pedidosController.mostrarUnPedido);

    // PUT ACTUALIZAR PEDIDOS
    router.put('/pedidos/:id', pedidosController.actualizarPedido);

    //DELETE ELIMINAR PEDIDOS
        router.delete('/pedidos/:id', pedidosController.eliminarPedido);


    return router;
};
