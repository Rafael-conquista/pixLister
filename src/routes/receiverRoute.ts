import { Router } from 'express';
import { ReceiverList, ReceiverPost, ReceiverPut, Receiverdelete } from '../controllers/ReceiverController';

const router = Router();

router.get('/listaRecebedores', ReceiverList);
router.post('/Recebedor', ReceiverPost);
router.put('/Recebedor', ReceiverPut);
router.delete('/Recebedor', Receiverdelete);

export default router;