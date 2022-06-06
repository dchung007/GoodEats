'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Restaurants'}
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Users'}
    },
    review: {
      type: DataTypes.TEXT,
      allowNull:false
    }
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.Restaurant, {foreignKey: 'restaurantId'});
    Review.belongsTo(models.User, {foreignKey: 'userId'});
  };
  return Review;
};
