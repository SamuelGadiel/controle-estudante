const express = require('express');
const router = express.Router();

const Joi = require('@hapi/joi');
const monk = require('monk');

const { MONGO_URL } = require('../env');

// Conectando ao mongo e pegando a coleção "disciplinas"
const db = monk(MONGO_URL);
const disciplinasDB = db.get('disciplinas');


// Criando um esquema de validação dos dados recebidos
const schema = Joi.object({
  materia: Joi.string().trim().required(),
  professor: Joi.string().trim().required(),
});

// Listando todos as disciplinas cadastradas
router.get('/', async (req, res, next) => {
  try {
    const disciplinas = await disciplinasDB.find({});
    res.json(disciplinas);

  } catch (error) {
    next(error);
  }
});

// Criando uma disciplina, passando materia e professor
router.post('/', async (req, res, next) => {
  try {

    const value = await schema.validateAsync(req.query);
    const inserted = await disciplinasDB.insert(value);

    res.json(inserted);

  } catch (error) {
    next(error)
  }
})

// Alterando uma disciplina. Dado uma materia altera-se o professor.
router.put('/', async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.query);

    const { materia } = req.query;
    const item = await disciplinasDB.findOne({ materia: materia });

    if (!item) return next();

    await disciplinasDB.update({
      materia: materia,
    }, { $set: value });

    res.json(value);

  } catch (error) {
    next(error);
  }
})

// Deletando um disciplina a partir do nome da materia
router.delete('/', async (req, res, next) => {
  try {
    const { materia } = req.query;

    const result = await disciplinasDB.remove({ materia: materia });

    if (result.deletedCount === 0) return next();

    res.json({
      message: 'success'
    })

  } catch (error) {
    next(error);
  }
})

module.exports = router;
