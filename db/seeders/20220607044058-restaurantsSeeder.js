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
      { name: 'Krusty Krab', description: 'The Krusty Krab, owned by Mr. Eugene Krabs, is home to the world famous Krabby Patty', ownerId: 2, restaurantShelfId: 1, image: 'https://static.wikia.nocookie.net/spongebob/images/6/69/My_Two_Krabses_001.png', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chum Bucket', description: 'The Chum Bucket has as much chummy chum chum as you can eat', ownerId: 5, restaurantShelfId: 2, image: 'https://static.wikia.nocookie.net/spongebob/images/4/43/Karen%27s_Baby_001.png', createdAt: new Date(), updatedAt: new Date() },
      { name: 'La Ratatouille', description: 'The finest establishment ran by rats in Paris', ownerId: 11, restaurantShelfId: 2, image: 'https://static.wikia.nocookie.net/disney/images/8/87/Tumblr_n0k8mjJA9W1qhcrb0o1_1280.jpg', createdAt: new Date(), updatedAt: new Date() },
      { name: 'The Mad Hatter\'s Tea House', description: 'A terrific time for tea', ownerId: 12, restaurantShelfId: 2, image: 'https://static.wikia.nocookie.net/disney/images/1/1d/Tea_Party_Garden_%28Art%29.png', createdAt: new Date(), updatedAt: new Date() },
      { name: "Tony's", description: 'A little slice of Italy', ownerId: 13, restaurantShelfId: 2, image: 'https://static.wikia.nocookie.net/disney/images/3/3b/Tony%27satDay.jpg', createdAt: new Date(), updatedAt: new Date() },
      { name: "HarryHausen's", description: 'An exquisite collection of seafood and delight', ownerId: 14, restaurantShelfId: 2, image: 'https://static.wikia.nocookie.net/disney/images/5/5e/Harryhausen%27s.jpg', createdAt: new Date(), updatedAt: new Date() },
      { name: "Pizza Planet", description: 'Pizza Pizza Pizza! We got all the pizza!', ownerId: 15, restaurantShelfId: 2, image: 'https://static.wikia.nocookie.net/pixar/images/d/d3/Pizza_Planet2.jpg', createdAt: new Date(), updatedAt: new Date() },
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
