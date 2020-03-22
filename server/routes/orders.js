import { Router } from 'express';
import auth from '../middleware/auth.middleware';
import Order from '../models/Order';

const router = Router();

router.get('/', (req, res) => {
    Order.find()
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: e.message || 'Произошла ошибка' });
        });
});

router.post('/', auth, (req, res) => {
    new Order({ userId: req.user.userId, ...req.body })
        .save()
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: e.message || 'Произошла ошибка' });
        });
});

export default router;

