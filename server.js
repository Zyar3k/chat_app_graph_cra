const { ApolloServer, gql } = require("apollo-server");
// const url = "http://localhost:4000";

const typeDefs = gql`
  type Query {
    greet: String
  }
`;
const resolvers = {
  Query: {
    greet: () => "Hello World!",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
