import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
dotenv.config();
import http from "http";
import { typeDefs, resolvers } from "./schema";
import { ExpressContext } from "apollo-server-express/src/ApolloServer";
import { getUser } from "./users/users.utils";
import logger from "morgan";
import express from "express";
import client from "./client";

const PORT = process.env.PORT;

const apollo = new ApolloServer({
  resolvers,
  typeDefs,

  context: async ({ req }: ExpressContext) => {
    if (req) {
      return {
        loggedInUser: await getUser(req.headers.authorization!),
        client: client,
      };
    }
  },
});

const app = express();
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
apollo.applyMiddleware({ app });
const httpServer = http.createServer(app);

apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀Server is running on http://localhost:${PORT} ✅`);
});
