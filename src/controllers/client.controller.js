import { getConnection } from "../db/connection.js";

export const createClient = async (req, res) => {
    const { nombre, apellido, saldo } = req.body;

    if(!nombre || !apellido || apellido.length < 5 || nombre.length < 5 || isNaN(saldo)) {
        return res.status(400).json({
            error: "Validation failed",
            details: {
                nombre: "Debe tener al menos 8 caracteres",
                apellido: "Debe tener al menos 8 caracteres",
                saldo: "Debe ser un numero"
            }
        });
    }

    try {
        const pool = await getConnection();
        await pool.request().query(`INSERT INTO Cliente([nombre], [apellido], [saldo]) VALUES ('${nombre}', '${apellido}', ${saldo})`);

        return res.status(200).send("Cliente agredado satisfactoriamente");
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        })
    }
};

export const deleteClient = async (req, res) => {
    const id = req.params['id'];
    
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`SELECT * FROM Cliente WHERE codC = ${id}`);

        if(!result.recordset[0]) {
            return res.status(404).json({
                message: "Client not found",
            })
        }

        await pool.request().query(`DELETE FROM Cliente WHERE codC = ${id}`);
        return res.status(200).send("Cliente eliminado correctamente");
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }

};

export const updateClient = async (req, res) => {
    const id = req.params['id'];
    const { nombre, apellido, saldo } = req.body;

    if(!nombre || !apellido || apellido.length < 5 || nombre.length < 5 || isNaN(saldo)) {
        return res.status(400).json({
            error: "Validation failed",
            details: {
                nombre: "Debe tener al menos 8 caracteres",
                apellido: "Debe tener al menos 8 caracteres",
                saldo: "Debe ser un numero"
            }
        });
    }

    try {
        const pool = await getConnection();
        const result = await pool.request().query(`SELECT * FROM Cliente WHERE codC = ${id}`);
        
        if(!result.recordset[0]) {
            return res.status(404).json({
                message: 'Client not found'
            });
        }

        await pool.request().query(`UPDATE Cliente SET nombre = '${nombre}', apellido = '${apellido}', saldo = ${saldo} WHERE codC = ${id}`);
        return res.status(200).send("Cliente actualizado correctamente");
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

export const getClients = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Cliente');

        if(!result.recordset[0]) {
            return res.status(404).json({
                message: 'Clients Not Found',
            });
        }

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};


export const getClient = async (req, res) => {
    const id = req.params['id'];
    
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`SELECT * FROM Cliente WHERE codC = ${id}`);

        if(!result.recordset[0]) {
            return res.status(404).json({
                message: 'Client Not Found',
            });
        }

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

export const getProductsByClient = async (req, res) => {
    const id = req.params['id'];

    try {
        const pool = await getConnection();
        const result = await pool.request().query(`SELECT p.nombre, p.descripcion, p.stock, p.precio
            FROM Producto p
            JOIN esComprado c ON p.codP = c.codP
            JOIN Cliente cl ON cl.codC = c.codC
            WHERE cl.codC = ${id};`
        );

        if(!result.recordset[0]) {
            return res.status(404).json({
                message: 'Product not found',
            });
        }

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
