const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,

      primaryKey: true,
    },

    dish_summary: {
      type: DataTypes.TEXT,
    },
    score: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        max: 10,
        min: 0,
      },
    },

    healthscore: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        max: 100,
        min: 0,
      },
    },

    steps: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    image: {
      type: DataTypes.TEXT,
    },
  });
};
