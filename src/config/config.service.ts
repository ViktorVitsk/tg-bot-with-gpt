import { config, DotenvParseOutput } from 'dotenv';
import { IConfigService } from './config.interface';

export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;
  private static instance: ConfigService;

  constructor() {
    const { error, parsed } = config();
    if (error) {
      throw new Error('Не найден файл .env');
    }
    if (!parsed) {
      throw new Error('Пустой файл .env');
    }
    this.config = parsed;
  }

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  get(key: string): string {
    const res = this.config[key];
    if (!res) {
      throw new Error('Нет такого ключа');
    }
    return res;
  }
}
