import { Router } from 'express';
import Сategory from '../models/Сategory';

const router = Router();

router.get('/', (req, res) => {
    Сategory.find()
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: 'Произошла ошибка' });
        });
});

router.post('/', (req, res) => {
    new Сategory(req.body)
        .save()
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: e.message || 'Произошла ошибка' });
        });
});

router.patch('/', (req, res) => {
    Сategory.findOneAndUpdate({ _id: req.body._id }, req.body)
        .then((data) => {
            if (!data)
                return res.status('404').json({ message: 'Нет такой категории' })
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: 'Произошла ошибка' });
        });
});

router.delete('/', (req, res) => {
    Сategory.findOneAndDelete({ _id: req.body._id })
        .then((data) => {
            if (!data)
                return res.status('404').json({ message: 'Категория товаров уже удалена' })
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: 'Произошла ошибка' });
        });
});

export default router;

