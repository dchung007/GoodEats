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
    return queryInterface.bulkInsert('Reviews', [
      { restaurantId: 1, userId: 1, review: "The best place ever- home to the... KRABBY PATTYYYYYYY", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 1, userId: 3, review: "Krabby Patties.", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 1, userId: 4, review: "HOWDYYY this place was the best fine dinin' and winin' outside Texas!", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 1, userId: 5, review: "The Krabby Patty Formula will be MINE!!! MAWAHAHAHA", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 2, userId: 2, review: "Nothing compared to my Krusty Krab Argh argh argh", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 2, userId: 6, review: "Ugh.", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 2, userId: 7, review: "This place is somehow worse than the dump Squidward works in!", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 2, userId: 8, review: "Meowwwww", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 3, userId: 1, review: "So good!", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 3, userId: 2, review: "Will be back again", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 3, userId: 6, review: "Love this place", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 3, userId: 9, review: "Remy is the best chef in all of Paris!", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 4, userId: 6, review: "Delightful!", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 4, userId: 3, review: "Love my tea time", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 4, userId: 4, review: "Best cookies in town!", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 5, userId: 6, review: "The spaghetti reminded me of my mother's cooking in Italy", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 5, userId: 7, review: "Great food, and even better ambiance!", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 5, userId: 4, review: "If you come to Tony's you have got to try their cannolis!!!", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 6, userId: 9, review: "The juiciest eyeballs I've ever had!", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 6, userId: 10, review: "Octopus chef puts on a great show while serving some delicious sushi!", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 7, userId: 10, review: "Best crust ever!!!", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 7, userId: 3, review: "Absolutely LOVE their margherita pizza, I WILL BE BACK FOR MORE!", createdAt: new Date(), updatedAt: new Date() },
      { restaurantId: 7, userId: 4, review: "Cheese pizza is out of this planet", createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
