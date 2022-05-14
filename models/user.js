"use strict";
const { Sequelize, DataTypes } = require("sequelize");
const { generateSalt, generateSecuredHash } = require("../helpers/security");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("Admin", "Guest"),
        allowNull: true,
        defaultValue: "Guest",
      },
    },
    {
      tableName: "users",
      sequelize,
      modelName: "User",
      underscored: true,
      hooks: {
        beforeValidate: (user, options) => {
          if (user.changed("password")) {
            user.salt = generateSalt();
            user.password = generateSecuredHash(user.password, user.salt);
          }
        },
      },
      //
    }
  );

  return User;
};
