import { Express } from 'express';

export interface S3File extends Express.Multer.File {
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
  location: string;
}
