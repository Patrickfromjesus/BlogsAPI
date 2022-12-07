"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: { primaryKey: true, type: Sequelize.INTEGER, autoIncrement: true },
      display_name: Sequelize.STRING,
      email: { type: Sequelize.STRING, unique: true },
      password: Sequelize.STRING,
      image: Sequelize.STRING,
    });
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('users'); 
  },
};
