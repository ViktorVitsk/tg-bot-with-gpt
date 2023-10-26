import OpenAI from 'openai';
import { IConfigService } from '../config/config.interface';
import { ConfigService } from '../config/config.service';
import { createReadStream } from 'fs';
import { ChatCompletionMessageParam } from 'openai/resources';

class GPT {
  openai: OpenAI;
  constructor(private readonly configService: IConfigService) {
    this.openai = new OpenAI({ apiKey: this.configService.get('OPEN_AI') });
  }

  async chat(messages: ChatCompletionMessageParam[]) {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
      });
      return response.choices[0].message;
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error while chat answer ${error.message}`);
      }
    }
  }

  async transcription(text: string): Promise<string> {
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
