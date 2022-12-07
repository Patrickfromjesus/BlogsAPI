'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('categories', {
      id: { primaryKey: true, type: Sequelize.INTEGER, autoIncrement: true },
      name: Sequelize.STRING,
    });
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('categories');
  }
};