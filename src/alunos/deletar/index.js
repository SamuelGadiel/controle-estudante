const express = require('express');
const router = express.Router();

const fs = require('fs');
const alunos = require('../alunos.json');

deleteStudent = (req) => {
  const { nome } = req.query;

  if (nome) {
    let len = alunos.length;
    let filtrado = alunos.filter(aluno => aluno.nome !== nome);

    if (filtrado.length === len) {
      return [false, "Aluno não encontrado"];
    }


    let data = JSON.stringify(filtrado);

    fs.writeFile(__dirname + '/../alunos.json', data, (err) => {
      if (err) {
        return [false, "Erro ao salvar dados"];
      }

    });

  } else {
    return [false, "Preencha todos os dados"];

  }
  return [true, "Deletado com Sucesso!"];
}


router.get('/', (req, res) => {
  let created = deleteStudent(req);

  created[0] ? res.status(200) : res.status(400);

  res.json({
    status: res.statusCode,
    message: created[1]
  });

});

module.exports = router;
