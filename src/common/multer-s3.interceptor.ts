// import multer from 'multer';
// import multerS3 from 'multer-s3';
// import { s3Client } from './s3/s3.client';
//
// export const multerS3Options = {
//   storage: multerS3({
//     s3: s3Client,
//     bucket: 'documents',
//     acl: 'private',
//     key: (req, file, cb) => {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//       cb(null, `uploads/${uniqueSuffix}-${file.originalname}`);
//     },
//   }),
// };

// import multer from 'multer';
// import multerS3 from 'multer-s3';
// import { s3Client } from './s3/s3.client';
//
// export const S3UploadInterceptor = {
//   upload: multer({
//     storage: multerS3({
//       s3: s3Client,
//       bucket: 'documents',
//       acl: 'private',
//       key: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         cb(null, `uploads/${uniqueSuffix}-${file.originalname}`);
//       },
//     }),
//   }),
// };

import multerS3 from 'multer-s3';
import { s3Client } from './s3/s3.client';

export const multerS3Options = {
  storage: multerS3({
    s3: s3Client,
    bucket: 'documents',
    acl: 'private',
    key: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `uploads/${uniqueSuffix}-${file.originalname}`);
    },
  }),
};
