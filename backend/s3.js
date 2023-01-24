require("dotenv").config();

const S3 = require("aws-sdk/clients/s3");

const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// UPLOAD FILE TO S3*

function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise(); // this will upload file to S3
}

// DOWNLOAD FILE FROM S3*

function getFileStream(fileKey) {
  const downloadParams = {
    Bucket: bucketName,
    Key: fileKey,
  };

  return s3.getObject(downloadParams).createReadStream();
}

function deleteFile(fileKey) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileKey,
  };

  return s3.deleteObject(deleteParams).promise();
}

module.exports = { uploadFile, getFileStream, deleteFile };
