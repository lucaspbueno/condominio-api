'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Criando lotes baseados nas unidades do arquivo CSV (17, 18, 19)
    await queryInterface.bulkInsert('lotes', [
      {
        id: 17,
        nome: 'Lote 17',
        ativo: true,
        criado_em: new Date()
      },
      {
        id: 18,
        nome: 'Lote 18',
        ativo: true,
        criado_em: new Date()
      },
      {
        id: 19,
        nome: 'Lote 19',
        ativo: true,
        criado_em: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('lotes', null, {});
  }
};