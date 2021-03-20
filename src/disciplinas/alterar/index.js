const express = require('express');
const router = express.Router();

const fs = require('fs');
const disciplinas = require('../disciplinas.json');

modifySubject = (req) => {
  const { nome, professor } = req.query;

  if (nome && professor) {

    let disciplina = disciplinas.find(item => item.nome === nome);

    if (disciplina) {
      disciplina.professor = professor;
    } else {
      return [false, "Disciplina não encontrada"];
    }

    let data = JSON.stringify(disciplinas);

    fs.writeFile(__dirname + '/../disciplinas.json', data, (err) => {
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
  let created = modifySubject(req);

  created[0] ? res.status(200) : res.status(400);

  res.json({
    status: res.statusCode,
    message: created[1]
  });

});

module.exports = router;
