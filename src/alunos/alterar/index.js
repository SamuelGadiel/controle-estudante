const express = require('express');
const router = express.Router();

const fs = require('fs');
const alunos = require('../alunos.json');

modifyStudent = (req) => {
  const { nome, idade } = req.query;

  if (nome && idade) {

    let selectedAluno = alunos.find(aluno => aluno.nome === nome);

    if (selectedAluno) {
      selectedAluno.idade = idade;
    } else {
      return [false, "Aluno não encontrado"];
    }

    let data = JSON.stringify(alunos);

    fs.writeFile(__dirname + '/../alunos.json', data, (err) => {
      if (err) {
        return [false, "Erro ao salvar dados"];
      }

    });

  } else {
    return [false, "Preencha todos os dados"];

  }
  return [true, "Alterado com sucesso!"];
}


router.get('/', (req, res) => {
  let created = modifyStudent(req);

  created[0] ? res.status(200) : res.status(400);

  res.json({
    status: res.statusCode,
    message: created[1]
  });

});

module.exports = router;
