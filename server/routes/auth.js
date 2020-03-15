import { Router } from 'express';
import { hashSync, compareSync } from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import config from 'config';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

const router = Router();

router.post(
    '/register',
    [
        check('login', 'Минимальная длина 7 символов').isLength({ min: 7 }),
        check('password', 'Минимальная длина 7 символов').isLength({ min: 7 })
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Неккоректные данные',
                errors: errors.array()
            });
        }
        const { login, password, isAdmin } = req.body;
        User.findOne({ login: login })
            .then((data) => {
                if (data) {
                    return res.status(400).json({ message: 'Пользователь уже существует' });
                }
                new User({
                    login: login,
                    password: hashSync(password, 8),
                    isAdmin: isAdmin,
                }).save();
                return res.status(201).json({ message: 'Пользователь зарегестрирован' })
            })
            .catch((e) => {
                return res.status(500).json({ message: 'Произошла ошибка' });
            });
    });

router.post(
    '/login',
    [
        check('login', 'Минимальная длина 7 символов').isLength({ min: 7 }),
        check('password', 'Минимальная длина 7 символов').isLength({ min: 7 })
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Неккоректные данные',
                errors: errors.array()
            });
        }
        const { login, password } = req.body;
        User.findOne({ login: login })
            .then((data) => {
                if (!data) {
                    return res.status(404).json({ message: 'Пользователь не найден' });
                }
                if (compareSync(password, data.password)) {
                    const token = sign({ userId: data.id }, config.get('secret'), { expiresIn: '1h' });
                    return res.json({ token, userId: data.id, isAdmin: data.isAdmin });
                }
                return res.status(401).json({ message: 'Неверный пароль' });
            })
            .catch((e) => {
                return res.status(500).json({ message: 'Произошла ошибка' });
            });
    });

export default router;