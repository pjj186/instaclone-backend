import { User } from "@prisma/client";
import { ResolverFn, ResolveType } from "apollo-server";
import jwt, { JwtPayload } from "jsonwebtoken";
import client from "../client";

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = <JwtPayload>(
      await jwt.verify(token, process.env.JWT_SECRET_KEY!)
    );
    const user = await client.user.findUnique({
      where: { id },
    });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (e: any) {
    return null;
  }
};

export const protectedResolver =
  (ourResolver: any) => (root: any, args: any, context: any, info: any) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "로그인이 필요합니다.",
      };
    }
    return ourResolver(root, args, context, info);
  };
