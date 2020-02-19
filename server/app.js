const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const port = config.get('port') || 3000;
const database = config.get('database');

const app = express();

app.use('/api/auth', require('./routes/auth'));

mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.listen(port, () => console.log(`Сервер запущен на порту: ${port}`));