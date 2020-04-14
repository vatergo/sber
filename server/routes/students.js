import { Router } from 'express';
import Student from '../models/Student';

const router = Router();

router.get('/', (req, res) => {
    Student.find()
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: 'Произошла ошибка' });
        });
});

router.get('/filter', (req, res) => {
    Student.find(req.query)
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: 'Произошла ошибка' });
        });
});

router.post('/', (req, res) => {
    new Student(req.body)
        .save()
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: e.message || 'Произошла ошибка' });
        });
});

router.patch('/', (req, res) => {
    Student.findOneAndUpdate({ _id: req.body._id }, req.body)
        .then((data) => {
            if (!data)
                return res.status('404').json({ message: 'Нет такого студента' })
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: 'Произошла ошибка' });
        });
});

router.delete('/', (req, res) => {
    Student.findOneAndDelete({ _id: req.body._id })
        .then((data) => {
            if (!data)
                return res.status('404').json({ message: 'Студент уже удалена' })
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json({ message: 'Произошла ошибка' });
        });
});

export default router;

