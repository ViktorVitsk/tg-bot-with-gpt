import axios from 'axios';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

class OggConverter {
  constructor() {}

  toMp3() {}

  async create(url: string, filename: string) {
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
  }
}

export const ogg = new OggConverter();
