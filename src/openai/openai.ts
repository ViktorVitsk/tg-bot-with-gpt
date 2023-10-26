import OpenAI from 'openai';
import { IConfigService } from '../config/config.interface';
import { ConfigService } from '../config/config.service';
import { createReadStream } from 'fs';

class GPT {
  openai: OpenAI;
  constructor(private readonly configService: IConfigService) {
    this.openai = new OpenAI({ apiKey: this.configService.get('OPEN_AI') });
  }

  chat() {}

  async transcription(text: string) {
    try {
      const response = await this.openai.audio.transcriptions.create({
        file: createReadStream(text),
        model: 'whisper-1',
      });
      return response.text;
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error while transcription ${error.message}`);
      }
    }
    return '';
  }
}

export const openai = new GPT(ConfigService.getInstance());
