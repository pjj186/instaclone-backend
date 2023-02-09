import AWS from "aws-sdk";
import { FileUpload } from "../users/users.types";
import fs from "fs";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
});

export const uploadPhoto = async (file: FileUpload, userId: number) => {
  const { filename, createReadStream } = await file;
  const readStream = await createReadStream();
  console.log(readStream);
  console.log(readStream.path);
  const objectName = `${userId}-${Date.now()}-${filename}`;
  console.log(objectName);
  const upload = await new AWS.S3()
    .upload({
      Bucket: "instaclone-uploads-bk", // Bucket Name
      Key: objectName, // Upload File Name
      ACL: "public-read", // objects privacy
      Body: fs.createReadStream(readStream._writeStream.path),
    })
    .promise();
  return "";
};
