const { default: gql } = require('graphql-tag');

module.exports = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    removeUser(id: ID!): User!
  }

  type Subscription {
    userCreated: User!
  }

  type User {
    id: ID!
    name: String
  }

  input CreateUserInput {
    name: String!
  }

  input UpdateUserInput {
    name: String!
  }
`;
