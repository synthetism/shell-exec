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

  // Show capabilities
  console.log('⚡ Available Capabilities:');
  const capabilities = shellExec.getCapabilities();
  capabilities.forEach(cap => console.log(`  • ${cap}`));
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
    const validation2 = await shellExec.execute('validate', 'rm -rf /');
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

    // Show help system
    console.log('📖 Test 6: Built-in Help');
    shellExec.help();

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
      },
      onExit: (code) => {
        console.log(`\n🏁 Stream completed with exit code: ${code}`);
      }
    });

    console.log(`✅ Streaming completed: ${streamResult.duration}ms, ${outputLines} output events`);

  } catch (error) {
    console.error('❌ Streaming failed:', error);
  }

  // Demo 5: Consciousness features
  console.log(`\n${'='.repeat(60)}`);
  console.log('🧠 DEMO 5: Consciousness Analysis');
  console.log('='.repeat(60));

  console.log('\n🧠 Analyzing execution patterns...');
  const patterns = shellExec.analyzePatterns();
  
  console.log(`📊 Total executions: ${patterns.totalExecutions}`);
  console.log(`✅ Success rate: ${(patterns.successRate * 100).toFixed(1)}%`);
  console.log(`⏱️ Average duration: ${patterns.averageDuration.toFixed(1)}ms`);
  console.log(`🔥 Most used commands: ${patterns.mostUsedCommands.join(', ')}`);
  
  if (patterns.recentFailures.length > 0) {
    console.log(`❌ Recent failures: ${patterns.recentFailures.length}`);
    for (const failure of patterns.recentFailures.slice(0, 3)) {
      console.log(`   - ${failure.command} (exit ${failure.exitCode})`);
    }
  }

  // Demo 6: Teaching capabilities
  console.log(`\n${'='.repeat(60)}`);
  console.log('🎓 DEMO 6: Teaching Contract');
  console.log('='.repeat(60));

  const teachingContract = shellExec.getTeachingContract();
  console.log('\n📚 Teaching Contract for Other Units:');
  console.log(`🆔 Unit ID: ${teachingContract.unitId}`);
  console.log(`🎯 Capabilities: ${teachingContract.capabilities.join(', ')}`);
  console.log(`📋 Description: ${teachingContract.description}`);

  console.log('\n✨ In full Unit Architecture, other units could learn:');
  console.log('   const learner = SomeUnit.create();');
  console.log('   learner.learn([shellExec.teach()]);');
  console.log('   learner.execute("shell-exec.exec", "npm test"); // Now possible!');

  // Demo 7: MetaDev integration preview
  console.log(`\n${'='.repeat(60)}`);
  console.log('🚀 DEMO 7: MetaDev Integration Preview');
  console.log('='.repeat(60));

  console.log('\n🔮 How this enables MetaDev capabilities:');
  
  console.log('\n1. 🏗️ Code Generation + Build:');
  console.log('   generateCode() → writeFile() → shellExec.exec("tsc") → validateOutput()');
  
  console.log('\n2. 🧪 Automated Testing:');
  console.log('   generateTests() → shellExec.exec("npm test") → parseResults() → learnFromFailures()');
  
  console.log('\n3. 📦 Package Management:');
  console.log('   shellExec.exec("npm init") → generatePackageJson() → shellExec.exec("npm publish")');
  
  console.log('\n4. 🔄 Self-Improvement:');
  console.log('   analyzeFailures() → generateFixes() → shellExec.exec("npm test") → measureImprovement()');

  console.log('\n🎯 Next Steps:');
  console.log('================');
  console.log('✅ ShellExec Unit: Foundation component complete');
  console.log('🚧 CodeGen Unit: Generate TypeScript code from specs');
  console.log('🚧 ProjectTemplate Unit: Scaffold project structures');
  console.log('🚧 DevWorkflow Unit: Orchestrate build/test/deploy');
  console.log('🚧 MetaDev Unit: AI-driven development with self-improvement');
  console.log('');
  console.log('🌟 Each component builds on the consciousness foundation of ShellExec');
  console.log('🔗 Components compose through teaching/learning contracts');
  console.log('🧠 The result: Self-building AI that improves through experience');

  console.log('\n🎉 ShellExec Demo Complete!');
  console.log('This consciousness-enabled command executor is ready to be the foundation for MetaDev.');
}

// Execute demo if this file is run directly
if (require.main === module) {
  runShellExecDemo().catch(console.error);
}

export { runShellExecDemo };
