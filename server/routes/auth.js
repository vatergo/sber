import { Router } from 'express';
import { hashSync, compareSync } from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import config from 'config';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

const router = Router();

router.get('/', (req, res) => {
    User.find() //Получаем все продукты из БД
        .then((data) => {
            res.json(data); //отправляем их клиенту
        })
        .catch((e) => {//если произошла какая-то ошибка, отвечаем статусом 500 и сообщением
            res.status(500).json({ message: 'Произошла ошибка' });
        });
});

router.post(
    '/register',
    [
        check('login', 'Минимальная длина 7 символов').isLength({ min: 7 }), //Проверка логина на длину
        check('password', 'Минимальная длина 7 символов').isLength({ min: 7 }) //Проверка пароля на длину
    ],
    (req, res) => {
        const errors = validationResult(req); //Если валидация по длине не пройдена
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Неккоректные данные', //То сервер отвечает статусом 400 с сообщением: Неккоректные данные
                errors: errors.array()
            });
        }
        const { login, password, isAdmin } = req.body; // Достаем данные из тела принятого запроса
        User.findOne({ login: login }) //Ищем в базе пользователя с переданным логином
            .then((data) => {
                if (data) { //Если пользователь с таким логином уже существует, отвечаем статусом 400 и сообщением
                    return res.status(400).json({ message: 'Пользователь уже существует' });
                }
                new User({ //Если такого пользователя нет, то создаем
                    login: login,
                    password: hashSync(password, 8), //Предварительно захешировав его пароль
                    isAdmin: isAdmin,
                }).save(); //сохраняем данные в БД и отвечаем, что пользователь создан
                return res.status(201).json({ message: 'Пользователь зарегестрирован' })
            })
            .catch((e) => { // Если произошла какая-то ошибка, отвечаем статусом 500 и сообщением ниже
                return res.status(500).json({ message: 'Произошла ошибка' });
            });
    });

router.post(
    '/login',
    [
        check('login', 'Минимальная длина 7 символов').isLength({ min: 7 }), //Проверка логина на длину
        check('password', 'Минимальная длина 7 символов').isLength({ min: 7 }) //Проверка пароля на длину
    ],
    (req, res) => {
        const errors = validationResult(req); //Если валидация по длине не пройдена
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Неккоректные данные', //То сервер отвечает статусом 400 с сообщением: Неккоректные данные
                errors: errors.array()
            });
        }
        const { login, password } = req.body; // Достаем данные из тела принятого запроса
        User.findOne({ login: login }) //Ищем в базе пользователя с переданным логином
            .then((data) => {
                if (!data) { //Если пользователь с таким логином не найден, отвечаем статусом 404 и сообщением ниже
                    return res.status(404).json({ message: 'Пользователь не найден' });
                }
                if (compareSync(password, data.password)) { //Если пользователь найден, сравниваем хеши паролей
                    const token = sign({ userId: data.id }, config.get('secret'), { expiresIn: '1h' });
                    return res.json({ token, userId: data.id, isAdmin: data.isAdmin }); //отправляем на клиент токен
                }
                return res.status(401).json({ message: 'Неверный пароль' }); //Если пароль неверный, отправялем 401
            })
            .catch((e) => { // Если произошла какая-то ошибка, отвечаем статусом 500 и сообщением ниже
                return res.status(500).json({ message: 'Произошла ошибка' });
            });
    });

export default router;