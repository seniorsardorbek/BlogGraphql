const db = require('../../db');

const removeUser = async ({ id }) => {
  const existing = await db('users').where({ id }).first();

  if (!existing) {
    throw new Error('User not found');
  }

  return (await db('users').where({ id }).delete().returning('*'))[0];
};

module.exports = removeUser;
