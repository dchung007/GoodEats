'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ownerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    restaurantShelfId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'RestaurantShelfs' }
    },
  }, {});
  Restaurant.associate = function (models) {
    // associations can be defined here
    Restaurant.belongsTo(models.RestaurantShelf, { foreignKey: 'restaurantShelfId' });
    Restaurant.hasMany(models.MenuItem, { foreignKey: 'restaurantId', onDelete: 'CASCADE', hooks: true });
    Restaurant.hasMany(models.Review, { foreignKey: 'restaurantId', onDelete: 'CASCADE', hooks: true });
    Restaurant.belongsTo(models.User, { foreignKey: 'ownerId' });
  };
  return Restaurant
};
