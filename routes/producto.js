//Rutas para producto
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Cuando el usuario se dirija a : api/productos -> post ... Crear un producto - post
router.post('/', productoController.crearProducto);

// Obtener y mostrar todos los productos - get
router.get('/', productoController.obtenerProductos);

// obtener un producto y mostrarlo - get
router.get('/:id', productoController.obtenerProducto);

// put - actualizar
router.put('/:id', productoController.actualizarProducto); //el ':' es para especificar que el id es una variable y puede cambiar su valor

// delete - eliminar producto
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;