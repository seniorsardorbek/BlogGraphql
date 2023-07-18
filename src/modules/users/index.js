const fs = require('fs');
const path = require('path');
const pubsub = require('../../graphql/pubsub');
// const typeDefs = require('./_schema');
const listUsers = require('./list-users');
const showUser = require('./show-user');
const addUser = require('./add-user');
const editUser = require('./edit-user');
const removeUser = require('./remove-user');

const typeDefs = fs.readFileSync(path.join(__dirname, '_schema.gql'), 'utf8');
console.log(typeDefs);
const resolvers = {
  Query: {
    users: () => {
      return listUsers();
    },
    user: (_, args) => {
      return showUser({ id: args.id });
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      const {first_name , last_name } = args.input
     function createUniqueUsername(first_name, last_name) {
        // Concatenate first name and last name
        let usname = first_name + last_name;
    
        // Append a random number to ensure uniqueness
        usname += Math.floor(Math.random() * 10000);
    
        return usname;
    } 
    const username = createUniqueUsername(first_name , last_name)
      const result = await addUser({...args.input , username});

      pubsub.publish('USER_CREATED', { userCreated: result });

      return result;
    },
    updateUser: (_, args) => {
      return editUser({ id: args.id, ...args.input });
    },
    removeUser: (_, args) => {
      return removeUser({ id: args.id });
    },
  },
  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterator(['USER_CREATED']),
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
