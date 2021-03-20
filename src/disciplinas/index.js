const express = require('express');
const router = express.Router();

const criar = require('./criar');
const alterar = require('./alterar');
const listar = require('./listar');
const deletar = require('./deletar');

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/criar', criar);
router.use('/alterar', alterar);
router.use('/listar', listar);
router.use('/deletar', deletar);

module.exports = router;
