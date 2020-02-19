import express, { json } from 'express';
import config from 'config';
import { connect } from 'mongoose';
import auth from './routes/auth';

const port = config.get('port') || 3000;
const database = config.get('database');

const app = express();

app.use(json());

app.use('/api/auth', auth);

connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.listen(port, () => console.log(`Сервер запущен на порту: ${port}`));