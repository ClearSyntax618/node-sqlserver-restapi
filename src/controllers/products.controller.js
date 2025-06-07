import { getConnection } from "../db/connection.js";

export const getProducts = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Producto');

        if(!result.recordset[0]) {
            return res.status(404).json({
                message: 'Products Not Found',
            });
        }

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

export const getProduct = async (req, res) => {
    const id = req.params['id'];
    
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`SELECT * FROM Producto WHERE codP = ${id}`);

        if(!result.recordset[0]) {
            return res.status(404).json({
                message: 'Product Not Found',
            });
        }

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

export const createProducts = async (req, res) => {
    const { nombre, descripcion, stock, precio } = req.body;

    if(!nombre || !descripcion || isNaN(stock) || isNaN(precio) || stock < 0 || precio < 0) {
        return res.status(400).json({
            error: "Validation failed",
            details: {
                nombre: "Debe tener al menos 3 caracteres",
                descripcion: "Debe tener al menos 8 caracteres",
                stock: "Debe ser numero mayor a cero",
                precio: "Debe ser numero mayor a cero"
            }
        });
    }

    try {
        const pool = await getConnection();
        await pool.request().query(`INSERT INTO Producto([nombre], [descripcion], [stock], [precio]) VALUES ('${nombre}', '${descripcion}', ${stock}, ${precio})`);  
    
        return res.status(200).send("Producto añadido satisfactoriamente");
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }

}

export const updateProduct = async (req, res) => {
    const id = req.params['id'];
    const { nombre, descripcion, stock, precio } = req.body;

    if(!nombre || !descripcion || isNaN(stock) || isNaN(precio) || stock < 0 || precio < 0) {
        return res.status(400).json({
            error: "Validation failed",
            details: {
                nombre: "Debe tener al menos 3 caracteres",
                descripcion: "Debe tener al menos 8 caracteres",
                stock: "Debe ser numero mayor a cero",
                precio: "Debe ser numero mayor a cero"
            }
        });
    }

    try {
        const pool = await getConnection();
        const result = await pool.request().query(`SELECT * FROM Producto WHERE codP = ${id}`);

        if(!result.recordset[0]) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        await pool.request().query(`UPDATE Producto SET nombre = '${nombre}', descripcion = '${descripcion}', stock = ${stock}, precio = ${precio} WHERE codP = ${id}`);

        return res.status(200).send("Producto actualizado correctamente");
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

export const deleteProduct = async (req, res) => {
    const id = req.params['id'];

    try {
        const pool = await getConnection();
        const result = await pool.request().query(`SELECT * FROM Producto WHERE codP = ${id}`);

        if(!result.recordset[0]) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        await pool.request().query(`DELETE FROM esComprado WHERE codP = ${id}`);
        await pool.request().query(`DELETE FROM Producto WHERE codP = ${id}`);

        return res.status(200).send("Producto eliminado satisfactoriamente");
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }

}