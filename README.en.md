# Api2img Skill

[中文](README.md) | [English](README.en.md)

## Features

`Give any agent using a non-official API key near-native image generation capability.`

api2img is designed for people who use agents through a relay API and also need image generation and image editing.

Supports:
- `Codex`
- `Claude Code`
- `OpenClaw`
- `Hermes`
- `Any other compatible agent`

## Advantages

- **Simple**: Install with one command and support automatic agent detection.
- **Secure**: The API key is saved locally for the current Windows user with Windows DPAPI, so you do not need to paste the key into chat.
- **Fully compatible**: Supports all agents that can install skills.
- **No environment pollution**: The image API key uses an independent name and is stored securely. It does not overwrite your existing `OPENAI_API_KEY`, `OPENAI_BASE_URL`, or other variables, and is only mapped temporarily inside the child process.

## Installation

Method 1 (recommended for beginners): copy the following command to your agent:

```powershell
Please help me install the skill: npx api2img
```

Method 2: install from the command line

```powershell
npx api2img
```

## Recommended Image API Relay Provider

[https://cc-vibe.com](https://cc-vibe.com/register?aff=7LBQWRFY5ETG)

Built by a friend, low price with volume:

- Personal request data is deleted every day, privacy-friendly
- Supports image generation (1k image = RMB 0.01 each, 2k image = RMB 0.02 each, 4k image = RMB 0.03 each)
- Supports both Claude Code and Codex (RMB 8.8 = USD 100 API quota, floor price, model can be verified)

---

## How To Use

It will be automatically called by an agent when needed, and it can also be used directly for normal image generation, for example:

- [Generate] Generate an xxx image
- [Edit] Replace a certain part of the image
- [Upload] Modify xxx in the image I uploaded

## Supported Commands

Tell the agent in natural language:

```powershell
- Show the installation plan without actually installing
- Global install (default): npx api2img
- Project-level install: npx api2img
- I want to modify the url and apikey of the api2img skill (changing only one of them is also supported)
- I want to delete the url and apikey of the api2img skill
```

## Privacy Statement

- This skill itself does not upload any of your data, and you can ask the agent to perform a security review.
- When generating images, the uploaded images and prompts will be sent to the third-party relay provider you configured. Please avoid processing ID documents, faces, work secrets, or other private and sensitive content whenever possible.
