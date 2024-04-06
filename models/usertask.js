'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTask extends Model {
    static associate(models) {
      UserTask.belongsTo(models.User, { foreignKey: 'user_id' });
      UserTask.belongsTo(models.Task, { foreignKey: 'task_id' });
    }
  }
  UserTask.init({
    user_id: DataTypes.INTEGER,
    task_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserTask',
  });
  return UserTask;
};
