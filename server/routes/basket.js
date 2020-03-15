import { Router } from 'express';
import auth from '../middleware/auth.middleware';
import Basket from '../models/Basket';

const router = Router();

router.get('/', auth, (req, res) => {
    Basket.find({ userId: req.user.userId })
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: e.message || 'Произошла ошибка' });
        });
});

router.post('/', auth, (req, res) => {
    new Basket({ userId: req.user.userId, ...req.body })
        .save()
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: e.message || 'Произошла ошибка' });
        });
});

router.delete('/', auth, (req, res) => {
    Basket.findOneAndDelete({ userId: req.user.userId, ...req.body })
        .then((data) => {
            if (!data)
                return res.status('404').json({ message: 'Товар уже удален' })
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: e.message || 'Произошла ошибка' });
        });
});

export default router;

