import { User } from "@prisma/client";
import { ReadStream, WriteStream } from "fs";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  bio: string;
  avatar: string;
  following: User[];
  followers: User[];
  totalFollowing: number;
  totalFollowers: number;
  isMe: boolean;
  isFollowing: boolean;
}

interface ExtendedReadStream extends ReadStream {
  _writeStream: WriteStream;
}

export interface FileUpload {
  createReadStream(): ExtendedReadStream;
  filename: string;
  mimetype: string;
  encoding: string;
}
