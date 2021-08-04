/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('car', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    car_license_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      unique: true
    },
    manufacturer: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    model: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    base_price: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    security: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    currency: {
      type: DataTypes.ENUM('INR','USD'),
      allowNull: false,
      defaultValue: 'INR'
    },
    rm_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'car'
  });
};
