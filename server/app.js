import express, { json } from 'express';
import path from 'path';
import config from 'config';
import { connect } from 'mongoose';
import auth from './routes/auth';
import сategories from './routes/сategories';
import products from './routes/products';

const port = process.env.PORT;
const database = config.get('database');

const app = express();

app.use(json());

app.use('/api/auth', auth);
app.use('/api/categories', сategories);
app.use('/api/products', products);

app.use('/', express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.listen(port, () => console.log(`Сервер запущен на порту: ${port}`));