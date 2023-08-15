import { join } from 'path';

export const FileConfig = {
  serviceAccountKeyPath: join(
    __dirname,
    'path-to-your-service-account-key.json',
  ),
  bucketName: 'your-bucket-name',
};
