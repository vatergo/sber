import jwt from 'jsonwebtoken';
import config from 'config';

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') return next();
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Нет авторизации' });
        }
        const decoded = jwt.verify(token, config.get('secret'));
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Нет авторизации' });
    }
}