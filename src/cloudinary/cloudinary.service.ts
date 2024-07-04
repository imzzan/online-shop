/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    v2.config({
      cloud_name: 'diqvk3qr5',
      api_key: '947394394524727',
      api_secret: 'zbz5n-2gR6Jqu12_Vhizn2l4Esw',
    });
  }

  async uploadFile(
    filepath: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader.upload(
        filepath,
        { folder: 'files', public_id: `${Date.now()}`, resource_type: 'auto' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
    });
  }
}
