import { Router } from "express";
const router = Router();

router.post('/venta', createVenta);
router.get('/ventas', getVentas);
router.get('/venta/:cId/:pId', getVenta);
router.delete('/venta/:cId/:pId', deleteVenta);
router.put('/venta/:cId/:pId', updateVenta);