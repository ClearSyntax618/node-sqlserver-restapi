import { Router } from "express";
import {
    createProducts,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct
} from '../controllers/products.controller.js';

const router = Router();

router.get('/productos', getProducts);

router.get('/producto/:id', getProduct);

router.post('/productos', createProducts);

router.put('/producto/:id', updateProduct);

router.delete('/producto/:id', deleteProduct);

export default router;