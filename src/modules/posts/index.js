const fs = require('fs');
const path = require('path');
const pubsub = require('../../graphql/pubsub');
// const typeDefs = require('./_schema');
const listPosts = require('./list-posts');
const showPost = require('./show-post');
const addPost = require('./add-post');
const editPosts = require('./edit-post');
const removePost = require('./remove-post');

const typeDefs = fs.readFileSync(path.join(__dirname, '_schema.gql'), 'utf8');

const resolvers = {
  Query: {
    posts: () => {
      return listPosts();
    },
    post: (_, args) => {
      return showPost({ id: args.id });
    },
  },
  Mutation: {
    createPost: async (_, args) => {
 
      const result = await addPost(args.input );

      pubsub.publish('POST_CREATED', { postCreated: result });

      return result;
    },
    updatePost: (_, args) => {
      return editPosts({ id: args.id, ...args.input });
    },
    removePost: (_, args) => {
      return removePost({ id: args.id });
    },
  },
  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator(['POST_CREATED']),
    },
  },
  // User: {
  //   posts: (parent) => {
  //     return listPost({ user_id: parent.id });
  //   },
  // },
};

module.exports = {
  typeDefs,
  resolvers,
};
