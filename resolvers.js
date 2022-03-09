const pc = require("@prisma/client");
const bcryptjs = require("bcryptjs");
const { ApolloError, AuthenticationError } = require("apollo-server");

const prisma = new pc.PrismaClient();

const resolvers = {
  Query: {},
  Mutation: {
    signupUser: async (_, { userNew }) => {
      const user = await prisma.user.findUnique({
        where: { email: userNew.email },
      });
      if (user)
        throw new AuthenticationError("User already exists with that email");
      const hashedPassword = await bcryptjs.hash(userNew.password, 10);

      const newUser = await prisma.user.create({
        data: {
          ...userNew,
          password: hashedPassword,
        },
      });
      return newUser;
    },
  },
};

module.exports = resolvers;

// export default resolvers;
