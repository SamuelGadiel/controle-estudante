const express = require('express');
const router = express.Router();

const Joi = require('@hapi/joi');
const monk = require('monk');

const { MONGO_URL } = require('../env');

// Conectando ao mongo e pegando a coleção "alunos"
const db = monk(MONGO_URL);
const alunosDB = db.get('alunos');

// Lista todos os alunos cadastrados
router.get('/', async (req, res, next) => {
  try {
    const alunos = await alunosDB.find({});

    alunos.forEach((aluno) => {

      if (aluno.notas) {

        aluno.notas.forEach(materia => {
          parseFloat(materia.nota) >= 60.0
            ? materia.resultado = "Aprovado"
            : materia.resultado = "Reprovado";
        });

      }

    });

    res.json(alunos);

  } catch (error) {
    next(error);
  }
});

module.exports = router;
