const db = require('../../db');

const editPosts = async ({ id, ...changes }) => {
  const existing = await db('posts').where({ id }).first();

  if (!existing) {
    throw new Error('Post not found');
  }

  return (await db('posts').where({ id }).update(changes).returning('*'))[0];
};

module.exports = editPosts;
