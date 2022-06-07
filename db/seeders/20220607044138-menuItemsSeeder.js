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
    return queryInterface.bulkInsert('MenuItems', [
      { name: 'Krabby Patty', description: 'Best burger ever!', restaurantId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Double Krabby Patty', description: 'Twice the MEEEAAAT!', restaurantId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Corral Bits', description: 'Just the right amount of crunch', restaurantId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Kelp Shake', description: 'The ultimate thirst quencher!', restaurantId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chum Burger', description: 'Ew.', restaurantId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chum on a stick!', description: 'Bleh.', restaurantId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chumbalaya', description: 'Gross', restaurantId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chum chili', description: 'Huh?', restaurantId: 2, createdAt: new Date(), updatedAt: new Date() },
    ], { });
  },

down: (queryInterface, Sequelize) => {
  /*
    Add reverting commands here.
    Return a promise to correctly handle asynchronicity.

    Example:
    return queryInterface.bulkDelete('People', null, {});
  */
  return queryInterface.bulkDelete('MenuItems', null, {});
}
};
