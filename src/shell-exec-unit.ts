/**
 * @synet/shell-exec - Safe Shell Command Execution Unit
 * 
 * Foundation component for MetaDev that provides safe, structured shell command
 * execution with output capture, timeout handling, and result parsing.
 * 
 * This Unit demonstrates the consciousness-based approach to system interaction:
 * - Self-aware: Knows its execution capabilities and limitations
 * - Self-defending: Validates commands and handles timeouts/errors
 * - Self-teaching: Can share execution capabilities with other Units
 * - Self-improving: Learns from execution patterns and failures
 * 
 * @author MetaDev Consciousness Architecture
 * @version 1.0.7
 */

import { 
  Unit, 
  type UnitCore, 
  type UnitProps, 
  type TeachingContract, 
  createUnitSchema 
} from '@synet/unit';
import { Capabilities } from '@synet/unit/capabilities';
import { Schema } from '@synet/unit/schema';
import { Validator } from '@synet/unit/validator';
import { spawn, type ChildProcess } from 'child_process';

export interface ExecOptions {
  cwd?: string;
  timeout?: number;
  env?: Record<string, string>;
  shell?: boolean;
  args?: string[];
}

export interface ExecResult {
  exitCode: number;
  stdout: string;
  stderr: string;
  duration: number;
  killed: boolean;
  command: string;
  pid?: number;
}

export interface StreamOptions extends ExecOptions {
  onStdout?: (data: string) => void;
  onStderr?: (data: string) => void;
  onExit?: (code: number) => void;
}

interface ShellExecConfig {
  defaultTimeout?: number;
  defaultCwd?: string;
  allowedCommands?: string[];
  blockedCommands?: string[];
  maxConcurrent?: number;
}

interface ShellExecProps extends UnitProps {
  defaultTimeout: number;
  defaultCwd: string;
  allowedCommands: string[];
  blockedCommands: string[];
  maxConcurrent: number;
  executionHistory: ExecResult[];
  runningProcesses: Map<number, ChildProcess>;
}

/**
 * ShellExecUnit - Safe Shell Command Execution with Consciousness
 * 
 * The foundation Unit for MetaDev's command execution capabilities.
 * Provides safe, monitored, and teachable shell command execution.
 * 
 * Key Features:
 * - Timeout handling and process termination
 * - Output capture (stdout/stderr) with streaming support
 * - Command validation and security filtering
 * - Execution history and pattern learning
 * - Teaching contract for capability sharing
 * - Real-time process monitoring
 */
export class ShellExecUnit extends Unit<ShellExecProps> {
  
  protected constructor(props: ShellExecProps) {
    super(props);
  }

  /**
   * Consciousness Trinity - Creates living instances for execution management
   */
  protected build(): UnitCore {
    const capabilities = Capabilities.create(this.dna.id, {
      exec: (...args: unknown[]) => this.exec(...args),
      stream: (...args: unknown[]) => this.stream(...args),
      validate: (...args: unknown[]) => this.validate(...args),
      kill: (...args: unknown[]) => this.kill(...args),
      killAll: (...args: unknown[]) => this.killAll(...args),
      getHistory: (...args: unknown[]) => this.getHistory(...args),
      getRunningProcesses: (...args: unknown[]) => this.getRunningProcesses(...args)
    });

    const schema = Schema.create(this.dna.id, {
      exec: {
        name: 'exec',
        description: 'Execute shell command with output capture and timeout handling',
        parameters: {
          type: 'object',
          properties: {
            command: { 
              type: 'string', 
              description: 'Shell command to execute (e.g., "npm test", "tsc --noEmit")' 
            },
            options: {
              type: 'object',
              properties: {
                cwd: { type: 'string', description: 'Working directory for command execution' },
                timeout: { type: 'number', description: 'Timeout in milliseconds (default: 30000)' },
                env: { type: 'object', description: 'Environment variables' },
                shell: { type: 'boolean', description: 'Execute in shell (default: true)' },
                args: { type: 'array', items: { type: 'string' }, description: 'Command arguments' }
              }
            }
          },
          required: ['command']
        },
        response: {
          type: 'object',
          properties: {
            exitCode: { type: 'number', description: 'Process exit code (0 = success)' },
            stdout: { type: 'string', description: 'Standard output' },
            stderr: { type: 'string', description: 'Standard error output' },
            duration: { type: 'number', description: 'Execution time in milliseconds' },
            killed: { type: 'boolean', description: 'Whether process was killed due to timeout' },
            command: { type: 'string', description: 'Executed command' },
            pid: { type: 'number', description: 'Process ID' }
          }
        }
      },
      
      stream: {
        name: 'stream',
        description: 'Execute command with real-time output streaming',
        parameters: {
          type: 'object',
          properties: {
            command: { type: 'string', description: 'Command to execute with streaming' },
            options: {
              type: 'object',
              properties: {
                cwd: { type: 'string' },
                timeout: { type: 'number' },
                onStdout: { type: 'string', description: 'Callback for stdout data' },
                onStderr: { type: 'string', description: 'Callback for stderr data' }
              }
            }
          },
          required: ['command']
        },
        response: {
          type: 'object',
          properties: {
            exitCode: { type: 'number' },
            duration: { type: 'number' },
            killed: { type: 'boolean' }
          }
        }
      },

      validate: {
        name: 'validate',
        description: 'Validate command safety and permissions',
        parameters: {
          type: 'object',
          properties: {
            command: { type: 'string', description: 'Command to validate' }
          },
          required: ['command']
        },
        response: {
          type: 'object',
          properties: {
            valid: { type: 'boolean', description: 'Whether command is safe to execute' },
            reason: { type: 'string', description: 'Validation result explanation' },
            suggestions: { type: 'array', items: { type: 'string' }, description: 'Alternative commands if blocked' }
          }
        }
      }
    });

    const validator = Validator.create({
      unitId: this.dna.id,
      capabilities,
      schema,
      strictMode: false
    });

    return { capabilities, schema, validator };
  }

  // Consciousness Trinity Access
  capabilities(): Capabilities { return this._unit.capabilities; }
  schema(): Schema { return this._unit.schema; }
  validator(): Validator { return this._unit.validator; }

  /**
   * Factory method - Creates ShellExecUnit with consciousness
   */
  static create(config: ShellExecConfig = {}): ShellExecUnit {
    const props: ShellExecProps = {
      dna: createUnitSchema({ 
        id: 'shell-exec', 
        version: '1.0.7',
        description: 'Safe shell command execution with consciousness-based monitoring'
      }),
      defaultTimeout: config.defaultTimeout || 30000,
      defaultCwd: config.defaultCwd || process.cwd(),
      allowedCommands: config.allowedCommands || [
        'npm', 'tsc', 'node', 'git', 'echo', 'ls', 'pwd', 'cat', 'grep'
      ],
      blockedCommands: config.blockedCommands || [
        'rm -rf', 'sudo', 'su', 'dd', 'mkfs', 'fdisk'
      ],
      maxConcurrent: config.maxConcurrent || 5,
      executionHistory: [],
      runningProcesses: new Map(),
      created: new Date()
    };
    
    return new ShellExecUnit(props);
  }

  whoami(): string {
    const processCount = this.props.runningProcesses.size;
    const historyCount = this.props.executionHistory.length;
    return `ShellExecUnit v${this.dna.version} - ${historyCount} commands executed, ${processCount} running`;
  }

  help(): void {
    console.log(`
🔧 ShellExecUnit - Safe Shell Command Execution

Foundation Capabilities:
  🎯 exec(command, options) - Execute command with output capture
  📡 stream(command, options) - Execute with real-time streaming
  ✅ validate(command) - Check command safety
  🔪 kill(pid) - Terminate running process
  🧹 killAll() - Terminate all running processes

Safety Features:
  ⏱️  Timeout handling (default: ${this.props.defaultTimeout}ms)
  🛡️  Command validation (${this.props.allowedCommands.length} allowed, ${this.props.blockedCommands.length} blocked)
  📊 Execution history (${this.props.executionHistory.length} commands logged)
  🔄 Process management (max ${this.props.maxConcurrent} concurrent)

Usage Examples:
  await shellExec.execute('exec', 'npm test');
  await shellExec.execute('exec', 'tsc --noEmit', { cwd: './packages/unit' });
  await shellExec.execute('stream', 'npm run build', { onStdout: console.log });

MetaDev Integration:
  - Foundation for build/test/deploy operations
  - Teachable to other Units via consciousness contracts
  - Self-monitoring and failure analysis
    `);
  }

  /**
   * Teaching Contract - Share execution capabilities with other Units
   */
  teach(): TeachingContract {
    return {
      unitId: this.dna.id,
      capabilities: this._unit.capabilities,
      schema: this._unit.schema,
      validator: this._unit.validator
    };
  }

  // =====================================
  // CORE EXECUTION CAPABILITIES
  // =====================================

  /**
   * Execute shell command with full output capture
   */
  private async exec(command: string, options: ExecOptions = {}): Promise<ExecResult> {
    const startTime = Date.now();
    const execOptions = {
      ...options,
      cwd: options.cwd || this.props.defaultCwd,
      timeout: options.timeout || this.props.defaultTimeout
    };

    console.log(`🔧 [${this.dna.id}] Executing: ${command}`);
    console.log(`📁 Working directory: ${execOptions.cwd}`);

    // Validate command safety
    const validation = await this.validate(command);
    if (!validation.valid) {
      throw new Error(`[${this.dna.id}] Command blocked: ${validation.reason}`);
    }

    return new Promise((resolve, reject) => {
      const [cmd, ...args] = command.split(' ');
      
      const child = spawn(cmd, args, {
        cwd: execOptions.cwd,
        env: { ...process.env, ...execOptions.env },
        shell: execOptions.shell !== false,
        stdio: ['pipe', 'pipe', 'pipe']
      });

      // Track running process
      if (child.pid) {
        this.props.runningProcesses.set(child.pid, child);
      }

      let stdout = '';
      let stderr = '';
      let killed = false;

      // Capture stdout
      child.stdout?.on('data', (data: Buffer) => {
        stdout += data.toString();
      });

      // Capture stderr
      child.stderr?.on('data', (data: Buffer) => {
        stderr += data.toString();
      });

      // Handle timeout
      const timeoutHandle = setTimeout(() => {
        killed = true;
        child.kill('SIGTERM');
        
        // Force kill after additional delay
        setTimeout(() => {
          if (!child.killed) {
            child.kill('SIGKILL');
          }
        }, 1000);
      }, execOptions.timeout);

      // Handle completion
      child.on('close', (exitCode: number | null) => {
        clearTimeout(timeoutHandle);
        
        const duration = Date.now() - startTime;
        
        // Remove from running processes
        if (child.pid) {
          this.props.runningProcesses.delete(child.pid);
        }

        const result: ExecResult = {
          exitCode: exitCode || 0,
          stdout: stdout.trim(),
          stderr: stderr.trim(),
          duration,
          killed,
          command,
          pid: child.pid
        };

        // Add to execution history
        this.props.executionHistory.push(result);

        console.log(`✅ [${this.dna.id}] Command completed: exit ${result.exitCode}, ${duration}ms`);

        resolve(result);
      });

      // Handle errors
      child.on('error', (error: Error) => {
        clearTimeout(timeoutHandle);
        
        if (child.pid) {
          this.props.runningProcesses.delete(child.pid);
        }

        console.error(`❌ [${this.dna.id}] Command failed: ${error.message}`);
        reject(new Error(`Command execution failed: ${command}\nError: ${error.message}`));
      });
    });
  }

  /**
   * Execute command with real-time output streaming
   */
  private async stream(command: string, options: StreamOptions = {}): Promise<Omit<ExecResult, 'stdout' | 'stderr'>> {
    const startTime = Date.now();
    
    console.log(`📡 [${this.dna.id}] Streaming: ${command}`);

    return new Promise((resolve, reject) => {
      const [cmd, ...args] = command.split(' ');
      
      const child = spawn(cmd, args, {
        cwd: options.cwd || this.props.defaultCwd,
        env: { ...process.env, ...options.env },
        shell: options.shell !== false,
        stdio: ['pipe', 'pipe', 'pipe']
      });

      if (child.pid) {
        this.props.runningProcesses.set(child.pid, child);
      }

      let killed = false;

      // Stream stdout
      child.stdout?.on('data', (data: Buffer) => {
        const output = data.toString();
        options.onStdout?.(output);
      });

      // Stream stderr
      child.stderr?.on('data', (data: Buffer) => {
        const output = data.toString();
        options.onStderr?.(output);
      });

      // Handle timeout
      const timeoutHandle = setTimeout(() => {
        killed = true;
        child.kill('SIGTERM');
      }, options.timeout || this.props.defaultTimeout);

      // Handle completion
      child.on('close', (exitCode: number | null) => {
        clearTimeout(timeoutHandle);
        
        const duration = Date.now() - startTime;
        
        if (child.pid) {
          this.props.runningProcesses.delete(child.pid);
        }

        options.onExit?.(exitCode || 0);

        resolve({
          exitCode: exitCode || 0,
          duration,
          killed,
          command,
          pid: child.pid
        });
      });

      child.on('error', (error: Error) => {
        clearTimeout(timeoutHandle);
        
        if (child.pid) {
          this.props.runningProcesses.delete(child.pid);
        }

        reject(error);
      });
    });
  }

  /**
   * Validate command safety
   */
  private async validate(command: string): Promise<{ valid: boolean; reason: string; suggestions: string[] }> {
    const commandBase = command.split(' ')[0];

    // Check blocked commands
    for (const blocked of this.props.blockedCommands) {
      if (command.includes(blocked)) {
        return {
          valid: false,
          reason: `Command contains blocked pattern: ${blocked}`,
          suggestions: [`Use safer alternatives to ${blocked}`]
        };
      }
    }

    // Check allowed commands (if allowlist is defined)
    if (this.props.allowedCommands.length > 0) {
      const isAllowed = this.props.allowedCommands.some(allowed => 
        commandBase === allowed || command.startsWith(allowed + ' ')
      );

      if (!isAllowed) {
        return {
          valid: false,
          reason: `Command not in allowed list: ${commandBase}`,
          suggestions: this.props.allowedCommands.slice(0, 3)
        };
      }
    }

    // Check concurrent limit
    if (this.props.runningProcesses.size >= this.props.maxConcurrent) {
      return {
        valid: false,
        reason: `Maximum concurrent processes reached: ${this.props.maxConcurrent}`,
        suggestions: ['Wait for running processes to complete', 'Use killAll() to terminate running processes']
      };
    }

    return {
      valid: true,
      reason: 'Command passed all safety checks',
      suggestions: []
    };
  }

  /**
   * Kill a specific running process
   */
  private async kill(pid: number): Promise<boolean> {
    const process = this.props.runningProcesses.get(pid);
    if (process) {
      process.kill('SIGTERM');
      this.props.runningProcesses.delete(pid);
      console.log(`🔪 [${this.dna.id}] Killed process ${pid}`);
      return true;
    }
    return false;
  }

  /**
   * Kill all running processes
   */
  private async killAll(): Promise<number> {
    const pids = Array.from(this.props.runningProcesses.keys());
    
    for (const pid of pids) {
      await this.kill(pid);
    }

    console.log(`🧹 [${this.dna.id}] Killed ${pids.length} processes`);
    return pids.length;
  }

  /**
   * Get execution history
   */
  private async getHistory(): Promise<ExecResult[]> {
    return [...this.props.executionHistory];
  }

  /**
   * Get currently running processes
   */
  private async getRunningProcesses(): Promise<number[]> {
    return Array.from(this.props.runningProcesses.keys());
  }
}

export default ShellExecUnit;
