'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING.BINARY,
      allowNull: false
    },
    restaurantShelfId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    restaurantOwnerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.Restaurant, {foreignKey: 'ownerId'});
    User.hasOne(models.RestaurantShelf, {foreignKey: 'userId'});
  };
  return User;
};
