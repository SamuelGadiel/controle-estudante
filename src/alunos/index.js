const express = require('express');
const router = express.Router();
const notas = require('./notas')

const Joi = require('@hapi/joi');
const monk = require('monk');

const { MONGO_URL } = require('../env');

// Conectando ao mongo e pegando a coleção "alunos"
const db = monk(MONGO_URL);
const alunosDb = db.get('alunos');


// Criando um esquema de validação dos dados recebidos
const schema = Joi.object({
  nome: Joi.string().trim().required(),
  idade: Joi.number().integer().positive().required(),
});

// Lista todos os alunos cadastrados
router.get('/', async (req, res, next) => {
  try {
    const alunos = await alunosDb.find({});
    res.json(alunos);

  } catch (error) {
    next(error);
  }
});

// Criando um aluno, passando nome e idade
router.post('/', async (req, res, next) => {
  try {

    const value = await schema.validateAsync(req.query);
    const inserted = await alunosDb.insert(value);

    res.json(inserted);

  } catch (error) {
    next(error)
  }
})

// Alterando um aluno. Dado um nome altera-se a idade.
router.put('/', async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.query);

    const { nome } = req.query;
    const item = await alunosDb.findOne({ nome: nome });

    if (!item) return next();

    await alunosDb.update({
      nome: nome,
    }, { $set: value });

    res.json(value);

  } catch (error) {
    next(error);
  }
})

// Deletando um aluno a partir do nome
router.delete('/', async (req, res, next) => {
  try {
    const { nome } = req.query;

    const result = await alunosDb.remove({ nome: nome });

    if (result.deletedCount === 0) return next();

    res.json({
      message: 'success'
    })

  } catch (error) {
    next(error);
  }
})

router.use('/notas', notas);

module.exports = router;
