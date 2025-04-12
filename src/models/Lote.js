/**
 * @swagger
 * components:
 *   schemas:
 *     Lote:
 *       type: object
 *       required:
 *         - nome
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
 *       example:
 *         id: 17
 *         nome: "0017"
 *         ativo: true
 *         criado_em: "2023-04-12T10:00:00Z"
 */
module.exports = (sequelize, DataTypes) => {
  const Lote = sequelize.define('Lote', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
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
    tableName: 'lotes',
    timestamps: false
  });

  Lote.associate = function(models) {
    Lote.hasMany(models.Boleto, {
      foreignKey: 'id_lote',
      as: 'boletos'
    });
  };

  return Lote;
};