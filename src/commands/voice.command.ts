import { Telegraf } from 'telegraf';
import { Command } from './command.class';
import { message } from 'telegraf/filters';
import { IBotContext } from '../context/context.interface';
import { ogg } from '../utils/ogg-converter';

export class VoiceCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.on(message('voice'), async ctx => {
      try {
        const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id);
        const userId = String(ctx.message.from.id);
        const oggPath = await ogg.create(link.href, userId);
        if (typeof oggPath === 'string') {
          const mp3Path = await ogg.toMp3(oggPath, userId);
          if (typeof mp3Path === 'string') await ctx.reply(mp3Path);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(`Error while voice message ${error.message}`);
        }
      }
    });
  }
}
