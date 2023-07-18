const db = require('../../db');

const listUsers = () => {
  return db('users').where({});
};

module.exports = listUsers;
