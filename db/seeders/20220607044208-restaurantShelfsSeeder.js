'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('RestaurantShelfs', [
      { name: "Spongebob's List", restaurantId: 1, status: true, userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: "Spongebob's List", restaurantId: 2, status: false, userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: "Patrick's List", restaurantId: 1, status: true, userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: "Patrick's List", restaurantId: 2, status: true, userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: "Sandy's List", restaurantId: 1, status: false, userId: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: "Sandy's List", restaurantId: 2, status: false, userId: 4, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('RestaurantShelfs', null, {});
  }
};
