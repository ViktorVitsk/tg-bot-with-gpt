import OpenAI from 'openai';
import { IConfigService } from '../config/config.interface';
import { ConfigService } from '../config/config.service';
import { createReadStream } from 'fs';
import { ChatCompletionMessageParam } from 'openai/resources';
import { NarrowedContext } from 'telegraf';
import { Update, Message } from 'telegraf/typings/core/types/typegram';
import { IBotContext } from '../context/context.interface';
import { ogg } from '../utils/ogg-converter';

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

  async voiceToText(
    ctx: NarrowedContext<
      IBotContext,
      Update.MessageUpdate<Record<'voice', unknown> & Message.VoiceMessage>
    >
  ) {
    try {
      const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id);
      const userId = String(ctx.message.from.id);
      const oggPath = await ogg.create(link.href, userId);

      const mp3Path = await ogg.toMp3(oggPath, userId);
      const text = await this.transcription(mp3Path);
      return text;
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error while voice message ${error.message}`);
      }
    }
    return '';
  }
}

export const openai = new GPT(ConfigService.getInstance());
