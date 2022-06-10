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
      { name: 'Krusty Krab', description: 'The Krusty Krab, owned by Mr. Eugene Krabs, is home to the world famous Krabby Patty', ownerId: 2, restaurantShelfId: 1, image: 'https://static.wikia.nocookie.net/spongebob/images/6/69/My_Two_Krabses_001.png/revision/latest?cb=20200720150200', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chum Bucket', description: 'The Chum Bucket has as much chummy chum chum as you can eat', ownerId: 5, restaurantShelfId: 2, image: 'https://static.wikia.nocookie.net/spongebob/images/4/43/Karen%27s_Baby_001.png/revision/latest/scale-to-width-down/1200?cb=20190810105708', createdAt: new Date(), updatedAt: new Date() },
      { name: 'La Ratatouille', description: 'The finest establishment ran by rats in Paris', ownerId: 11, restaurantShelfId: 2, image: 'https://static.wikia.nocookie.net/spongebob/images/4/43/Karen%27s_Baby_001.png/revision/latest/scale-to-width-down/1200?cb=20190810105708', createdAt: new Date(), updatedAt: new Date() },
      { name: 'The Mad Hatter\'s Tea House', description: 'A terrific time for tea', ownerId: 12, restaurantShelfId: 2, image: 'https://static.wikia.nocookie.net/disney/images/1/1d/Tea_Party_Garden_%28Art%29.png/revision/latest?cb=20130717195016', createdAt: new Date(), updatedAt: new Date() },
      { name: "Tony's", description: 'A little slice of Italy', ownerId: 13, restaurantShelfId: 2, image: 'https://static.wikia.nocookie.net/disney/images/3/3b/Tony%27satDay.jpg/revision/latest/top-crop/width/360/height/360?cb=20121108170159', createdAt: new Date(), updatedAt: new Date() },
      { name: "HarryHausen's", description: 'An exquisite collection of seafood and delight', ownerId: 14, restaurantShelfId: 2, image: 'https://static.wikia.nocookie.net/disney/images/5/5e/Harryhausen%27s.jpg/revision/latest?cb=20180308213906', createdAt: new Date(), updatedAt: new Date() },
      { name: "Pizza Planet", description: 'Pizza Pizza Pizza! We got all the pizza!', ownerId: 15, restaurantShelfId: 2, image: 'https://static.wikia.nocookie.net/pixar/images/d/d3/Pizza_Planet2.jpg/revision/latest?cb=20181123080443', createdAt: new Date(), updatedAt: new Date() },
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
