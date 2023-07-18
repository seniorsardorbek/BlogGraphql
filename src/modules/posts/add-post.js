const db = require('../../db');

const addPost = async (data) => {
  const result = await db('posts').insert(data).returning('*');

  return result[0];
};

module.exports = addPost;
