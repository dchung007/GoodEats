'use strict';
module.exports = (sequelize, DataTypes) => {
  const MenuItem = sequelize.define('MenuItem', {
    name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull:false
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {model: 'Restaurants'}
    },
    image: {
      type: DataTypes.STRING
    },
  }, {});
  MenuItem.associate = function(models) {
    // associations can be defined here
    MenuItem.belongsTo(models.Restaurant, {foreignKey: 'restaurantId'});
  };
  return MenuItem;
};
