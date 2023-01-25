import fs from "fs";
import client from "../../client";
import { FileUpload, IAccount } from "../users.types";
import bcrypt from "bcrypt";
import { IContext } from "../../server";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
  _: any,
  {
    firstName,
    username,
    lastName,
    email,
    password: newPassword,
    bio,
    avatar,
  }: IAccount,
  { loggedInUser }: IContext
) => {
  const { filename, mimetype, encoding, createReadStream } = await (<
    FileUpload
  >avatar);
  const readStream = createReadStream();
  const writeStream = fs.createWriteStream(
    process.cwd() + "/uploads/" + filename
  ); // cwd: current working directory

  readStream.pipe(writeStream); // pipe : stream 연결

  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      username,
      email,
      bio,
      ...(uglyPassword && { password: uglyPassword }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "프로필을 업데이트 할 수 없습니다.",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
