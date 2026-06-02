# api2img

Use api2img when the user needs image generation or image editing through a third-party image API.

Before the first uploaded-image edit in the current conversation/task, ask for confirmation:

`提示：你上传的图片可能会被第三方 API 获取，请注意自己的信息安全。请回复确认继续，我再上传图片进行修改。`

Use these shared scripts:

- `scripts/configure-api2img.ps1`
- `scripts/invoke-api2img.ps1`
- `scripts/load-api2img-env.ps1`
