import { Router } from 'express';
import Product from '../models/Product';

const router = Router();

router.get('/', (req, res) => {
    Product.find()
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: 'Произошла ошибка' });
        });
});

router.get('/filter', (req, res) => {
    Product.find(req.query)
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: 'Произошла ошибка' });
        });
});

router.post('/', (req, res) => {
    new Product(req.body)
        .save()
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: 'Произошла ошибка' });
        });
});

router.patch('/', (req, res) => {
    Product.findOneAndUpdate({ _id: req.body._id }, req.body)
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
    Product.findOneAndDelete({ _id: req.body._id })
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

