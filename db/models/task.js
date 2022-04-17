'use strict';
const {
  Model
} = require('sequelize');
//const Flow = require('./flow');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.Flow, { foreignKey: 'flow_id' });
    }
  }
  Task.init({
    title: DataTypes.STRING,
    hours: DataTypes.INTEGER,
    minutes: DataTypes.INTEGER,
    seconds: DataTypes.INTEGER,
    type: DataTypes.STRING,
    //flow_id: {
        //type: DataTypes.INTEGER,
        //references: {
            //model: Flow,
            //key: 'id',
        //},
    //},
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};
