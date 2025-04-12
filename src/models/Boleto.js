const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Boleto extends Model {
    static associate(models) {
      // Um boleto pertence a um lote
      Boleto.belongsTo(models.Lote, {
        foreignKey: 'id_lote',
        as: 'lote'
      });
    }
  }
  
  Boleto.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
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
    sequelize,
    modelName: 'Boleto',
    tableName: 'boletos',
    timestamps: false
  });
  
  return Boleto;
};