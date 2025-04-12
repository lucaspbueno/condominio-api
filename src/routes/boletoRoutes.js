const express = require('express');
const router = express.Router();
const boletoController = require('../controllers/boletoController');
const upload = require('../middlewares/uploadMiddleware');

// Rota para listar todos os boletos
router.get('/', boletoController.index);

// Rota para importar boletos de um arquivo CSV
router.post('/import/csv', upload.single('file'), boletoController.importCSV);

module.exports = router;