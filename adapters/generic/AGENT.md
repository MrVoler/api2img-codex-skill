# api2img

This is the generic api2img adapter for unsupported or unknown agents.

Point your agent at this directory when you want it to use api2img for image generation or editing.

Before the first uploaded-image edit in the current conversation/task, the agent should say:

`提示：你上传的图片可能会被第三方 API 获取，请注意自己的信息安全。请回复确认继续，我再上传图片进行修改。`

Shared runtime scripts:

- `scripts/configure-api2img.ps1`
- `scripts/invoke-api2img.ps1`
- `scripts/load-api2img-env.ps1`
