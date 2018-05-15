var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password');

var Score = sequelize.define("User", {
  initieals: {
    type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
  },
  score: {
    type: DataTypes.INTEGER,
      allowNull: false,
  }
})

