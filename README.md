# Api2img Skill

[中文](README.md) | [English](README.en.md)

## 功能

`解决通过第三方 API 使用各种 Agent 时无法生图的问题`。

api2img 专门面向通过中转 API 使用 Agent，同时又有图片生成和图片编辑需求的人。它现在不仅可以服务 Codex，也在开始支持 Claude Code、OpenClaw、Hermes，以及其他可以手动指向技能目录的 Agent。

## 优势

- **简单**：一条指令安装，并支持自动识别 Agent。
- **安全**：API Key 使用 Windows DPAPI 保存到当前用户本机，不要求把密钥贴到聊天里。
- **不污染环境**：不会覆盖你原来的 `OPENAI_API_KEY`、`OPENAI_BASE_URL` 等变量，只在子进程里临时映射。
- **支持多 Agent**：默认优先安装到全局目录，也支持项目级安装。

## 安装

方式1（推荐）：直接让 Agent 执行：

```powershell
npx api2img
```

默认行为：

- 自动识别当前 Agent
- 默认安装到全局目录
- 如果识别不到已知 Agent，则安装到全局 generic 目录

也可以手动指定：

```powershell
npx api2img --agent claude-code
npx api2img --agent openclaw --scope project
npx api2img --agent hermes --scope global
npx api2img --agent generic
```

查看安装计划但不真正安装：

```powershell
npx api2img --print-plan
```

## 目标目录

当前支持这些 Agent 目标：

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

## 生图 API 中转商推荐

[https://cc-vibe.com](https://cc-vibe.com/register?aff=7LBQWRFY5ETG)

朋友搭的，低价走量：

- 个人请求数据每天删除，隐私放心
- 支持生图，1k图/张=1毛，2k图/张=2毛，4k图/张=3毛
- claude code/codex 都有（10块200刀额度，地板价可验模型）

---

## 支持功能

会在必要时自动被 Agent 调用，正常生图用也可以使用，比如：

- 【生成】生成一张xxx图
- 【修改】替换图片里的某个部分
- 【上传】修改我上传图片里的xxx

### 其他功能

用自然语言跟 Agent 说：

```powershell
我要修改 api2img 技能的 url 与 apikey
```

```powershell
我要删除 api2img 技能的 url 与 apikey
```

## 注意

- 生成图片会把提示词、上传的图片发送到你配置的三方中转商，如果是不熟悉的中转商，不要处理身份证件、人脸、工作机密等各类私人敏感内容。
- 第一次上传图片进行修改前，Agent 应该先提醒用户图片可能会被第三方 API 获取，并等待确认。
