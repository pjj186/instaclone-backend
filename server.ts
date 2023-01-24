import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
dotenv.config();
import { typeDefs, resolvers } from "./schema";
import { ExpressContext } from "apollo-server-express/src/ApolloServer";
import { getUser } from "./users/users.utils";
import { User } from "@prisma/client";
import logger from "morgan";
import express from "express";

export interface IContext {
  loggedInUser: User;
  protectResolver: (user: User) => { ok: boolean; error: string };
}

const PORT = process.env.PORT;

const startServer = async () => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({ req }: ExpressContext) => {
      return {
        loggedInUser: await getUser(req?.headers?.authorization!),
      };
    },
  });

  const app = express(); // create express server
  app.use(logger("tiny"));
  await server.start();
  server.applyMiddleware({ app }); // apollo server with express server

  app.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
};

startServer();
