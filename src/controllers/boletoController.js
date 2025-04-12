const { processBoletosCSV } = require('../utils/csvProcessor');
const { processBoletosPDF, generateBoletosReport } = require('../utils/pdfProcessor');
const { Op } = require('sequelize');
const db = require('../models');

class BoletoController {
  // Listar todos os boletos com filtros
  async index(req, res) {
    try {
      const { nome, valor_inicial, valor_final, id_lote, relatorio } = req.query;
      
      // Construir condições de filtro
      const whereConditions = {};
      
      if (nome) {
        whereConditions.nome_sacado = {
          [Op.iLike]: `%${nome}%` // Case insensitive
        };
      }
      
      if (valor_inicial) {
        whereConditions.valor = {
          ...whereConditions.valor,
          [Op.gte]: parseFloat(valor_inicial)
        };
      }
      
      if (valor_final) {
        whereConditions.valor = {
          ...whereConditions.valor,
          [Op.lte]: parseFloat(valor_final)
        };
      }
      
      if (id_lote) {
        whereConditions.id_lote = id_lote;
      }
      
      // Buscar boletos com os filtros
      const boletos = await db.Boleto.findAll({
        where: whereConditions,
        include: {
          model: db.Lote,
          as: 'lote'
        }
      });
      
      // Se foi solicitado relatório, gerar PDF
      if (relatorio === '1') {
        const pdfBuffer = await generateBoletosReport(boletos);
        const base64 = pdfBuffer.toString('base64');
        
        return res.status(200).json({ base64 });
      }
      
      return res.status(200).json(boletos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  // Importar boletos de um arquivo CSV
  async importCSV(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo foi enviado' });
      }
      
      const filePath = req.file.path;
      const importedBoletos = await processBoletosCSV(filePath);
      
      return res.status(201).json({
        message: `${importedBoletos.length} boletos importados com sucesso`,
        boletos: importedBoletos
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  // Importar boletos de um arquivo PDF
  async importPDF(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo PDF foi enviado' });
      }
      
      const filePath = req.file.path;
      const generatedFiles = await processBoletosPDF(filePath);
      
      return res.status(201).json({
        message: `PDF processado com sucesso. ${generatedFiles.length} arquivos gerados.`,
        files: generatedFiles
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BoletoController();