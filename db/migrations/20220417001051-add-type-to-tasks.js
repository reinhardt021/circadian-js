'use strict';
const table = 'Tasks';
const newColumn = 'type';

module.exports = {
  async up (queryInterface, Sequelize) {
      const transaction = await queryInterface.sequelize.transaction();
      try {
          await queryInterface.addColumn(
            table, 
            newColumn, 
            { type: Sequelize.DataTypes.STRING },
            { transaction }
          );
          // DO STUFF
          await transaction.commit();
      } catch(err) {
        await transaction.rollback();
          throw err;
      }
  },

  async down (queryInterface, Sequelize) {
      const transaction = await queryInterface.sequelize.transaction();
      try {
          await queryInterface.removeColumn(table, newColumn, { transaction });
          await transaction.commit();
      } catch(err) {
        await transaction.rollback();
          throw err;
      }
  }
};
