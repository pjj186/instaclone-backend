import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";
import { ExpressContext } from "apollo-server-express/src/ApolloServer";
import { getUser } from "./users/users.utils";
import { User } from "@prisma/client";

export interface IContext {
  loggedInUser: User;
  protectResolver: (user: User) => { ok: boolean; error: string };
}

const PORT = process.env.PORT;

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }: ExpressContext) => {
    return {
      loggedInUser: await getUser(req?.headers?.authorization!),
    };
  },
});

server.listen(PORT).then(() => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/`);
});
