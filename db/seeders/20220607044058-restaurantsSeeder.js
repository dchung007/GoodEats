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
    return queryInterface.bulkInsert('Restaurants', [
      { name: 'Krusty Krab', description: 'The Krusty Krab, owned by Mr. Eugene Krabs, is home to the world famous Krabby Patty', ownerId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chum Bucket', description: 'The Chum Bucket has as much chummy chum chum as you can eat', ownerId: 5, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Restaurants', null, {});
  }
};
