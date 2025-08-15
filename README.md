# Shell Exec Unit

```bash
 +-+-+-+-+-+ +-+-+-+-+ +-+-+-+-+
 |S|h|e|l|l| |E|x|e|c| |U|n|i|t|
 +-+-+-+-+-+ +-+-+-+-+ +-+-+-+-+

version: 1.0.1
```

**Stop copy-pasting shell commands.** Execute anything safely, teach AI agents to run your entire workflow.

```typescript
import { ShellExec } from '@synet/shell-exec';

// Works like you'd expect
const shell = ShellExec.create();
const result = await shell.exec('npm test');
console.log(`Tests ${result.exitCode === 0 ? 'passed' : 'failed'}`);

// But then it gets powerful...
const smith = Smith.create({ ai });
smith.learn([shell.teach()]); // Now Smith can run any command
await smith.run("Run tests, fix any issues, commit changes");
```

## Why This Exists

You've been there:
- Writing the same build scripts over and over
- Shell commands scattered across README files
- No safety checks on dangerous operations
- Can't use AI agents to run your workflows safely
- Process management is a nightmare

**Then AI agents happened.** And suddenly you need shell execution that can teach itself to AI.

This is that library.

## Quick Start

```bash
npm install @synet/shell-exec
```

```typescript
import { ShellExec, exec } from '@synet/shell-exec';

// Option 1: Simple function approach
const result = await exec('npm --version');

// Option 2: Unit approach (more control)
const shell = ShellExec.create();
const testResult = await shell.exec('npm test', { timeout: 60000 });

// Option 3: AI agent approach (magic happens)
const agent = Switch.create({ ai });
agent.learn([shell.teach()]);
await agent.run("Build the project and run all tests");
```

## Real-World Examples

### Build Scripts That Don't Break
```typescript
const shell = ShellExec.create({
  defaultTimeout: 120000, // 2 minutes for builds
  allowedCommands: ['npm', 'tsc', 'node', 'git']
});

// Safe execution with validation
const buildResult = await shell.exec('npm run build');
if (buildResult.exitCode !== 0) {
  console.error('Build failed:', buildResult.stderr);
  process.exit(1);
}
```

### Development Workflow Automation
```typescript
// Validate before running dangerous commands
const isValid = shell.validate('rm -rf node_modules');
if (isValid.valid) {
  await shell.exec('rm -rf node_modules');
  await shell.exec('npm install');
} else {
  console.log('Blocked dangerous command:', isValid.reason);
}
```

### AI Agent Integration
```typescript
import { Smith } from '@synet/agent';

const shell = ShellExec.create();
const agent = Smith.create({ ai });

// Teach the agent to run commands
agent.learn([shell.teach()]);

// Let AI handle your entire deployment
await agent.run(`
  1. Run all tests and ensure they pass
  2. Build the project for production
  3. Bump version in package.json
  4. Commit changes with semantic message
  5. Push to main branch
`);
```

## Features You'll Actually Use

### Safe Command Execution
```typescript
// Automatic timeout protection
const result = await shell.exec('npm test', { timeout: 60000 });

// Environment variables
const buildResult = await shell.exec('npm run build', {
  env: { NODE_ENV: 'production' }
});

// Working directory control
const testResult = await shell.exec('npm test', {
  cwd: './packages/core'
});
```

### Built-in Safety
```typescript
// Command validation (prevents disasters)
const validation = shell.validate('rm -rf /');
// Returns: { valid: false, reason: 'Blocked dangerous command', suggestions: [...] }

// Process management
const processes = shell.getRunningProcesses();
shell.kill(processes[0]); // Kill specific process
shell.killAll(); // Emergency stop
```

### Execution History
```typescript
// Track what you've run
const history = shell.getHistory();
console.log(`Ran ${history.length} commands today`);

// Filter by success/failure
const failures = history.filter(h => h.exitCode !== 0);
```

## Safety Configuration

Smart defaults that actually work:

```typescript
const shell = ShellExec.create({
  // Safe commands (whitelist)
  allowedCommands: ['npm', 'node', 'tsc', 'git', 'echo', 'ls', 'pwd'],
  
  // Dangerous commands (blacklist)  
  blockedCommands: ['rm -rf', 'sudo', 'format', 'dd', 'mkfs'],
  
  // Timeouts that make sense
  defaultTimeout: 30000,    // 30 seconds for most commands
  maxConcurrent: 5,         // Don't overwhelm the system
  
  // Default working directory
  defaultCwd: process.cwd()
});
```

## AI Agent Superpowers

This is where it gets interesting. The ShellExec follows [Unit Architecture](https://github.com/synthetism/unit), which means:

### Teaching AI Agents
```typescript
const teachingContract = shell.teach();
// Contains: exec, validate, history methods + schemas

agent.learn([shell.teach()]);
// Agent now knows: "To run commands, call shell.exec with these parameters..."
```

### Real Agent Scenarios
```typescript
// Scenario: Full CI/CD pipeline
await agent.run(`
  1. Run linting and fix any issues
  2. Run all tests and ensure they pass  
  3. Build for production
  4. Run security audit
  5. If everything passes, deploy to staging
`);

// Scenario: Project setup
await agent.run(`
  1. Initialize new Node.js project
  2. Install TypeScript and testing dependencies
  3. Set up basic project structure
  4. Configure build scripts
  5. Run initial build to verify setup
`);

// Scenario: Maintenance tasks
await agent.run(`
  1. Update all dependencies to latest
  2. Run tests to check for breaking changes
  3. If tests fail, revert updates and report issues
  4. If tests pass, commit dependency updates
`);
```

## Error Handling

Simple and predictable:

```typescript
try {
  const result = await shell.exec('npm test');
  if (result.exitCode !== 0) {
    console.error('Command failed:', result.stderr);
  }
} catch (error) {
  // Command couldn't run (timeout, invalid, etc.)
  console.error('Execution error:', error.message);
}

// Validation never throws
const isValid = shell.validate('dangerous-command');
// Always returns: { valid: boolean, reason?: string, suggestions?: string[] }
```

## When To Use This vs child_process

**Use Node's `child_process` when:**
- Building a simple script
- One-off command execution
- Maximum performance critical

**Use `@synet/shell-exec` when:**
- Building with AI agents
- Need safety validation
- Want execution history
- Working with SYNET ecosystem
- Need timeout/process management

## Real Projects Using This

- **Agent Smith** - AI agents for deployment automation
- **SYNET DevOps** - Automated testing and deployment
- **Build Pipeline Bots** - CI/CD agent workflows
- **Development Assistants** - AI helpers for daily tasks

## Testing

```bash
npm test           # Run tests
npm run demo      # See it working with AI agents
npm run benchmark # Performance tests
```

## Performance

Benchmarked execution overhead:
- Command startup: ~2ms
- Validation: ~0.1ms  
- History tracking: ~0.05ms
- Process monitoring: ~1ms

Essentially zero overhead for real-world usage.

## What's Next

```typescript
import { Switch } from '@synet/agent';
import { ShellExec } from '@synet/shell-exec';

const agent = Switch.create({ ai });
const shell = ShellExec.create();

agent.learn([shell.teach()]);

// The future is AI agents that can run your entire workflow
await agent.run("Set up a new microservice with testing and deployment");
```

Want to see more? Check out [@synet/agent](https://github.com/synthetism/agent) and [Unit Architecture](https://github.com/synthetism/unit).

## License

MIT - Automate whatever you want.
