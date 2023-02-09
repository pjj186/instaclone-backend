import AWS from "aws-sdk";
import { FileUpload } from "../users/users.types";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
});

export const uploadPhoto = async (file: FileUpload, userId: number) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${userId}-${Date.now()}-${filename}`;
  const upload = await new AWS.S3()
    .upload({
      Bucket: "instaclone-uploads-bk", // Bucket Name
      Key: objectName, // Upload File Name
      ACL: "public-read", // objects privacy
      Body: readStream,
    })
    .promise();
  console.log(upload);
  return "";
};
