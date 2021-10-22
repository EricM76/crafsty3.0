'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn(
      'Carts',
      'quantity',
      {
        type: Sequelize.INTEGER
      }
    );
    await queryInterface.addColumn(
      'Carts',
      'orderId',
      {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Orders'
          },
          key : 'id'
        },
        onDelete : 'cascade'
      }
    );
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('Carts','quantity');
    await queryInterface.removeColumn('Carts','orderId');

  }
};
