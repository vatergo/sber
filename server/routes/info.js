import { Router } from 'express';
import Info from '../models/Info';

const router = Router();

router.get('/', (req, res) => {
    Info.find()
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: 'Произошла ошибка' });
        });
});

router.get('/filter', (req, res) => {
    Info.find(req.query)
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: 'Произошла ошибка' });
        });
});

router.post('/', (req, res) => {
    new Info(req.body)
        .save()
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: 'Произошла ошибка' });
        });
});

router.patch('/', (req, res) => {
    Info.findOneAndUpdate({ _id: req.body._id }, req.body)
        .then((data) => {
            if (!data)
                return res.status('404').json({ message: 'Нет такой информации' })
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: 'Произошла ошибка' });
        });
});

router.delete('/', (req, res) => {
    Info.findOneAndDelete({ _id: req.body._id })
        .then((data) => {
            if (!data)
                return res.status('404').json({ message: 'Информация уже удалена' })
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: 'Произошла ошибка' });
        });
});

export default router;

