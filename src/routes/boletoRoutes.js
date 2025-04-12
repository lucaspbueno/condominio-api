const express = require('express');
const router = express.Router();
const boletoController = require('../controllers/boletoController');
const upload = require('../middlewares/uploadMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Boleto:
 *       type: object
 *       required:
 *         - nome_sacado
 *         - id_lote
 *         - valor
 *         - linha_digitavel
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do boleto
 *         nome_sacado:
 *           type: string
 *           description: Nome do sacado
 *         id_lote:
 *           type: integer
 *           description: ID do lote associado
 *         valor:
 *           type: number
 *           format: float
 *           description: Valor do boleto
 *         linha_digitavel:
 *           type: string
 *           description: Linha digitável do boleto
 *         ativo:
 *           type: boolean
 *           description: Status do boleto
 *         criado_em:
 *           type: string
 *           format: date-time
 *           description: Data de criação
 */

/**
 * @swagger
 * /api/boletos:
 *   get:
 *     summary: Retorna todos os boletos
 *     tags: [Boletos]
 *     responses:
 *       200:
 *         description: Lista de boletos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Boleto'
 */
router.get('/', boletoController.index);

/**
 * @swagger
 * /api/boletos/import/csv:
 *   post:
 *     summary: Importa boletos de um arquivo CSV
 *     tags: [Boletos]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo CSV com os dados dos boletos
 *     responses:
 *       201:
 *         description: Boletos importados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 boletos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Boleto'
 *       400:
 *         description: Nenhum arquivo foi enviado
 *       500:
 *         description: Erro no servidor
 */
router.post('/import/csv', upload.single('file'), boletoController.importCSV);

module.exports = router;