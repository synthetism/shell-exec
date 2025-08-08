#!/usr/bin/env tsx

/**
 * @synet/shell-exec Demo - Foundation Unit for MetaDev
 * 
 * This demo shows how ShellExecUnit provides safe, monitored shell command
 * execution with consciousness-based architecture.
 * 
 * Key Demonstrations:
 * 1. Basic command execution with output capture
 * 2. Command validation and safety features
 * 3. Teaching contract for capability sharing
 * 4. Real-time process monitoring
 * 5. MetaDev integration patterns
 */

import { ShellExecUnit } from '../src/index.js';

async function runShellExecDemo() {
  console.log('🚀 SYNET Shell Exec Unit Demo');
  console.log('=====================================\n');

  // Create shell execution unit with consciousness
  const shellExec = ShellExecUnit.create({
    defaultTimeout: 10000,
    maxConcurrent: 3
  });

  console.log('🧠 Unit Consciousness:');
  console.log(shellExec.whoami());
  console.log('');

  // Show help system
  console.log('📖 Built-in Help:');
  shellExec.help();
  console.log('');

  try {
    // Demonstrate basic command execution
    console.log('📝 Test 1: Basic Command Execution');
    console.log('Command: echo "Hello from SYNET!"');
    
    const echoResult = await shellExec.execute('exec', 'echo "Hello from SYNET!"');
    console.log('✅ Result:', echoResult);
    console.log('');

    // Demonstrate command validation
    console.log('🛡️ Test 2: Command Validation');
    console.log('Validating safe command: npm --version');
    
    const validation1 = await shellExec.execute('validate', 'npm --version');
    console.log('✅ Safe command validation:', validation1);

    console.log('Validating dangerous command: rm -rf packages/shell-exec/node_modules');
    const validation2 = await shellExec.execute('validate', 'rm -rf packages/shell-exec/node_modules');
    console.log('🚫 Dangerous command validation:', validation2);
    console.log('');

    // Demonstrate real command execution
    console.log('⚙️ Test 3: Real Development Commands');
    console.log('Command: npm --version');
    
    const npmResult = await shellExec.execute('exec', 'npm --version');
    console.log('✅ npm version:', npmResult.stdout);
    console.log(`⏱️ Execution time: ${npmResult.duration}ms`);
    console.log('');

    // Show execution history
    console.log('📊 Test 4: Execution History');
    const history = await shellExec.execute('getHistory');
    console.log(`📈 Total commands executed: ${history.length}`);
    history.forEach((cmd, i) => {
      console.log(`  ${i + 1}. ${cmd.command} (${cmd.duration}ms, exit: ${cmd.exitCode})`);
    });
    console.log('');

    // Demonstrate teaching capabilities
    console.log('🎓 Test 5: Teaching Contract');
    const teaching = shellExec.teach();
    console.log(`🔗 Unit ID: ${teaching.unitId}`);
    console.log(`📚 Available capabilities: ${teaching.capabilities.list().join(', ')}`);
    console.log(`🗂️ Schema tools: ${teaching.schema.list().join(', ')}`);
    console.log('');

    console.log('🎯 MetaDev Integration Example:');
    console.log('');
    console.log('```typescript');
    console.log('// Other units can learn shell execution capabilities');
    console.log('const codeGen = CodeGenUnit.create();');
    console.log('codeGen.learn([shellExec.teach()]);');
    console.log('');
    console.log('// Now CodeGen can compile the code it generates');
    console.log('const generatedCode = await codeGen.generateUnit(spec);');
    console.log('const compileResult = await codeGen.execute("shell-exec.exec", "tsc generated-unit.ts");');
    console.log('```');
    console.log('');

    console.log('✅ Demo completed successfully!');
    console.log('🚀 ShellExecUnit is ready for MetaDev integration');

  } catch (error) {
    console.error('❌ Demo failed:', error.message);
    process.exit(1);
  }
}

// Self-executing demo
if (import.meta.url === `file://${process.argv[1]}`) {
  runShellExecDemo()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

export { runShellExecDemo };
