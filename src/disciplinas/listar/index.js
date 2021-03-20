const express = require('express');
const router = express.Router();

const disciplinas = require('../disciplinas.json');

router.get('/', (req, res) => {

  res.json(disciplinas);

});

module.exports = router;
