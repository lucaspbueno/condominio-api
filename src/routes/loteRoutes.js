const express = require('express');
const router = express.Router();
const db = require('../models');

/**
 * @swagger
 * /lotes:
 *   get:
 *     summary: Retorna todos os lotes
 *     tags: [Lotes]
 *     responses:
 *       200:
 *         description: Lista de lotes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lote'
 *       500:
 *         $ref: '#/components/responses/Error'
 */
router.get('/', async (req, res) => {
  try {
    const lotes = await db.Lote.findAll({
      include: {
        model: db.Boleto,
        as: 'boletos'
      }
    });
    return res.status(200).json(lotes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /lotes/{id}:
 *   get:
 *     summary: Retorna um lote específico
 *     tags: [Lotes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do lote
 *     responses:
 *       200:
 *         description: Detalhes do lote
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lote'
 *       404:
 *         description: Lote não encontrado
 *       500:
 *         $ref: '#/components/responses/Error'
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const lote = await db.Lote.findByPk(id, {
      include: {
        model: db.Boleto,
        as: 'boletos'
      }
    });
    
    if (!lote) {
      return res.status(404).json({ error: 'Lote não encontrado' });
    }
    
    return res.status(200).json(lote);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /lotes:
 *   post:
 *     summary: Cria um novo lote
 *     tags: [Lotes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do lote
 *               ativo:
 *                 type: boolean
 *                 description: Status do lote
 *     responses:
 *       201:
 *         description: Lote criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lote'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         $ref: '#/components/responses/Error'
 */
router.post('/', async (req, res) => {
  try {
    const { nome, ativo } = req.body;
    
    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }
    
    const lote = await db.Lote.create({
      nome,
      ativo: ativo !== undefined ? ativo : true
    });
    
    return res.status(201).json(lote);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;