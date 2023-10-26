import { Telegraf } from 'telegraf';
import { Command } from './command.class';
import { IBotContext } from '../context/context.interface';
import { message } from 'telegraf/filters';
import { voiceToText } from '../utils/voice-to-text';

export class GPTCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }
  handle(): void {
    this.bot.on(message('voice'), async ctx => {
      const text = await voiceToText(ctx);
      ctx.reply(text);
    });
  }
}
