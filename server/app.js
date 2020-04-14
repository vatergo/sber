import express, { json } from 'express';
import path from 'path';
import config from 'config';
import { connect } from 'mongoose';
import auth from './routes/auth';
import students from './routes/students';
import info from './routes/info';

const port = process.env.PORT || 3000;
//const port = config.get('port');
const database = config.get('database');

const app = express();

app.use(json());

app.use('/api/auth', auth);
app.use('/api/students', students);
app.use('/api/info', info);

app.use('/', express.static(path.join(__dirname, '../public')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.listen(port, () => console.log(`Сервер запущен на порту: ${port}`));