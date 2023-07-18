const { makeExecutableSchema } = require('@graphql-tools/schema');
const usersModule = require('../modules/users');
const postsModule = require('../modules/posts');
// const commentsModule = require('../modules/comments');

const schema = makeExecutableSchema({
  typeDefs: [
    usersModule.typeDefs,
    // postsModule.typeDefs,
    // ...
  ],
  resolvers: [
    usersModule.resolvers,
    // postsModule.resolvers
    // ...
  ],
});

module.exports = schema;
