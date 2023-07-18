const db = require('../../db');

const showUser = async ({ id }) => {
  const user = await db('users').where({ id }).first();

  if (user) {
    throw new Error('User not found');
  }

  return user;
};

module.exports = showUser;
