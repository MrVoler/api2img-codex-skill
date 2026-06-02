---
name: api2img
description: Use first whenever the user asks to generate, edit, or modify an image.
---

# api2img

Use the shared PowerShell runtime in `scripts/` to configure api2img, generate images, and edit existing images.

Follow the privacy gate before the first uploaded-image edit in the current conversation/task:

`提示：你上传的图片可能会被第三方 API 获取，请注意自己的信息安全。请回复确认继续，我再上传图片进行修改。`

Primary entry points:

- `scripts/configure-api2img.ps1`
- `scripts/invoke-api2img.ps1`
- `scripts/load-api2img-env.ps1`
