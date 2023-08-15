import { Inject, Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class FileService {
  private readonly bucketName: string;
  private readonly storage: Storage;

  constructor(@Inject('FileConfig') private readonly fileConfig) {
    this.bucketName = fileConfig.bucketName;
    this.storage = new Storage({
      keyFilename: fileConfig.serviceAccountKeyPath,
    });
  }

  async uploadFile(fileBuffer: Buffer, fileName: string): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const file = bucket.file(fileName);
    // await file.save(fileBuffer, {
    //   predefinedAcl: 'publicRead',
    // });
    await file.save(fileBuffer);
    return this.getSignedUrl(fileName);
  }

  async getSignedUrl(fileName: string): Promise<string | null> {
    const bucket = this.storage.bucket(this.bucketName);
    const file = bucket.file(fileName);
    const expire = Date.now() + 31536000000;
    //   const expire = Date.now() + 15 * 60 * 1000; // expire 15m
    try {
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: expire,
      });
      return url;
    } catch (error) {
      console.error('Error generating public URL:', error);
      return null;
    }
  }

  getPublicLink(fileName: string): string {
    return `https://storage.googleapis.com/${this.bucketName}/${fileName}`;
  }
}
