const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');

module.exports = function () {

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

    return router;
};
