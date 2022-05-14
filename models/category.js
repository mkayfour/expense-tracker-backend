"use strict";
const { Sequelize, DataTypes } = require("sequelize");

const db = require("./index");

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      tableName: "categories",
      sequelize,
      modelName: "Category",
      underscored: true,
    }
  );
  Category.associate = (models) => {
    Category.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  };
  return Category;
};
