/**
 * @swagger
 * components:
 *   schemas:
 *     Boleto:
 *       type: object
 *       required:
 *         - nome_sacado
 *         - id_lote
 *         - valor
 *         - linha_digitavel
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do boleto
 *         nome_sacado:
 *           type: string
 *           description: Nome do sacado
 *         id_lote:
 *           type: integer
 *           description: ID do lote associado
 *         valor:
 *           type: number
 *           format: float
 *           description: Valor do boleto
 *         linha_digitavel:
 *           type: string
 *           description: Linha digitável do boleto
 *         ativo:
 *           type: boolean
 *           description: Status do boleto
 *         criado_em:
 *           type: string
 *           format: date-time
 *           description: Data de criação
 *       example:
 *         id: 1
 *         nome_sacado: "JOSE DA SILVA"
 *         id_lote: 17
 *         valor: 182.54
 *         linha_digitavel: "123456123456123456"
 *         ativo: true
 *         criado_em: "2023-04-12T10:00:00Z"
 */
module.exports = (sequelize, DataTypes) => {
  const Boleto = sequelize.define('Boleto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome_sacado: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    id_lote: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'lotes',
        key: 'id'
      }
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    linha_digitavel: {
      type: DataTypes.STRING(255),
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
    tableName: 'boletos',
    timestamps: false
  });

  Boleto.associate = function(models) {
    Boleto.belongsTo(models.Lote, {
      foreignKey: 'id_lote',
      as: 'lote'
    });
  };

  return Boleto;
};