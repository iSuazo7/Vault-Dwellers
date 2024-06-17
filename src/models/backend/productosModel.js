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
}
module.exports = ProductoModel;