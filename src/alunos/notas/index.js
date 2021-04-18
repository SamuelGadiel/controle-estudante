const express = require('express');
const router = express.Router();

const Joi = require('@hapi/joi');
const monk = require('monk');

const { MONGO_URL } = require('../../env');

// Conectando ao mongo e pegando a coleção "disciplinas"
const db = monk(MONGO_URL);
const alunosDB = db.get('alunos');
const disciplinasDB = db.get('disciplinas');


// Criando um esquema de validação dos dados recebidos
const schema = Joi.object({
  nome: Joi.string().trim().required(),
  materia: Joi.string().trim().required(),
  nota: Joi.number().min(0.0).max(100.0).required(),
});

// Criando uma disciplina, passando nome e professor
router.post('/', async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.query);

    const { nome } = value;
    delete value.nome;

    let aluno = await alunosDB.findOne({ nome: nome });
    const disciplina = await disciplinasDB.findOne({ materia: value.materia });

    if (!aluno || !disciplina) return next();

    if (!aluno.notas) {
      aluno = { ...aluno, notas: [value] };
    } else if (aluno.notas.length < 4) {
      aluno.notas.push(value)
    } else {
      let err = new Error(`Reached the maximum number of subjects per student`);
      return next(err);
    }

    console.log(aluno);

    await alunosDB.update({
      nome: nome,
    }, { $set: aluno });


    res.json(aluno);

  } catch (error) {
    next(error)
  }
})

// Alterando uma disciplina. Dado um nome altera-se o professor.
router.put('/', async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.query);

    const { nome } = value;
    delete value.nome;

    let aluno = await alunosDB.findOne({ nome: nome });

    if (!aluno) {
      let err = new Error(`Student not found`);
      return next(err);
    }

    if (!aluno.notas) {
      let err = new Error(`You have to assign a grade to the student before modify it`);
      return next(err);
    }

    let indexMateria = aluno.notas.findIndex(item => item.materia === value.materia);

    if (indexMateria === -1) {
      let err = new Error(`Subject not found`);
      return next(err);
    }

    aluno.notas[indexMateria].nota = value.nota;


    await alunosDB.update({
      nome: nome,
    }, { $set: aluno });


    res.json(aluno);

  } catch (error) {
    next(error)
  }
})

// Deletando um disciplina a partir do nome
router.delete('/', async (req, res, next) => {
  try {
    const value = req.query;

    const { nome } = value;
    delete value.nome;

    let aluno = await alunosDB.findOne({ nome: nome });

    if (!aluno) {
      let err = new Error(`Student not found`);
      return next(err);
    }

    if (!aluno.notas) {
      let err = new Error(`You have to assign a grade to the student before delete it`);
      return next(err);
    }

    let indexMateria = aluno.notas.findIndex(item => item.materia === value.materia);

    if (indexMateria === -1) {
      let err = new Error(`Subject not found`);
      return next(err);
    }

    aluno.notas.splice(indexMateria, 1);

    await alunosDB.update({
      nome: nome,
    }, { $set: aluno });


    res.json(aluno);

  } catch (error) {
    next(error)
  }
})

module.exports = router;
