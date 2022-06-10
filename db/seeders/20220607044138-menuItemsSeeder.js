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
      { name: 'Krabby Patty', description: 'Best burger ever!', restaurantId: 1, image: 'https://i1.sndcdn.com/artworks-skob69hsTyYk99a8-zuJYJA-t500x500.jpg', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Double Krabby Patty', description: 'Twice the MEEEAAAT!', restaurantId: 1, image: 'https://static.wikia.nocookie.net/spongebob/images/9/9b/Deluxe_Krabby_Patty.jpg/revision/latest?cb=20140113015823', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Corral Bits', description: 'Just the right amount of crunch', restaurantId: 1, image: 'https://static.wikia.nocookie.net/spongebob/images/7/7e/Coral_Bits_HD.PNG/revision/latest?cb=20211118144751', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Krusty Krab Pizza', description: 'The Krusty Krab Pizza, is the pizza, for you and me!', restaurantId: 1, image: 'https://static.wikia.nocookie.net/spongebob/images/e/e4/Pizza_Delivery_136.png/revision/latest/scale-to-width-down/700?cb=20211231101127', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pretty Patty', description: 'A krabby patty, but prettier!', restaurantId: 1, image: 'https://static.wikia.nocookie.net/spongebob/images/9/9a/Patty_Hype_056.png/revision/latest/scale-to-width-down/700?cb=20191126035035', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chum Burger', description: 'Ew.', restaurantId: 2, image: 'https://cdn.discordapp.com/attachments/984658623932301363/984665999397781544/unknown.png', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chum stick', description: 'Bleh.', restaurantId: 2, image: 'https://static.wikia.nocookie.net/spongebob/images/d/da/Chum_stick_model_pose.jpg/revision/latest/scale-to-width-down/700?cb=20220610013800', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chumbalaya', description: 'Gross', restaurantId: 2, image: 'https://static.wikia.nocookie.net/spongebob/images/6/68/Chumbalaya.png/revision/latest?cb=20200830104642', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ratatouille', description: 'The perfect blend of stewed vegetables topped with a decadent sauce', restaurantId: 3, image: 'https://i0.wp.com/thesimplevegetariancookbook.com/wp-content/uploads/2020/05/MV5BNDgyOTZjNDAtMDM4MS00MjhlLTgzNjItMDg4Njg0ODEyMGEzXkEyXkFqcGdeQXVyNjQ4ODE4MzQ@._V1_.jpg?fit=842%2C480&ssl=1', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cheese', description: 'Cheese handpicked by our finest rats', restaurantId: 3, image: 'https://i.pinimg.com/originals/63/35/9f/63359fb102530b953725756561bc43e0.jpg', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tea', description: 'Hot hot hot! But so good good good!', restaurantId: 4, image: 'http://www.moriareviews.com/rongulator/wp-content/uploads/Alice-in-Wonderland-1951.jpg', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cookies', description: 'Cookies are delicious!', restaurantId: 4, image: 'https://rivermoosebooks.files.wordpress.com/2017/06/fde71e666c60fe11418b4f081b779f29.jpg', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Meatball Pasta', description: 'Pasta with meatballs and the best sauce you have ever had', restaurantId: 5, image: 'http://www.disneyfoodblog.com/wp-content/uploads/2011/06/ladyandthetramp.jpg', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cannoli', description: 'Fried pastry dough, filled with a sweet, creamy filling', restaurantId: 5, image: 'https://media.istockphoto.com/vectors/cannoli-traditional-sweet-italian-pastry-with-creamy-filling-vector-vector-id1161402718?k=20&m=1161402718&s=612x612&w=0&h=b4vQUHeO6ymLjDoE3RrQaAOSal5f6QMge4cCPpP4byk=', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Eyeballs', description: 'Fresh, juicy eyeballs', restaurantId: 6, image: 'https://cdn.discordapp.com/attachments/984658623932301363/984679579123871744/unknown.png', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sushi', description: 'Sushi made by the best sushi chef', restaurantId: 6, image: 'https://images-ext-1.discordapp.net/external/jtFr0sNG9l6BUFkwUgaZicO7AiowSiTayqsa6rneSXM/%3Fcb%3D20110118040437/https/static.wikia.nocookie.net/pixar/images/7/7b/Monstersmarlin.jpg/revision/latest?width=705&height=391', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Margherita Pizza', description: 'Tomatoes, mozzarella cheese, garlic, fresh basil, and extra-virgin olive oil', restaurantId: 7, image: 'https://media.istockphoto.com/vectors/pizza-margherita-vector-id1222437102?k=20&m=1222437102&s=612x612&w=0&h=vnSuPaxQDd0yiMKjvDmtEVCsdR4XKuhgXSk6zE9U0lE=', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pepperoni Pizza', description: 'The classic pizza', restaurantId: 7, image: 'https://img.favpng.com/24/6/17/pizza-salami-pepperoni-cartoon-clip-art-png-favpng-ULsvHbe7Sn8dm4uRwDyecVBTp.jpg', createdAt: new Date(), updatedAt: new Date() },
    ], {});
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
