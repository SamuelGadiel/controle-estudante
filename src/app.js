const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');

const alunos = require('./alunos')
const disciplinas = require('./disciplinas')
const relatorio = require('./relatorio')

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/app.html");
});

app.use('/alunos', alunos);
app.use('/disciplinas', disciplinas);
app.use('/relatorio', relatorio);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
