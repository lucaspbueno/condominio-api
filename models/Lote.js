const { Model, DataTypes } = require('sequelize');

/**
 * @swagger
 * components:
 *   schemas:
 *     Lote:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do lote
 *         nome:
 *           type: string
 *           description: Nome do lote
 *         ativo:
 *           type: boolean
 *           description: Status do lote
 *         criado_em:
 *           type: string
 *           format: date-time
 *           description: Data de criação
 */
module.exports = (sequelize) => {
  class Lote extends Model {
    static associate(models) {
      // Um lote pode ter vários boletos
      Lote.hasMany(models.Boleto, {
        foreignKey: 'id_lote',
        as: 'boletos'
      });
    }
  }
  
  Lote.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    criado_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Lote',
    tableName: 'lotes',
    timestamps: false
  });
  
  return Lote;
};