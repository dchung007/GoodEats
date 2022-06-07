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
