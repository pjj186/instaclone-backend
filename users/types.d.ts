import { User } from "@prisma/client";

export type Context = {
  loggedInUser?: User;
  protectResolver: (user: User) => { ok: boolean; error: string };
  client: PrismaClient;
};
