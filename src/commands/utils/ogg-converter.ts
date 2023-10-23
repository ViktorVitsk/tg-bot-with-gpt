import axios from 'axios';
import { createWriteStream } from 'fs';
import { dirname, resolve } from 'path';
import ffmpeg from 'fluent-ffmpeg';
import installer from '@ffmpeg-installer/ffmpeg';
import { removeFile } from './removeFile';

class OggConverter {
  constructor() {
    ffmpeg.setFfmpegPath(installer.path);
  }

  async toMp3(input: string, output: string): Promise<string | undefined> {
    try {
      const outputPath = resolve(dirname(input), `${output}.mp3`);
      return new Promise((resolve, reject) => {
        ffmpeg(input)
          .inputOption('-t 30')
          .output(outputPath)
          .on('end', () => {
            resolve(outputPath);
            removeFile(input);
          })
          .on('error', err => reject(err.message))
          .run();
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error while creating mp3 ${error.message}`);
      }
    }
  }

  async create(url: string, filename: string): Promise<string | null> {
    try {
      const oggPath = resolve(
        __dirname,
        '../../../data/voices',
        `${filename}.ogg`
      );
      const response = await axios({
        method: 'get',
        url,
        responseType: 'stream',
      });
      return new Promise(resolve => {
        const stream = createWriteStream(oggPath);
        response.data.pipe(stream);
        stream.on('finish', () => resolve(oggPath));
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error while creating ogg ${error.message}`);
      }
    }
    return null;
  }
}

export const ogg = new OggConverter();
