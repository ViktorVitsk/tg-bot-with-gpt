import { NarrowedContext } from 'telegraf';
import { ogg } from './ogg-converter';
import { Update, Message } from 'telegraf/typings/core/types/typegram';
import { IBotContext } from '../context/context.interface';
import { openai } from '../openai/openai';

export async function voiceToText(
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
    const text = await openai.transcription(mp3Path);
    return text;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error while voice message ${error.message}`);
    }
  }
  return '';
}
