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

// Export the main ShellExecUnit class and types
export {
  ShellExecUnit,
  type ExecOptions,
  type ExecResult,
  type StreamOptions,
} from "./shell-exec-unit.js";

// Re-export Unit architecture types for convenience
export type {
  UnitSchema,
  TeachingContract,
  UnitProps,
} from "@synet/unit";

export { ShellExecUnit as default } from "./shell-exec-unit.js";
