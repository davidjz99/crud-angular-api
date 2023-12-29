const Producto = require("../models/Producto");

exports.crearProducto = async (req, res) => {
    try{
        let producto;

        //Creamos nuestro producto
        producto = new Producto(req.body); //Recibir un nuevo producto a traves del body de la request

        await producto.save(); //Guardar el producto ... Await significa esperar a hacer la peticion a la bd
        res.send(producto); //Enviar un mensaje con el producto que se acaba de crear y guardar

    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Obtener un producto especifico - se busca por id
exports.obtenerProducto = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({ msg: "No existe ese producto" });
        }

        res.json(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarProducto = async (req, res) => {
    try {
        const { nombre, categoria, ubicacion, precio } = req.body;
        let producto = await Producto.findById(req.params.id);
        
        if(!producto){
            res.status(404).json({ msg: "No existe ese producto" });
        }

        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.ubicacion = ubicacion;
        producto.precio = precio;

        producto = await Producto.findOneAndUpdate({ _id: req.params.id }, producto, { new: true });
        res.json(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarProducto = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({ msg: "No existe ese producto" });
        }

        await Producto.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: "Producto eliminado correctamente" });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}