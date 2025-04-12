const fs = require('fs');
const { parse } = require('csv-parse');
const db = require('../models');

/**
 * Processa um arquivo CSV com boletos
 * @param {string} filePath - Caminho do arquivo CSV
 * @returns {Promise<Array>} - Array com os boletos importados
 */
const processBoletosCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    const boletos = [];
    
    fs.createReadStream(filePath)
      .pipe(parse({
        delimiter: ';',
        columns: true,
        trim: true
      }))
      .on('data', async (item) => {
        boletos.push(item);
      })
      .on('end', async () => {
        try {
          const importedBoletos = [];
          
          for (const item of boletos) {
            // Verificar se o lote existe
            let lote = await db.Lote.findOne({
              where: { nome: `00${item.unidade}` }
            });
            
            // Se o lote não existir, cria um novo
            if (!lote) {
              lote = await db.Lote.create({
                nome: `00${item.unidade}`,
                ativo: true
              });
            }
            
            // Criar o boleto
            const boleto = await db.Boleto.create({
              nome_sacado: item.nome,
              id_lote: lote.id,
              valor: parseFloat(item.valor),
              linha_digitavel: item.linha_digitavel,
              ativo: true
            });
            
            importedBoletos.push(boleto);
          }
          
          resolve(importedBoletos);
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

module.exports = {
  processBoletosCSV
};