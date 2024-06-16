import { Router } from 'express';
import { ReceiverList, ReceiverPost, ReceiverPut, ReceiverDelete } from '../controllers/ReceiverController';

const router = Router();

router.get('/listaRecebedores', ReceiverList);
router.post('/Recebedor', ReceiverPost);
router.put('/Recebedor/:id', ReceiverPut);
router.delete('/Recebedor', ReceiverDelete);
//http://localhost:3000/items?page=1

export default router;