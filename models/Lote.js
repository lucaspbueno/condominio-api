const { Model, DataTypes } = require('sequelize');

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