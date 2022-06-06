'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: {
      type: DataTypes.STRING (255),
      allowNull: false
    },
    ownerId: {
      type: DataTypes.INTEGER,
      references: {model: 'Owners'}
    }
  }, {});
  Restaurant.associate = function(models) {
    // associations can be defined here
    Restaurant.belongsTo(models.RestaurantShelf, {foreignkey: 'restaurantId'});
    Restaurant.hasMany(models.MenuItem, {foreignKey:'restaurantId', onDelete:'CASCADE', hooks: true});
    Restaurant.hasMany(models.Review, {foreignKey:'restaurantId', onDelete:'CASCADE', hooks: true});
  };
  return Restaurant
};
