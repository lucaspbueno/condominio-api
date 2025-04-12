const express = require('express');
const router = express.Router();
const boletoController = require('../controllers/boletoController');
const upload = require('../middlewares/uploadMiddleware');

/**
 * @swagger
 * /boletos:
 *   get:
 *     summary: Retorna todos os boletos
 *     tags: [Boletos]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome do sacado para filtrar
 *       - in: query
 *         name: valor_inicial
 *         schema:
 *           type: number
 *         description: Valor inicial para filtro
 *       - in: query
 *         name: valor_final
 *         schema:
 *           type: number
 *         description: Valor final para filtro
 *       - in: query
 *         name: id_lote
 *         schema:
 *           type: integer
 *         description: ID do lote para filtro
 *       - in: query
 *         name: relatorio
 *         schema:
 *           type: string
 *           enum: ['0', '1']
 *         description: Gerar relatório em PDF (1 = sim)
 *     responses:
 *       200:
 *         description: Lista de boletos ou relatório em PDF
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: array
 *                   items:
 *                     $ref: '#/components/schemas/Boleto'
 *                 - type: object
 *                   properties:
 *                     base64:
 *                       type: string
 *                       description: Relatório PDF em formato base64
 *       500:
 *         $ref: '#/components/responses/Error'
 */
router.get('/', boletoController.index);

/**
 * @swagger
 * /boletos/import/csv:
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         $ref: '#/components/responses/Error'
 */
router.post('/import/csv', upload.single('file'), boletoController.importCSV);

/**
 * @swagger
 * /boletos/import/pdf:
 *   post:
 *     summary: Importa e processa boletos de um arquivo PDF
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
 *                 description: Arquivo PDF com os boletos
 *     responses:
 *       201:
 *         description: PDF processado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 files:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       boletoId:
 *                         type: integer
 *                       filePath:
 *                         type: string
 *                       nome_sacado:
 *                         type: string
 *       400:
 *         description: Nenhum arquivo foi enviado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         $ref: '#/components/responses/Error'
 */
router.post('/import/pdf', upload.single('file'), boletoController.importPDF);

module.exports = router;