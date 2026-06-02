#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");
const home = process.env.USERPROFILE || process.env.HOME;
const cwd = process.cwd();

if (!home) {
  console.error("Cannot find USERPROFILE or HOME. Please install manually into an agent skill directory.");
  process.exit(1);
}

const excludedNames = new Set([
  "api2img-api-key.dpapi.txt",
  "node_modules",
  "output",
  ".git"
]);

const AGENTS = new Set(["auto", "codex", "claude-code", "openclaw", "hermes", "generic"]);
const SCOPES = new Set(["global", "project"]);

function parseArgs(argv) {
  const options = {
    agent: "auto",
    scope: "global",
    workspace: cwd,
    target: null,
    force: false,
    printPlan: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    if (arg === "--force") {
      options.force = true;
      continue;
    }

    if (arg === "--print-plan") {
      options.printPlan = true;
      continue;
    }

    if (arg === "--agent" && next) {
      options.agent = next;
      i += 1;
      continue;
    }

    if (arg === "--scope" && next) {
      options.scope = next;
      i += 1;
      continue;
    }

    if (arg === "--workspace" && next) {
      options.workspace = path.resolve(next);
      i += 1;
      continue;
    }

    if (arg === "--target" && next) {
      options.target = path.resolve(next);
      i += 1;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  if (!AGENTS.has(options.agent)) {
    throw new Error(`Unsupported agent: ${options.agent}`);
  }

  if (!SCOPES.has(options.scope)) {
    throw new Error(`Unsupported scope: ${options.scope}`);
  }

  return options;
}

function printHelp() {
  console.log("Usage: npx api2img [--agent auto|codex|claude-code|openclaw|hermes|generic] [--scope global|project] [--workspace <path>] [--target <path>] [--force] [--print-plan]");
}

function pathExists(targetPath) {
  try {
    fs.accessSync(targetPath);
    return true;
  } catch {
    return false;
  }
}

function detectAgent(workspace) {
  const checks = [
    { agent: "claude-code", hit: pathExists(path.join(workspace, ".claude")) || pathExists(path.join(home, ".claude")) },
    { agent: "openclaw", hit: pathExists(path.join(workspace, "skills")) || pathExists(path.join(home, ".openclaw")) },
    { agent: "hermes", hit: pathExists(path.join(workspace, ".hermes")) || pathExists(path.join(home, ".hermes")) },
    { agent: "codex", hit: pathExists(path.join(workspace, ".codex")) || pathExists(path.join(home, ".codex")) },
  ];

  const match = checks.find((item) => item.hit);
  return match ? match.agent : "generic";
}

function resolveTarget(agent, scope, workspace, overrideTarget) {
  if (overrideTarget) {
    return overrideTarget;
  }

  const globalTargets = {
    codex: path.join(home, ".codex", "skills", "api2img"),
    "claude-code": path.join(home, ".claude", "commands", "api2img"),
    openclaw: path.join(home, ".openclaw", "skills", "api2img"),
    hermes: path.join(home, ".hermes", "skills", "api2img"),
    generic: path.join(home, ".agent-skills", "api2img"),
  };

  const projectTargets = {
    codex: path.join(workspace, ".codex", "skills", "api2img"),
    "claude-code": path.join(workspace, ".claude", "commands", "api2img"),
    openclaw: path.join(workspace, "skills", "api2img"),
    hermes: path.join(workspace, ".hermes", "skills", "api2img"),
    generic: path.join(workspace, ".agent-skills", "api2img"),
  };

  return scope === "project" ? projectTargets[agent] : globalTargets[agent];
}

function copyRecursive(source, destination) {
  const stat = fs.statSync(source);

  if (stat.isDirectory()) {
    fs.mkdirSync(destination, { recursive: true });
    for (const child of fs.readdirSync(source)) {
      if (excludedNames.has(child)) continue;
      copyRecursive(path.join(source, child), path.join(destination, child));
    }
    return;
  }

  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

function installPlan(agent, target) {
  const commonEntries = ["README.md", "README.en.md", "scripts", "references"];

  if (agent === "codex") {
    return {
      kind: "skill",
      entries: [...commonEntries, "agents", { from: "adapters/codex/SKILL.md", to: "SKILL.md" }],
    };
  }

  if (agent === "openclaw") {
    return {
      kind: "skill",
      entries: [...commonEntries, { from: "adapters/openclaw/SKILL.md", to: "SKILL.md" }],
    };
  }

  if (agent === "hermes") {
    return {
      kind: "skill",
      entries: [...commonEntries, { from: "adapters/hermes/SKILL.md", to: "SKILL.md" }],
    };
  }

  if (agent === "claude-code") {
    return {
      kind: "commands",
      entries: [...commonEntries, { from: "adapters/claude-code/api2img.md", to: "api2img.md" }],
    };
  }

  return {
    kind: "generic",
    entries: [...commonEntries, { from: "adapters/generic/AGENT.md", to: "AGENT.md" }],
  };
}

function copyEntry(entry, target) {
  if (typeof entry === "string") {
    copyRecursive(path.join(packageRoot, entry), path.join(target, entry));
    return;
  }

  copyRecursive(path.join(packageRoot, entry.from), path.join(target, entry.to));
}

function ensureWritableTarget(target, force) {
  if (!pathExists(target)) {
    return;
  }

  if (force) {
    return;
  }

  const children = fs.readdirSync(target);
  if (children.length > 0) {
    throw new Error(`Target already exists and is not empty: ${target}. Re-run with --force to overwrite.`);
  }
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const resolvedAgent = options.agent === "auto" ? detectAgent(options.workspace) : options.agent;
  const target = resolveTarget(resolvedAgent, options.scope, options.workspace, options.target);
  const plan = installPlan(resolvedAgent, target);

  if (options.printPlan) {
    console.log(JSON.stringify({
      agent: resolvedAgent,
      scope: options.scope,
      workspace: options.workspace,
      target,
      kind: plan.kind,
      entries: plan.entries,
    }, null, 2));
    return;
  }

  ensureWritableTarget(target, options.force);
  fs.mkdirSync(target, { recursive: true });

  for (const entry of plan.entries) {
    copyEntry(entry, target);
  }

  console.log(`api2img installed for ${resolvedAgent} (${options.scope}) at: ${target}`);
  if (resolvedAgent === "generic") {
    console.log("Point your agent at this directory manually if it does not auto-discover skills.");
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
