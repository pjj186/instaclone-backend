import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
dotenv.config();
import { typeDefs, resolvers } from "./schema";
import { ExpressContext } from "apollo-server-express/src/ApolloServer";
import { getUser } from "./users/users.utils";
import logger from "morgan";
import express from "express";
import client from "./client";
import pubsub from "./pubsub";

const PORT = process.env.PORT;

console.log(pubsub);

const apollo = new ApolloServer({
  resolvers,
  typeDefs,

  context: async ({ req }: ExpressContext) => {
    return {
      loggedInUser: await getUser(req.headers.authorization!),
      client: client,
    };
  },
});

const app = express();
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
apollo.applyMiddleware({ app });
apollo.installSubscriptionHandlers(app as any);
app.listen({ port: PORT }, () => {
  console.log(`🚀Server is running on http://localhost:${PORT} ✅`);
});
