/**
 * ShellExec Unit Demo - Consciousness-Based Command Execution
 * 
 * This demo shows the ShellExec Unit in action, demonstrating the foundation
 * component for MetaDev's automated development capabilities.
 * 
 * Key demonstrations:
 * - Safe command execution with validation
 * - Output capture and timeout handling  
 * - Consciousness features (history, pattern analysis)
 * - Real-world MetaDev use cases (npm, tsc, git)
 */

import { ShellExecUnit } from '../src/index.js';

async function runShellExecDemo() {
  console.log('🚀 ShellExec Unit Demo - Foundation for MetaDev\n');

  // Create the consciousness-enabled shell executor
  const shellExec = ShellExecUnit.create({
    defaultTimeout: 10000,
    allowedCommands: ['npm', 'node', 'tsc', 'git', 'echo', 'ls', 'pwd', 'which'],
    maxConcurrent: 3
  });

  console.log('📋 Unit Identity:');
  console.log(shellExec.whoami());
  console.log();

  console.log('🎯 Available Capabilities:');
  shellExec.help();
  console.log();

  // Demo 1: Basic command execution
  console.log('='.repeat(60));
  console.log('🔧 DEMO 1: Basic Command Execution');
  console.log('='.repeat(60));

  try {
    // Test Node.js version
    console.log('\n📦 Checking Node.js version...');
    const nodeResult = await shellExec.exec('node --version');
    console.log(`✅ Node.js: ${nodeResult.stdout} (${nodeResult.duration}ms)`);

    // Test npm version
    console.log('\n📦 Checking npm version...');
    const npmResult = await shellExec.exec('npm --version');
    console.log(`✅ npm: ${npmResult.stdout} (${npmResult.duration}ms)`);

    // Test current directory
    console.log('\n📁 Checking current directory...');
    const pwdResult = await shellExec.exec('pwd');
    console.log(`✅ Working directory: ${pwdResult.stdout}`);

  } catch (error) {
    console.error('❌ Basic execution failed:', error);
  }

  // Demo 2: Command validation and security
  console.log(`\n${'='.repeat(60)}`);
  console.log('🛡️ DEMO 2: Security Validation');
  console.log('='.repeat(60));

  console.log('\n🔒 Testing command validation...');

  // Test allowed command
  const validCommand = shellExec.validate('npm --version');
  console.log(`✅ Valid command 'npm --version': ${validCommand.valid} - ${validCommand.reason}`);

  // Test blocked command
  const blockedCommand = shellExec.validate('rm -rf /');
  console.log(`🚫 Blocked command 'rm -rf /': ${blockedCommand.valid} - ${blockedCommand.reason}`);
  if (blockedCommand.suggestions.length > 0) {
    console.log(`💡 Suggestions: ${blockedCommand.suggestions.join(', ')}`);
  }

  // Test unknown command
  const unknownCommand = shellExec.validate('dangerous-command');
  console.log(`⚠️  Unknown command 'dangerous-command': ${unknownCommand.valid} - ${unknownCommand.reason}`);

  // Demo 3: Real-world MetaDev scenarios
  console.log(`\n${'='.repeat(60)}`);
  console.log('🏗️ DEMO 3: MetaDev Use Cases');
  console.log('='.repeat(60));

  try {
    // Check if TypeScript is available
    console.log('\n🔨 Checking TypeScript availability...');
    const tscCheck = await shellExec.exec('which tsc');
    if (tscCheck.exitCode === 0) {
      console.log(`✅ TypeScript found at: ${tscCheck.stdout}`);
      
      // Get TypeScript version
      const tscVersion = await shellExec.exec('tsc --version');
      console.log(`✅ TypeScript version: ${tscVersion.stdout}`);
    } else {
      console.log('⚠️ TypeScript not found globally');
    }

    // Test npm list (for package analysis)
    console.log('\n📦 Checking local packages...');
    const npmList = await shellExec.exec('npm list --depth=0', { 
      timeout: 5000 
    });
    
    if (npmList.exitCode === 0) {
      const packageCount = npmList.stdout.split('\n').length - 1;
      console.log(`✅ Found ${packageCount} packages in current project`);
    } else {
      console.log('⚠️ Not in an npm project or packages not installed');
    }

  } catch (error) {
    console.error('❌ MetaDev scenario failed:', error);
  }

  // Demo 4: Streaming execution
  console.log(`\n${'='.repeat(60)}`);
  console.log('📡 DEMO 4: Real-time Streaming');
  console.log('='.repeat(60));

  try {
    console.log('\n📡 Streaming a command with real-time output...');
    
    let outputLines = 0;
    const streamResult = await shellExec.stream('echo "Line 1"; sleep 1; echo "Line 2"; sleep 1; echo "Line 3"', {
      onStdout: (data) => {
        process.stdout.write(`📤 ${data}`);
        outputLines++;
      },
      onStderr: (data) => {
        process.stdout.write(`⚠️ ${data}`);
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
