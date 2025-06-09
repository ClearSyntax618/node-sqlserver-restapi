import { Router } from "express";
import {
    getClients,
    getClient,
    createClient,
    deleteClient,
    updateClient
} from '../controllers/client.controller.js';

const router = Router();

router.get('/clientes', getClients);
router.get('/cliente/:id', getClient);
router.post('/new-cliente', createClient);
router.delete('/delete-cliente/:id', deleteClient);
router.put('/update-cliente/:id', updateClient);


export default router;