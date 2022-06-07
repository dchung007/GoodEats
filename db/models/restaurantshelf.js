'use strict';
module.exports = (sequelize, DataTypes) => {
  const RestaurantShelf = sequelize.define('RestaurantShelf', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Users'}
    }
  }, {});
  RestaurantShelf.associate = function(models) {
    // associations can be defined here
    RestaurantShelf.hasMany(models.Restaurant, {foreignKey:'restaurantShelfId', onDelete:'CASCADE', hooks: true});
    RestaurantShelf.belongsTo(models.User, {foreignKey: 'userId'});
  };
  return RestaurantShelf;
};
