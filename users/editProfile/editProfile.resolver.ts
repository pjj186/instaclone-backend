import { IUser } from "../users.types";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { Context } from "../types";
import { uploadToS3 } from "../../shared/shared.utils";

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
  }: IUser,
  { loggedInUser, client }: Context
) => {
  let avatarUrl = null;
  if (avatar) {
    avatarUrl = await uploadToS3(avatar, loggedInUser?.id!, "avatars");
    // const newFilename = `${loggedInUser?.id}-${Date.now()}-${filename}`;
    // const readStream = createReadStream();
    // const writeStream = fs.createWriteStream(
    //   process.cwd() + "/uploads/" + newFilename
    // ); // cwd: current working directory
    // readStream.pipe(writeStream); // pipe : stream 연결
    // avatarUrl = `http://localhost:4000/static/${newFilename}`;
  }

  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser?.id,
    },
    data: {
      firstName,
      lastName,
      username,
      email,
      bio,
      ...(uglyPassword && { password: uglyPassword }),
      ...(avatarUrl && { avatar: avatarUrl }),
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
