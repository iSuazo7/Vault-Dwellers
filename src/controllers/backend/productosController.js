const Producto = require('../../models/backend/productosModel');


async function getProductosController(req, res){
    try {
        const productoModel = new Producto();
        const productos = await productoModel.getAllProductos();
        if (productos.length === 0) {
            return res.status(404).send('No se encontraron productos en la base de datos.');
        }
        let jsonData = JSON.stringify(productos.map(producto => ({ 
            nombre: producto.nombre,
            valor: producto.valor
        })));
        jsonData = JSON.parse(jsonData);
        // console.log(jsonData);
        return jsonData;
    } catch (error) {
        console.error('Error obteniendo productos: ', error);
        res.status(500).send('Error interno del servidor');
    }
};
module.exports = {getProductosController}