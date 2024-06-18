const DataBase = require('../conexionModel');

class ProductoModel{
    async getAllProductos(){
        try {
            const db = DataBase.getInstance();
            const query = "SELECT nombre, valor FROM productos";
            const results = await db.ejecutarQuery(query);
            return results;
        } catch (error) {
            console.error('Error recuperando items: ', error);
            throw error;
        }        
    }

    async ingresarProductos(nombre, valor){
        try {
            const db = DataBase.getInstance();
            const query = 'INSERT INTO productos (nombre, valor) VALUES (?, ?)';
            await db.ejecutarQuery(query, [nombre, valor]);
        } catch (error) {
            console.error('Error en la consulta: ', error);
            throw error;
        }
    }
}
module.exports = ProductoModel;