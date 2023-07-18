const db = require('../../db');

const addUser = async (data) => {
  const result = await db('users').insert(data).returning('*');

  return result[0];
};

module.exports = addUser;
