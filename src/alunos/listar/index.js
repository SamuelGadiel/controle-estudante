const express = require('express');
const router = express.Router();

const alunos = require('../alunos.json');

router.get('/', (req, res) => {

  res.json(alunos);

});

module.exports = router;
