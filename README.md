# Api2img Skill

[中文](README.md) | [English](README.en.md)

## 功能

`解决通过第三方 API 使用 Codex 的用户无法生图的问题`。

api2img 专门面向通过中转 API 使用 Codex，同时又有图片生成&编辑需求的人。

## 优势

- **简单**：一条指令安装。
- **安全**：API Key 使用 Windows DPAPI 保存到当前用户本机，不要求把密钥贴到聊天里。
- **不污染环境**：不会覆盖你原来的 `OPENAI_API_KEY`、`OPENAI_BASE_URL` 等变量，只在子进程里临时映射。

## 安装

方式1（小白推荐）：直接告诉你的 Agent：

```powershell
帮我安装这个 codex 技能：npx api2img
```

方式2：命令行输入：

```powershell
npx api2img
```

## 生图 API 中转商推荐

[https://cc-vibe.com](https://cc-vibe.com/register?aff=7LBQWRFY5ETG)

朋友搭的，低价走量：

- 个人请求数据每天删除，隐私放心
- 支持生图，1k图/张=1毛，2k图/张=2毛，4k图/张=3毛
- claude code/codex 都有（10块200刀额度，地板价可验模型）

---

## 支持功能

会在必要时自动被 codex 调用，正常生图用也可以使用，比如：

- 【生成】生成一张xxx图
- 【修改】替换图片里的某个部分
- 【上传】修改我上传图片里的xxx

### 其他功能

用自然语言跟 Codex 说：

```powershell
我要修改 api2img 技能的 url 与 apikey
```

```powershell
我要删除 api2img 技能的 url 与 apikey
```

## 注意

- 生成图片会把提示词、上传的图片发送到你配置的三方中转商，如果是不熟悉的中转商，不要处理身份证件、人脸、工作机密等各类私人敏感内容。
