/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bookings', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    car_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    booking_datetime_start: {
      type: DataTypes.DATE,
      allowNull: true
    },
    booking_datetime_end: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    rm_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'bookings'
  });
};
