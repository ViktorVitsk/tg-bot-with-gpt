# Telegram GPT Voice Bot (2023)

**Status: Archived learning experiment · October–November 2023 · Not maintained**

An early experiment connecting a Telegram bot to OpenAI's APIs. I built it while exploring ways to use GPT in my own software in 2023. This repository preserves that period of learning; it is **not** presented as a production-ready assistant or a current implementation guide.

## What it does

- Uses **TypeScript** and **Telegraf** to handle Telegram bot commands.
- After the `/gpt` command, accepts Telegram voice messages, downloads the OGG audio, and converts it to MP3 using **FFmpeg**.
- Transcribes voice messages with **OpenAI Whisper (`whisper-1`)**.
- Sends the transcription to **GPT-3.5 Turbo** and returns a text response.
- Uses local Telegraf session storage.

## How to explore the historical code

Requirements: Node.js, a Telegram bot token, and an OpenAI API key. The code and dependency versions reflect **2023**; compatibility with current services and runtimes has not been reverified.

```bash
npm ci
```

Create a local `.env` file (do **not** commit it):

```dotenv
TOKEN=your-telegram-bot-token
OPEN_AI=your-openai-api-key
```

```bash
npm run build
npm start
```

Send `/start` for a short greeting, then `/gpt` and a voice message. The bot was designed for experimentation, not deployment to untrusted users.

## Project structure

- `src/app.ts` — bot startup and command registration
- `src/commands/` — Telegram commands
- `src/openai/openai.ts` — speech transcription and GPT calls
- `src/utils/ogg-converter.ts` — audio download and conversion
- `src/config/` — environment-based configuration

## Limitations and privacy

- The code uses the GPT-3.5 Turbo and Whisper API names from its original development period. Their current availability and compatibility are **not verified**.
- Voice-command handling is a simple prototype: sending `/gpt` multiple times can register repeated handlers.
- Voice messages and transcriptions are sent to external services. Local sessions are written to `sessions.json`, and audio is temporarily written under `data/voices`. Do not use real private conversations for a casual demo.
- Error handling, temporary-file cleanup, testing and deployment security are incomplete. There is **no automated test suite**.
- The original development history is preserved. Small user-facing wording improvements were made later for public presentation; the underlying 2023 architecture was not modernized.

## Why keep it public?

This repository documents my first experiments with GPT integration in **2023**. More recent projects represent my current engineering interests and capabilities.

*Historical source code, not a maintained or production-ready bot.*
