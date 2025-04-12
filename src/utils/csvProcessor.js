const fs = require('fs');
const { parse } = require('csv-parse');
const db = require('../models');

/**
 * Processa arquivo CSV de boletos e importa para o banco de dados
 * @param {string} filePath - Caminho do arquivo CSV
 * @returns {Promise<Array>} - Array de boletos importados
 */
const processBoletosCSV = async (filePath) => {
  const results = [];
  
  // Criar uma promise para processar o CSV
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(parse({
        delimiter: ';',
        columns: true,
        skip_empty_lines: true
      }))
      .on('data', async (data) => {
        results.push(data);
      })
      .on('end', async () => {
        try {
          // Processar cada linha do CSV
          const importedBoletos = [];
          
          for (const item of results) {
            // Verificar se o lote existe
            let lote = await db.Lote.findByPk(parseInt(item.unidade));
            
            // Se o lote não existir, cria um novo
            if (!lote) {
              lote = await db.Lote.create({
                id: parseInt(item.unidade),
                nome: `Lote ${item.unidade}`,
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