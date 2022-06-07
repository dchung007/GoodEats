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
    return queryInterface.bulkInsert('Users', [
      { username: 'Spongebob', password: 'Squarepants', restaurantOwnerId: '1', createdAt: new Date(), updatedAt: new Date() },
      { username: 'Eugene', password: 'Krabs', restaurantOwnerId: '2', createdAt: new Date(), updatedAt: new Date() },
      { username: 'Patrick', password: 'Star', restaurantOwnerId: '1', createdAt: new Date(), updatedAt: new Date() },
      { username: 'Sandy', password: 'Cheeks', restaurantOwnerId: '1', createdAt: new Date(), updatedAt: new Date() },
      { username: 'Sheldon', password: 'Plankton', restaurantOwnerId: '3', createdAt: new Date(), updatedAt: new Date() },
      { username: 'Squidward', password: 'Tentacles', restaurantOwnerId: '1', createdAt: new Date(), updatedAt: new Date() },
      { username: 'Squilliam', password: 'Fancyson', restaurantOwnerId: '1', createdAt: new Date(), updatedAt: new Date() },
      { username: 'Gary', password: 'theSnail', restaurantOwnerId: '1', createdAt: new Date(), updatedAt: new Date() },
      { username: 'Pearl', password: 'Krabs', restaurantOwnerId: '1', createdAt: new Date(), updatedAt: new Date() },
      { username: 'Larry', password: 'theLobster', restaurantOwnerId: '1', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
