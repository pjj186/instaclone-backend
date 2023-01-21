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
