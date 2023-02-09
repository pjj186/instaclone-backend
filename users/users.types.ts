import { User } from "@prisma/client";
import { ReadStream } from "fs-capacitor";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  bio?: string;
  avatar?: string | FileUpload;
  following: User[];
  followers: User[];
  totalFollowing: number;
  totalFollowers: number;
}

interface ExtendedReadStream extends ReadStream {
  _writeStream: {
    path: string;
  };
}

export interface FileUpload {
  createReadStream(): ExtendedReadStream;
  filename: string;
  mimetype: string;
  encoding: string;
}
