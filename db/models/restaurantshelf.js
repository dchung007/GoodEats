'use strict';
module.exports = (sequelize, DataTypes) => {
  const RestaurantShelf = sequelize.define('RestaurantShelf', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Restaurants'}
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  RestaurantShelf.associate = function(models) {
    // associations can be defined here
    RestaurantShelf.hasMany(models.Restaurant, {foreignKey:'restaurantId', onDelete:'CASCADE', hooks: true});
  };
  return RestaurantShelf;
};
