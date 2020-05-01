'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ingredients = sequelize.define('Ingredients', {
    amount: DataTypes.INTEGER,
    measurementUnitId: DataTypes.INTEGER,
    foodStuff: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    }
  }, {});
  Ingredients.associate = function(models) {
    Ingredients.belongsTo(models.Recipes, {foreignKey: 'recipeId'})
    Ingredients.belongsTo(models.MeasurementUnit, {foreignKey: 'measurementUnitId'})


    // associations can be defined here
  };
  return Ingredients;
};
