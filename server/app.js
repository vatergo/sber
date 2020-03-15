import express, { json } from 'express';
import config from 'config';
import { connect } from 'mongoose';
import auth from './routes/auth';
import сategories from './routes/сategories';
import products from './routes/products';

const port = process.env.PORT;
const database = config.get('database');

const app = express();

app.use(json());

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname + '/public/'));

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
    res.sendFile(__dirname.substring(0, __dirname.lastIndexOf('\\')) + '/public/' + 'index.html');
});

app.use('/api/auth', auth);
app.use('/api/categories', сategories);
app.use('/api/products', products);

connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.listen(port, () => console.log(`Сервер запущен на порту: ${port}`));