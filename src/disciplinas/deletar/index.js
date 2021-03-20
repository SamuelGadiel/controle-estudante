const express = require('express');
const router = express.Router();

const fs = require('fs');
const disciplinas = require('../disciplinas.json');

deleteSubject = (req) => {
  const { nome } = req.query;

  if (nome) {
    let len = disciplinas.length;
    let filtrado = disciplinas.filter(item => item.nome !== nome);

    if (filtrado.length === len) {
      return [false, "Disciplina não encontrada"];
    }


    let data = JSON.stringify(filtrado);

    fs.writeFile(__dirname + '/../disciplinas.json', data, (err) => {
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
  let created = deleteSubject(req);

  created[0] ? res.status(200) : res.status(400);

  res.json({
    status: res.statusCode,
    message: created[1]
  });

});

module.exports = router;
