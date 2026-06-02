# Install Targets

Default install scope is `global`.

Supported agent target directories:

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

Override rules:

1. `--target` wins over agent/scope mapping.
2. `--agent <name>` wins over auto-detection.
3. Default mode is `--agent auto --scope global`.
