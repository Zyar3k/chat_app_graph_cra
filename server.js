// import { ApolloServer } from "apollo-server-express";
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

// import typeDefs from "./typeDefs.js";
// import resolvers from "./resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
