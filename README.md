# Shell Exec Unit

```bash
 +-+-+-+-+-+ +-+-+-+-+ +-+-+-+-+
 |S|h|e|l|l| |E|x|e|c| |U|n|i|t|
 +-+-+-+-+-+ +-+-+-+-+ +-+-+-+-+

version: 1.0.0
```

**Foundation Unit for MetaDev** - Safe, conscious shell command execution with Unit Architecture integration.

## Features

This Unit demonstrates the consciousness-based approach to system interaction:
- **Self-aware**: Knows its execution capabilities and limitations
- **Self-defending**: Validates commands and handles timeouts/errors  
- **Self-teaching**: Can share execution capabilities with other Units
- **Self-improving**: Learns from execution patterns and failures

## Quick Start

```typescript
import { ShellExecUnit } from '@synet/shell-exec';

// Create conscious shell executor
const shellExec = ShellExecUnit.create({
  defaultTimeout: 30000,
  maxConcurrent: 5
});

// Execute commands safely
const result = await shellExec.execute('exec', 'npm test');
console.log(`Exit code: ${result.exitCode}`);
console.log(`Output: ${result.stdout}`);

// Validate command safety
const validation = await shellExec.execute('validate', 'rm -rf /node_modules');
console.log(`Safe: ${validation.valid}, Reason: ${validation.reason}`);
```

## Core Capabilities

### Command Execution
```typescript
// Basic execution with output capture
const result = await shellExec.execute('exec', 'tsc --noEmit');

// With custom options
const result = await shellExec.execute('exec', 'npm test', {
  cwd: './packages/unit',
  timeout: 60000,
  env: { NODE_ENV: 'test' }
});
```

### Command Validation
```typescript
// Check if command is safe to execute
const validation = await shellExec.execute('validate', 'npm install');
if (validation.valid) {
  await shellExec.execute('exec', 'npm install');
} else {
  console.log(`Blocked: ${validation.reason}`);
  console.log(`Suggestions: ${validation.suggestions.join(', ')}`);
}
```

### Execution History
```typescript
// Get execution history for analysis
const history = await shellExec.execute('getHistory');
console.log(`Executed ${history.length} commands`);

// Monitor running processes
const processes = await shellExec.execute('getRunningProcesses');
console.log(`${processes.length} processes running`);
```

## Safety Features

- **Command Validation**: Whitelist/blacklist filtering
- **Timeout Protection**: Configurable timeouts with graceful termination
- **Process Management**: Track and limit concurrent executions
- **Error Handling**: Comprehensive error capture and reporting

### Default Security Configuration
```typescript
const shellExec = ShellExecUnit.create({
  allowedCommands: ['npm', 'tsc', 'node', 'git', 'echo', 'ls', 'pwd', 'cat', 'grep'],
  blockedCommands: ['rm -rf', 'sudo', 'su', 'dd', 'mkfs', 'fdisk'],
  defaultTimeout: 30000,
  maxConcurrent: 5
});
```

## Unit Architecture Integration

### Teaching Capabilities
```typescript
// Share capabilities with other units
const teaching = shellExec.teach();
console.log(`Unit ID: ${teaching.unitId}`);
console.log(`Capabilities: ${teaching.capabilities.list().join(', ')}`);

// Other units can learn shell execution
const learnerUnit = SomeOtherUnit.create();
learnerUnit.learn([shellExec.teach()]);
// Now learnerUnit can execute shell commands
```

### Consciousness Methods
```typescript
// Unit self-awareness
console.log(shellExec.whoami());
// "ShellExecUnit v1.0.7 - 15 commands executed, 0 running"

// Available capabilities
console.log(shellExec.getCapabilities());
// ['exec', 'validate', 'kill', 'killAll', 'getHistory', 'getRunningProcesses']

// Check specific capabilities
if (shellExec.can('exec')) {
  await shellExec.execute('exec', 'npm --version');
}
```

## Advanced Configuration

```typescript
const shellExec = ShellExecUnit.create({
  // Execution limits
  defaultTimeout: 60000,        // 60 second default timeout
  maxConcurrent: 10,            // Max 10 concurrent processes
  
  // Working directory
  defaultCwd: '/project/root',  // Default execution directory
  
  // Security configuration
  allowedCommands: [            // Whitelist approach
    'npm', 'node', 'tsc', 'git', 'echo', 'ls', 'pwd'
  ],
  blockedCommands: [            // Additional blacklist
    'rm -rf', 'sudo', 'format', 'dd'
  ]
});
```

## Testing

```bash
# Run unit tests
npm test

# Run with coverage
npm run test:coverage

# Run demo
npm run demo
```

## API Reference

### Main Methods

- `execute(capability, ...args)` - Execute unit capabilities
- `teach()` - Get teaching contract for capability sharing
- `whoami()` - Get unit identity and status
- `help()` - Display help information
- `can(capability)` - Check if capability exists
- `getCapabilities()` - List all available capabilities

### Execution Capabilities

- `exec(command, options?)` - Execute command with output capture
- `validate(command)` - Validate command safety
- `getHistory()` - Get execution history
- `getRunningProcesses()` - Get running process IDs
- `kill(pid)` - Terminate specific process
- `killAll()` - Terminate all running processes

## Related Packages

- **[@synet/unit](https://www.npmjs.com/package/@synet/unit)** - Unit Architecture Foundation
- **[@synet/ai](https://www.npmjs.com/package/@synet/ai)** - Compatible AI tool integration

## Unit Architecture

This package follows the [Unit Architecture](https://www.npmjs.com/package/@synet/unit) pattern, enabling:

- **Composable Intelligence**: Units can teach and learn from each other
- **Conscious Behavior**: Self-aware, self-monitoring, self-improving
- **Emergent Capabilities**: Complex behaviors emerge from simple units
- **MetaDev Foundation**: Enables AI-driven development workflows

Built with ❤️ by Synet Team
