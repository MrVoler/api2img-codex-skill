# Api2img Skill

[中文](README.md) | [English](README.en.md)

## Features

`Solves the problem that users who use Codex through a third-party API cannot generate images`.

api2img is designed for people who use Codex through a relay API and also need image generation and editing.

## Advantages

- **Simple**: Install with one command.
- **Secure**: The API key is saved locally for the current Windows user with Windows DPAPI, so you do not need to paste the key into chat.
- **No environment pollution**: It does not overwrite your existing `OPENAI_API_KEY`, `OPENAI_BASE_URL`, or other variables. It only maps them temporarily inside the child process.

## Installation

Method 1 (recommended for beginners): directly tell your Agent:

```powershell
Install this Codex skill for me: npx api2img
```

Method 2: enter this in the command line:

```powershell
npx api2img
```

## Recommended Image API Relay Provider

[https://cc-vibe.com](https://cc-vibe.com/register?aff=7LBQWRFY5ETG)

Built by a friend, low price with volume:

- Personal request data is deleted every day, privacy-friendly
- Supports image generation: 1k image = RMB 0.1 each, 2k image = RMB 0.2 each, 4k image = RMB 0.3 each
- Claude Code/Codex are both available (RMB 10 for USD 200 quota, floor price, model can be verified)

---

## Supported Features

It will be automatically called by Codex when needed, and can also be used for normal image generation, for example:

- [Generate] Generate an xxx image
- [Edit] Replace a certain part of the image
- [Upload] Modify xxx in the image I uploaded

### Other Features

Tell Codex in natural language:

```powershell
I want to modify the url and apikey of the api2img skill
```

```powershell
I want to delete the url and apikey of the api2img skill
```

## Note

- Image generation sends prompts and uploaded images to the third-party relay provider you configured. If you are not familiar with the provider, do not process ID documents, faces, work secrets, or other private and sensitive content.
