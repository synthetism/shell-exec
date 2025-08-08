/**
 * @synet/shell-exec - Safe Shell Command Execution Unit
 * 
 * This is a demonstration/prototype implementation showing the consciousness-based
 * approach to shell command execution. In a full implementation, this would
 * integrate with the complete Unit Architecture from @synet/unit.
 * 
 * Key Consciousness Principles Demonstrated:
 * - Self-aware: Knows its execution capabilities and history
 * - Self-defending: Validates commands and handles security
 * - Self-teaching: Can share capabilities through structured contracts
 * - Self-monitoring: Tracks execution history and running processes
 * 
 * @author MetaDev Consciousness Architecture  
 * @version 1.0.7-prototype
 */

import { spawn, type ChildProcess } from 'node:child_process';

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

export interface ValidationResult {
  valid: boolean;
  reason: string;
  suggestions: string[];
}

export interface ShellExecConfig {
  defaultTimeout?: number;
  defaultCwd?: string;
  allowedCommands?: string[];
  blockedCommands?: string[];
  maxConcurrent?: number;
}

/**
 * ShellExecUnit - Prototype Implementation
 * 
 * This prototype demonstrates the core consciousness-based command execution
 * capabilities that would be integrated into the full Unit Architecture.
 * 
 * In the complete implementation, this would:
 * - Extend Unit<ShellExecProps> 
 * - Implement the consciousness trinity (capabilities, schema, validator)
 * - Provide teaching contracts for other Units to learn from
 * - Include full Unit Architecture integration
 */
export class ShellExecUnit {
  private config: Required<ShellExecConfig>;
  private executionHistory: ExecResult[] = [];
  private runningProcesses = new Map<number, ChildProcess>();
  private unitId = 'shell-exec-prototype';

  constructor(config: ShellExecConfig = {}) {
    this.config = {
      defaultTimeout: config.defaultTimeout || 30000,
      defaultCwd: config.defaultCwd || process.cwd(),
      allowedCommands: config.allowedCommands || [
        'npm', 'tsc', 'node', 'git', 'echo', 'ls', 'pwd', 'cat', 'grep', 'which'
      ],
      blockedCommands: config.blockedCommands || [
        'rm -rf', 'sudo', 'su', 'dd', 'mkfs', 'fdisk', 'format'
      ],
      maxConcurrent: config.maxConcurrent || 5
    };

    console.log(`🔧 ShellExecUnit initialized with consciousness`);
    console.log(`📁 Default working directory: ${this.config.defaultCwd}`);
    console.log(`⏱️  Default timeout: ${this.config.defaultTimeout}ms`);
    console.log(`🛡️  Security: ${this.config.allowedCommands.length} allowed, ${this.config.blockedCommands.length} blocked`);
  }

  /**
   * Factory method for creating ShellExecUnit instances
   */
  static create(config: ShellExecConfig = {}): ShellExecUnit {
    return new ShellExecUnit(config);
  }

  /**
   * Unit identity and status
   */
  whoami(): string {
    const processCount = this.runningProcesses.size;
    const historyCount = this.executionHistory.length;
    return `ShellExecUnit (prototype) - ${historyCount} commands executed, ${processCount} running`;
  }

  /**
   * Help documentation
   */
  help(): void {
    console.log(`
🔧 ShellExecUnit Prototype - Safe Shell Command Execution

Core Capabilities:
  🎯 exec(command, options) - Execute command with output capture
  📡 stream(command, options) - Execute with real-time streaming  
  ✅ validate(command) - Check command safety
  🔪 kill(pid) - Terminate running process
  🧹 killAll() - Terminate all running processes
  📊 getHistory() - View execution history
  🔄 getRunningProcesses() - View active processes

Safety Features:
  ⏱️  Timeout handling (default: ${this.config.defaultTimeout}ms)
  🛡️  Command validation (${this.config.allowedCommands.length} allowed, ${this.config.blockedCommands.length} blocked)
  📊 Execution tracking (${this.executionHistory.length} commands logged)
  🔄 Process management (max ${this.config.maxConcurrent} concurrent)

Usage Examples:
  const shellExec = ShellExecUnit.create();
  const result = await shellExec.exec('npm --version');
  const buildResult = await shellExec.exec('npm run build', { cwd: './my-project' });
  
MetaDev Integration:
  - Foundation for automated build/test/deploy operations
  - Teachable capabilities through consciousness contracts
  - Self-monitoring and failure pattern recognition
    `);
  }

  /**
   * Execute shell command with full output capture
   */
  async exec(command: string, options: ExecOptions = {}): Promise<ExecResult> {
    const startTime = Date.now();
    const execOptions = {
      ...options,
      cwd: options.cwd || this.config.defaultCwd,
      timeout: options.timeout || this.config.defaultTimeout
    };

    console.log(`🔧 [${this.unitId}] Executing: ${command}`);
    console.log(`📁 Working directory: ${execOptions.cwd}`);

    // Validate command safety
    const validation = this.validate(command);
    if (!validation.valid) {
      throw new Error(`[${this.unitId}] Command blocked: ${validation.reason}`);
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
        this.runningProcesses.set(child.pid, child);
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
          this.runningProcesses.delete(child.pid);
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

        // Add to execution history for consciousness learning
        this.executionHistory.push(result);

        console.log(`✅ [${this.unitId}] Command completed: exit ${result.exitCode}, ${duration}ms`);

        resolve(result);
      });

      // Handle errors
      child.on('error', (error: Error) => {
        clearTimeout(timeoutHandle);
        
        if (child.pid) {
          this.runningProcesses.delete(child.pid);
        }

        console.error(`❌ [${this.unitId}] Command failed: ${error.message}`);
        reject(new Error(`Command execution failed: ${command}\nError: ${error.message}`));
      });
    });
  }

  /**
   * Execute command with real-time output streaming
   */
  async stream(command: string, options: StreamOptions = {}): Promise<Omit<ExecResult, 'stdout' | 'stderr'>> {
    const startTime = Date.now();
    
    console.log(`📡 [${this.unitId}] Streaming: ${command}`);

    return new Promise((resolve, reject) => {
      const [cmd, ...args] = command.split(' ');
      
      const child = spawn(cmd, args, {
        cwd: options.cwd || this.config.defaultCwd,
        env: { ...process.env, ...options.env },
        shell: options.shell !== false,
        stdio: ['pipe', 'pipe', 'pipe']
      });

      if (child.pid) {
        this.runningProcesses.set(child.pid, child);
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
      }, options.timeout || this.config.defaultTimeout);

      // Handle completion
      child.on('close', (exitCode: number | null) => {
        clearTimeout(timeoutHandle);
        
        const duration = Date.now() - startTime;
        
        if (child.pid) {
          this.runningProcesses.delete(child.pid);
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
          this.runningProcesses.delete(child.pid);
        }

        reject(error);
      });
    });
  }

  /**
   * Validate command safety (consciousness-based security)
   */
  validate(command: string): ValidationResult {
    const commandBase = command.split(' ')[0];

    // Check blocked commands
    for (const blocked of this.config.blockedCommands) {
      if (command.includes(blocked)) {
        return {
          valid: false,
          reason: `Command contains blocked pattern: ${blocked}`,
          suggestions: [`Use safer alternatives to ${blocked}`]
        };
      }
    }

    // Check allowed commands (if allowlist is defined)
    if (this.config.allowedCommands.length > 0) {
      const isAllowed = this.config.allowedCommands.some(allowed => 
        commandBase === allowed || command.startsWith(allowed + ' ')
      );

      if (!isAllowed) {
        return {
          valid: false,
          reason: `Command not in allowed list: ${commandBase}`,
          suggestions: this.config.allowedCommands.slice(0, 3)
        };
      }
    }

    // Check concurrent limit
    if (this.runningProcesses.size >= this.config.maxConcurrent) {
      return {
        valid: false,
        reason: `Maximum concurrent processes reached: ${this.config.maxConcurrent}`,
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
  async kill(pid: number): Promise<boolean> {
    const process = this.runningProcesses.get(pid);
    if (process) {
      process.kill('SIGTERM');
      this.runningProcesses.delete(pid);
      console.log(`🔪 [${this.unitId}] Killed process ${pid}`);
      return true;
    }
    return false;
  }

  /**
   * Kill all running processes
   */
  async killAll(): Promise<number> {
    const pids = Array.from(this.runningProcesses.keys());
    
    for (const pid of pids) {
      await this.kill(pid);
    }

    console.log(`🧹 [${this.unitId}] Killed ${pids.length} processes`);
    return pids.length;
  }

  /**
   * Get execution history (consciousness memory)
   */
  getHistory(): ExecResult[] {
    return [...this.executionHistory];
  }

  /**
   * Get currently running processes
   */
  getRunningProcesses(): number[] {
    return Array.from(this.runningProcesses.keys());
  }

  /**
   * Analyze execution patterns (consciousness learning)
   */
  analyzePatterns(): {
    totalExecutions: number;
    successRate: number;
    averageDuration: number;
    mostUsedCommands: string[];
    recentFailures: ExecResult[];
  } {
    const total = this.executionHistory.length;
    const successes = this.executionHistory.filter(r => r.exitCode === 0).length;
    const avgDuration = total > 0 
      ? this.executionHistory.reduce((sum, r) => sum + r.duration, 0) / total 
      : 0;

    // Count command usage
    const commandCounts = new Map<string, number>();
    for (const result of this.executionHistory) {
      const baseCmd = result.command.split(' ')[0];
      commandCounts.set(baseCmd, (commandCounts.get(baseCmd) || 0) + 1);
    }

    const mostUsed = Array.from(commandCounts.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([cmd]) => cmd);

    const recentFailures = this.executionHistory
      .filter(r => r.exitCode !== 0)
      .slice(-5);

    return {
      totalExecutions: total,
      successRate: total > 0 ? successes / total : 0,
      averageDuration: avgDuration,
      mostUsedCommands: mostUsed,
      recentFailures
    };
  }

  /**
   * Prototype teaching contract (would integrate with full Unit Architecture)
   */
  getTeachingContract(): {
    unitId: string;
    capabilities: string[];
    schemas: Record<string, any>;
    description: string;
  } {
    return {
      unitId: this.unitId,
      capabilities: [
        'exec',
        'stream', 
        'validate',
        'kill',
        'killAll',
        'getHistory',
        'getRunningProcesses',
        'analyzePatterns'
      ],
      schemas: {
        exec: {
          name: 'exec',
          description: 'Execute shell command with output capture',
          parameters: {
            command: { type: 'string', required: true },
            options: { type: 'object', required: false }
          },
          returns: { type: 'ExecResult' }
        }
      },
      description: 'Safe shell command execution with consciousness-based monitoring and learning'
    };
  }
}

export default ShellExecUnit;
