const express = require('express');
const router = express.Router();

const fs = require('fs');
const alunos = require('../alunos.json');
const materias = require('../../disciplinas/disciplinas.json');


createGrade = (req) => {
  const { nome, materia, nota } = req.query;

  if (nome && materia && nota) {

    let selectedAluno = alunos.find(item => item.nome === nome);
    let selectedMateria = materias.find(item => item.nome === materia);

    console.log(selectedMateria);

    if (!selectedAluno) {
      return [false, "Aluno não encontrado"];

    } else if (!selectedMateria) {
      return [false, "Matéria não encontrada"]

    } else if (selectedAluno.notas.length === 4) {
      return [false, "Limite de notas excedidas"];

    }

    let valores = {
      materia,
      nota
    };

    selectedAluno.notas.push(valores);

    let data = JSON.stringify(alunos);

    fs.writeFile(__dirname + '/../alunos.json', data, (err) => {
      if (err) {
        return [false, "Erro ao salvar dados"];
      }

    });

  } else {
    return [false, "Preencha todos os dados"];

  }
  return [true, "Criado com sucesso!"];
}


router.get('/', (req, res) => {
  let created = createGrade(req);

  created[0] ? res.status(200) : res.status(400);

  res.json({
    status: res.statusCode,
    message: created[1]
  });

});

module.exports = router;
