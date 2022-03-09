const pc = require("@prisma/client");
const bcryptjs = require("bcryptjs");
const { AuthenticationError, ForbiddenError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const prisma = new pc.PrismaClient();

const resolvers = {
  Query: {
    users: async (_, args, { userId }) => {
      if (!userId) throw new ForbiddenError("You must be logged in");
      const users = await prisma.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          id: {
            not: userId,
          },
        },
      });
      return users;
    },
  },
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
    signInUser: async (_, { userSignIn }) => {
      const user = await prisma.user.findUnique({
        where: { email: userSignIn.email },
      });
      if (!user)
        throw new AuthenticationError("User doesn't exist with that email");
      const isMatched = await bcryptjs.compare(
        userSignIn.password,
        user.password
      );
      if (!isMatched)
        throw new AuthenticationError("Invalid email or password");
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return { token };
    },
    createMessage: async (_, { text, receiverId }, { userId }) => {
      if (!userId) throw new ForbiddenError("You must be logged in");
      const message = await prisma.message.create({
        data: {
          text,
          receiverId,
          senderId: userId,
        },
      });
      return message;
    },
  },
};

module.exports = resolvers;
