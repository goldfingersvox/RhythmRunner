module.exports = function(sequelize, DataTypes){
  var Score = sequelize.define("Score", {
    initials: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3]
        }
    },
    score: {
      type: DataTypes.INTEGER,
        allowNull: false,
    },
    timestamps: false
  })
  return Score;
}



