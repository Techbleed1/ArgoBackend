import { Module } from '@nestjs/common';
import { FileService } from './service/file.service';
import { FileController } from './controller/file.controller';
import * as config from 'config';

const file = config.get('file');
@Module({
  providers: [
    FileService,
    {
      provide: 'FileConfig',
      useValue: {
        serviceAccountKeyPath:
          process.env.SERVICE_ACCOUNT_KEY_PATH || './config/gcp.json',
        bucketName: file.bucket,
      },
    },
  ],
  controllers: [FileController],
})
export class FileModule {}
