const db = require('../../db');

const editUser = async ({ id, ...changes }) => {
  const existing = await db('users').where({ id }).first();

  if (!existing) {
    throw new Error('User not found');
  }

  return (await db('users').where({ id }).update(changes).returning('*'))[0];
};

module.exports = editUser;
