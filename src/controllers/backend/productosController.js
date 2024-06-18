const Producto = require('../../models/backend/productosModel');


async function getProductosController(req, res){
    try {
        const productoModel = new Producto();
        const productos = await productoModel.getAllProductos();
        if (productos.length === 0) {
            return res.status(404).send('No se encontraron productos en la base de datos.');
        }
        let jsonData = JSON.stringify(productos.map(producto => ({ //map sirve para recorrer un array. Similar a un forEach
            nombre: producto.nombre,
            valor: producto.valor
        })));
        jsonData = JSON.parse(jsonData);
        // console.log(jsonData); //Para testing. Borrar luego
        return jsonData;
    } catch (error) {
        console.error('Error obteniendo productos: ', error);
        res.status(500).send('Error interno del servidor');
    }
};

async function agregarProductos(req, res){
    try {
        const productoModel = new Producto();
        const {nombre, valor} = req.body;
        await productoModel.ingresarProductos(nombre, valor);
        res.status(200).send('Productos agregados con exito');
    } catch (error) {
        res.status(500).send('Error agregando el producto: ', error);
    }
}

module.exports = {
    getProductosController,
    agregarProductos
}