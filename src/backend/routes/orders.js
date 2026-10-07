import { Router } from 'express';
import { lookupOrder } from '../controllers/orders.js';

const router = Router();

router.get('/lookup', lookupOrder);

export default router;
