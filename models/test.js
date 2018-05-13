var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password');

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  score: Sequelize.STRING,
});

sequelize.sync().then(function() {
  return User.create({
    username: 'JZM',
    score: '1000'
  });
}).then(function(jzm) {
  console.log(jzm.get({
    plain: true
  }));
});