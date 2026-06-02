# api2img

Use api2img when the user asks to generate, edit, or modify an image through a third-party image API.

Before the first uploaded-image edit in the current conversation/task, ask for confirmation:

`提示：你上传的图片可能会被第三方 API 获取，请注意自己的信息安全。请回复确认继续，我再上传图片进行修改。`

Use these scripts:

- `scripts/configure-api2img.ps1` for base URL and key setup
- `scripts/invoke-api2img.ps1` for `generate` and `edit`
- `scripts/load-api2img-env.ps1` for loading the isolated runtime env

Do not overwrite the user's normal `OPENAI_API_KEY` or `OPENAI_BASE_URL`.
