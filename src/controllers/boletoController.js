const { processBoletosCSV } = require('../utils/csvProcessor');
const db = require('../models');

class BoletoController {
  // Listar todos os boletos
  async index(req, res) {
    try {
      const boletos = await db.Boleto.findAll({
        include: {
          model: db.Lote,
          as: 'lote'
        }
      });
      
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
}

module.exports = new BoletoController();