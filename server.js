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

const Todos = [
  {
    title: "Learn GraphQL",
    by: "qwerty1234",
  },
  {
    title: "Dancing with the stars",
    by: "qwerty5678",
  },
  {
    title: "Drinking like a boss",
    by: "qwerty5678",
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
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    todos: [Todo]
  }

  type Todo {
    title: String!
    by: ID!
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => {
      return users.find((item) => item.id == id);
    },
  },
  User: {
    todos: (user) => {
      return Todos.filter((todo) => todo.by == user.id);
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
