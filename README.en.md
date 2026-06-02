# Api2img Skill

[中文](README.md) | [English](README.en.md)

## Features

`Solves the problem of not being able to generate images when using different agents through a third-party API`.

api2img is designed for people who use agents through a relay API and also need image generation and image editing. It now targets not only Codex, but is also starting to support Claude Code, OpenClaw, Hermes, and other agents that can be pointed at a skill directory manually.

## Advantages

- **Simple**: Install with one command and support automatic agent detection.
- **Secure**: The API key is saved locally for the current Windows user with Windows DPAPI, so you do not need to paste the key into chat.
- **No environment pollution**: It does not overwrite your existing `OPENAI_API_KEY`, `OPENAI_BASE_URL`, or other variables. It only maps them temporarily inside the child process.
- **Multi-agent support**: It defaults to global installation and also supports project-level installation.

## Installation

Method 1 (recommended): ask your agent to run:

```powershell
npx api2img
```

Default behavior:

- Automatically detect the current agent
- Install to the global target by default
- If no supported agent is detected, install to the global generic directory

You can also specify the target manually:

```powershell
npx api2img --agent claude-code
npx api2img --agent openclaw --scope project
npx api2img --agent hermes --scope global
npx api2img --agent generic
```

Show the install plan without installing:

```powershell
npx api2img --print-plan
```

## Target Directories

Current supported agent targets:

- `codex`
  - global: `%USERPROFILE%\.codex\skills\api2img`
  - project: `<workspace>\.codex\skills\api2img`
- `claude-code`
  - global: `%USERPROFILE%\.claude\commands\api2img`
  - project: `<workspace>\.claude\commands\api2img`
- `openclaw`
  - global: `%USERPROFILE%\.openclaw\skills\api2img`
  - project: `<workspace>\skills\api2img`
- `hermes`
  - global: `%USERPROFILE%\.hermes\skills\api2img`
  - project: `<workspace>\.hermes\skills\api2img`
- `generic`
  - global: `%USERPROFILE%\.agent-skills\api2img`
  - project: `<workspace>\.agent-skills\api2img`

## Recommended Image API Relay Provider

[https://cc-vibe.com](https://cc-vibe.com/register?aff=7LBQWRFY5ETG)

Built by a friend, low price with volume:

- Personal request data is deleted every day, privacy-friendly
- Supports image generation: 1k image = RMB 0.1 each, 2k image = RMB 0.2 each, 4k image = RMB 0.3 each
- Claude Code/Codex are both available (RMB 10 for USD 200 quota, floor price, model can be verified)

---

## Supported Features

It can be called automatically by an agent when needed, and it can also be used directly for normal image generation, for example:

- [Generate] Generate an xxx image
- [Edit] Replace a certain part of the image
- [Upload] Modify xxx in the image I uploaded

### Other Features

Tell the agent in natural language:

```powershell
I want to modify the url and apikey of the api2img skill
```

```powershell
I want to delete the url and apikey of the api2img skill
```

## Note

- Image generation sends prompts and uploaded images to the third-party relay provider you configured. If you are not familiar with the provider, do not process ID documents, faces, work secrets, or other private and sensitive content.
- Before the first uploaded-image edit, the agent should warn the user that the image may be obtained by a third-party API and wait for confirmation.
