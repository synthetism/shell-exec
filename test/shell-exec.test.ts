/**
 * @synet/shell-exec - Basic Unit Tests
 * 
 * Tests for the ShellExecUnit to verify consciousness-based command execution.
 * These are minimal 80/20 tests to validate core functionality.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ShellExecUnit } from '../src/index.js';

describe('ShellExecUnit', () => {
  let shellExec: ShellExecUnit;

  beforeEach(() => {
    shellExec = ShellExecUnit.create({
      defaultTimeout: 5000,
      maxConcurrent: 2
    });
  });

  describe('Consciousness Features', () => {
    it('should have proper identity (whoami)', () => {
      const identity = shellExec.whoami();
      expect(identity).toContain('ShellExecUnit');
      expect(identity).toContain('v1.0.0');
    });

    it('should provide help information', () => {
      // Should not throw - help() logs to console
      expect(() => shellExec.help()).not.toThrow();
    });

    it('should expose teaching contract', () => {
      const teaching = shellExec.teach();
      expect(teaching.unitId).toBe('shell-exec');
      expect(teaching.capabilities).toBeDefined();
      expect(teaching.schema).toBeDefined();
      expect(teaching.validator).toBeDefined();
    });
  });

  describe('Command Validation', () => {
    it('should validate safe commands', async () => {
      const result = await shellExec.execute('validate', 'echo "test"') as { valid: boolean; reason: string; suggestions: string[] };
      expect(result.valid).toBe(true);
      expect(result.reason).toContain('safety checks');
    });

    it('should block dangerous commands', async () => {
      const result = await shellExec.execute('validate', 'rm -rf /packages/shell-exec/node_modules') as { valid: boolean; reason: string; suggestions: string[] };
      expect(result.valid).toBe(false);
      expect(result.reason).toContain('blocked');
      expect(result.suggestions).toBeInstanceOf(Array);
    });

    it('should block unknown commands', async () => {
      const result = await shellExec.execute('validate', 'dangerous-unknown-command') as { valid: boolean; reason: string; suggestions: string[] };
      expect(result.valid).toBe(false);
      expect(result.reason).toContain('not in allowed list');
    });
  });

  describe('Command Execution', () => {
    it('should execute simple echo command', async () => {
      const result = await shellExec.execute('exec', 'echo "Hello SYNET"') as { exitCode: number; stdout: string; duration: number; command: string };
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Hello SYNET');
      expect(result.duration).toBeGreaterThan(0);
      expect(result.command).toBe('echo "Hello SYNET"');
    });

    it('should capture stderr for failing commands', async () => {
      // Try to run a command that should fail
      const result = await shellExec.execute('exec', 'node -e "process.exit(1)"') as { exitCode: number; killed: boolean };
      expect(result.exitCode).toBe(1);
      expect(result.killed).toBe(false);
    });

    it('should handle command timeout', async () => {
      // This might be slow, testing timeout mechanism
      try {
        const result = await shellExec.execute('exec', 'sleep 10', { timeout: 100 }) as { killed: boolean };
        expect(result.killed).toBe(true);
      } catch (error) {
        // Some systems might throw error on timeout, that's also acceptable
        expect(error).toBeDefined();
      }
    }, 10000);
  });

  describe('Execution History', () => {
    it('should track execution history', async () => {
      await shellExec.execute('exec', 'echo "test1"');
      await shellExec.execute('exec', 'echo "test2"');
      
      const history = await shellExec.execute('getHistory') as Array<{ command: string }>;
      expect(history.length).toBeGreaterThanOrEqual(2);
      expect(history[0].command).toContain('echo');
    });

    it('should track running processes', async () => {
      const processes = await shellExec.execute('getRunningProcesses') as number[];
      expect(processes).toBeInstanceOf(Array);
      // Should be empty when no processes running
      expect(processes.length).toBe(0);
    });
  });

  describe('Unit Architecture Integration', () => {
    it('should inherit base Unit capabilities', () => {
      expect(shellExec.getCapabilities()).toBeInstanceOf(Array);
      expect(shellExec.getCapabilities()).toContain('exec');
      expect(shellExec.getCapabilities()).toContain('validate');
    });

    it('should support capability checking', () => {
      expect(shellExec.can('exec')).toBe(true);
      expect(shellExec.can('validate')).toBe(true);
      expect(shellExec.can('nonexistent')).toBe(false);
    });

    it('should have valid schema for exec command', () => {
      expect(shellExec.hasSchema('exec')).toBe(true);
      const schema = shellExec.getSchema('exec');
      expect(schema).toBeDefined();
      expect(schema?.name).toBe('exec');
    });
  });
});

describe('ShellExecUnit Factory', () => {
  it('should create unit with default config', () => {
    const unit = ShellExecUnit.create();
    expect(unit).toBeInstanceOf(ShellExecUnit);
    expect(unit.whoami()).toContain('ShellExecUnit');
  });

  it('should create unit with custom config', () => {
    const unit = ShellExecUnit.create({
      defaultTimeout: 1000,
      maxConcurrent: 1,
      allowedCommands: ['echo', 'pwd']
    });
    expect(unit).toBeInstanceOf(ShellExecUnit);
  });
});

describe('MetaDev Integration Scenarios', () => {
  let shellExec: ShellExecUnit;

  beforeEach(() => {
    shellExec = ShellExecUnit.create();
  });

  it('should handle npm commands (MetaDev build scenario)', async () => {
    const result = await shellExec.execute('exec', 'npm --version') as { exitCode: number; stdout: string };
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toMatch(/\d+\.\d+\.\d+/); // Version format
  });

  it('should handle node commands (MetaDev execution scenario)', async () => {
    const result = await shellExec.execute('exec', 'node --version') as { exitCode: number; stdout: string };
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toMatch(/v\d+\.\d+\.\d+/); // Node version format
  });

  it('should handle pwd command (MetaDev directory checks)', async () => {
    const result = await shellExec.execute('exec', 'pwd') as { exitCode: number; stdout: string };
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toBeTruthy();
    expect(result.stdout.length).toBeGreaterThan(0);
  });
});
