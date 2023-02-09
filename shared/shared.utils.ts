import AWS from "aws-sdk";
import { FileUpload } from "../users/users.types";
import fs from "fs";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
});

export const uploadToS3 = async (
  file: FileUpload,
  userId: number,
  folderName: string
) => {
  const { filename, createReadStream } = await file;
  const readStream = await createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "instaclone-uploads-bk", // Bucket Name
      Key: objectName, // Upload File Name
      ACL: "public-read", // objects privacy
      Body: fs.createReadStream(readStream._writeStream.path),
    })
    .promise();

  return Location;
};
