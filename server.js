const { ApolloServer, gql } = require("apollo-server");
const { v4 } = require("uuid");

const users = [
  {
    id: "qwerty1234",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "12345",
  },
  {
    id: "qwerty5678",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    password: "12345",
  },
];

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Mutation {
    createUser(userNew: UserInput!): User
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (parent, { id }, context) => {
      console.log(id);
      return users.find((item) => item.id == id);
    },
  },
  Mutation: {
    createUser: (_, { userNew }) => {
      const newUser = {
        id: v4(),
        ...userNew,
      };
      users.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
