"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      books.belongsToMany(models.user, {
        as: "user",
        through: {
          model: "listBookUser",
          as: "bridge",
        },
        foreignKey: "idUser",
      });
    }
  }
  books.init(
    {
      title: DataTypes.STRING,
      publicationsDate: DataTypes.STRING,
      pages: DataTypes.INTEGER,
      author: DataTypes.STRING,
      isbn: DataTypes.INTEGER,
      about: DataTypes.TEXT,
      bookFile: DataTypes.STRING,
      imgCover: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "books",
    }
  );
  return books;
};
