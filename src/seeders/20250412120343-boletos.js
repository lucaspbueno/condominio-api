'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Criando boletos baseados no exemplo do CSV
    await queryInterface.bulkInsert('boletos', [
      {
        nome_sacado: 'JOSE DA SILVA',
        id_lote: 17,
        valor: 182.54,
        linha_digitavel: '123456123456123456',
        ativo: true,
        criado_em: new Date()
      },
      {
        nome_sacado: 'MARCOS ROBERTO',
        id_lote: 18,
        valor: 178.20,
        linha_digitavel: '123456123456123456',
        ativo: true,
        criado_em: new Date()
      },
      {
        nome_sacado: 'MARCIA CARVALHO',
        id_lote: 19,
        valor: 128.00,
        linha_digitavel: '123456123456123456',
        ativo: true,
        criado_em: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('boletos', null, {});
  }
};