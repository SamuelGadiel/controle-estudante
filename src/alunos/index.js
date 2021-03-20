const express = require('express');
const router = express.Router();

const criar = require('./criar');
const alterar = require('./alterar');
const listar = require('./listar');
const deletar = require('./deletar');
const nota_materia = require('./nota-materia');

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/criar', criar);
router.use('/alterar', alterar);
router.use('/listar', listar);
router.use('/deletar', deletar);
router.use('/nota-materia', nota_materia);

module.exports = router;
