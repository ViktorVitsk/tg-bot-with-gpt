import { Telegraf, session } from 'telegraf';
import { IConfigService } from './config/config.interface';
import { ConfigService } from './config/config.service';

class Bot {
  bot: Telegraf<any>;

  constructor(private readonly ConfigService: IConfigService) {
    this.bot = new Telegraf<any>(this.ConfigService.get('TOKEN'));
    this.bot.use(session());
  }

  init() {
    this.bot.launch();
  }
}

const bot = new Bot(new ConfigService());
bot.init();
