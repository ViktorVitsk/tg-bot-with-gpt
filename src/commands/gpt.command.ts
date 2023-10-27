import { Telegraf } from 'telegraf';
import { Command } from './command.class';
import { IBotContext } from '../context/context.interface';
import { message } from 'telegraf/filters';
import { openai } from '../openai/openai';
import { ChatCompletionMessageParam } from 'openai/resources';

export class GPTCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }
  handle(): void {
    this.bot.command('gpt', async ctx => {
      ctx.reply('Шо?');
      this.bot.on(message('voice'), async ctx => {
        const text = await openai.voiceToText(ctx);
        if (text.trim().length > 0) {
          await ctx.replyWithHTML(`<b>Ваш вопрос:</b>
					<i>${text}</i>`);
          const messages: ChatCompletionMessageParam[] = [
            { content: text, role: 'user' },
          ];
          const response = await openai.chat(messages);
          if (typeof response?.content === 'string') {
            await ctx.reply(response?.content);
          }
        } else {
          ctx.reply('Шото дядя, ты хуйню сказал');
        }
      });
    });
  }
}
