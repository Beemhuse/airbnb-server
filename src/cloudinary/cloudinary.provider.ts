import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return cloudinary.config({
      cloud_name: configService.get('CLOUDINARY_CLOUD_NAME') || 'dummy_cloud_name',
      api_key: configService.get('CLOUDINARY_API_KEY') || 'dummy_api_key',
      api_secret: configService.get('CLOUDINARY_API_SECRET') || 'dummy_api_secret',
    });
  },
};
