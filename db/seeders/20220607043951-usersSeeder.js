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
      { username: 'Spongebob', password: 'Squarepants', isOwner: false, createdAt: new Date(), updatedAt: new Date() },
      { username: 'Eugene', password: 'Krabs', isOwner: true, createdAt: new Date(), updatedAt: new Date() },
      { username: 'Patrick', password: 'Star', isOwner: false, createdAt: new Date(), updatedAt: new Date() },
      { username: 'Sandy', password: 'Cheeks', isOwner: false, createdAt: new Date(), updatedAt: new Date() },
      { username: 'Sheldon', password: 'Plankton', isOwner: true, createdAt: new Date(), updatedAt: new Date() },
      { username: 'Squidward', password: 'Tentacles', isOwner: false, createdAt: new Date(), updatedAt: new Date() },
      { username: 'Squilliam', password: 'Fancyson', isOwner: false, createdAt: new Date(), updatedAt: new Date() },
      { username: 'Gary', password: 'theSnail', isOwner: false, createdAt: new Date(), updatedAt: new Date() },
      { username: 'Pearl', password: 'Krabs', isOwner: false, createdAt: new Date(), updatedAt: new Date() },
      { username: 'Larry', password: 'theLobster', isOwner: false, createdAt: new Date(), updatedAt: new Date() },
      { username: 'Remy', password: 'Remy', isOwner: true, createdAt: new Date(), updatedAt: new Date() },
      { username: 'TheMadHatter', password: 'Alice', isOwner: true, createdAt: new Date(), updatedAt: new Date() },
      { username: 'Tony', password: 'Tony', isOwner: true, createdAt: new Date(), updatedAt: new Date() },
      { username: 'Harry', password: 'Harry', isOwner: true, createdAt: new Date(), updatedAt: new Date() },
      { username: 'Buzz', password: 'Lightyear', isOwner: true, createdAt: new Date(), updatedAt: new Date() },
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
