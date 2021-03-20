const express = require('express');
const router = express.Router();

const fs = require('fs');
const alunos = require('../alunos.json');

createStudent = (req) => {
  const { nome, idade } = req.query;
  console.log(nome);
  console.log(idade);

  if (nome && idade) {

    let aluno = {
      nome,
      idade,
      "notas": [],
    };

    alunos.push(aluno);

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
  let created = createStudent(req);
  console.log(created);

  created[0] ? res.status(200) : res.status(400);

  res.json({
    status: res.statusCode,
    message: created[1]
  });

});

module.exports = router;
