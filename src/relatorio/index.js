const express = require('express');
const router = express.Router();

const alunos = require('../alunos/alunos.json');

analyzeGrades = () => {

  alunos.forEach((aluno) => {

    if (aluno.notas.length > 0) {

      aluno.notas.forEach(item => {
        parseFloat(item.nota) >= 60.0 ? item.resultado = "Aprovado" : item.resultado = "Reprovado";
      });

    }

  });

}

router.get('/', (req, res) => {
  analyzeGrades();

  res.json(alunos);

});

module.exports = router;
