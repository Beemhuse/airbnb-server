import { Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';
import * as fs from 'fs';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      if (!file) {
        return reject(new Error('No file provided for upload'));
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'airbnb_avatars', resource_type: 'image' },
        (error, result) => {
          if (error) return reject(error);
          if (!result)
            return reject(new Error('Cloudinary upload result is undefined'));
          resolve(result);
        },
      );

      if (file.buffer) {
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      } else if ((file as any).path) {
        const readStream = fs.createReadStream((file as any).path);
        readStream.on('error', reject);
        readStream.pipe(uploadStream);
      } else {
        reject(new Error('Uploaded file does not contain a buffer or path'));
      }
    });
  }
}
