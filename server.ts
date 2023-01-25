import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
dotenv.config();
import { typeDefs, resolvers } from "./schema";
import { ExpressContext } from "apollo-server-express/src/ApolloServer";
import { getUser } from "./users/users.utils";
import { User } from ".prisma/client";
import logger from "morgan";
import express from "express";

export interface IContext {
  loggedInUser: User;
  protectResolver: (user: User) => { ok: boolean; error: string };
}

const PORT = process.env.PORT;

const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }: ExpressContext) => {
    return {
      loggedInUser: await getUser(req.headers.authorization!),
    };
  },
});
const app = express();

app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
apollo.applyMiddleware({ app });
app.listen({ port: PORT }, () => {
  console.log(`🚀Server is running on http://localhost:${PORT} ✅`);
});
