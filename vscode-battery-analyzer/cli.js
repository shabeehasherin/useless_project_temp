#!/usr/bin/env node

/**
 * Battery Percentage Analyzer - Terminal CLI Runner
 * Runs inside VS Code Terminal: `node cli.js`
 */

const { getBatteryStatus } = require('./batteryReader');
const { getAnalysis } = require('./analysisEngine');

async function runCli() {
    console.log('\n=============================================================');
    console.log(' 🔋 BATTERY PERCENTAGE OVER-ANALYZER (VS CODE EDITION)');
    console.log('=============================================================\n');

    console.log('🔍 Reading system battery status...');
    const status = await getBatteryStatus();
    const analysis = getAnalysis(status.percentage, status.isCharging);

    const chargeStateText = status.isCharging ? '⚡ PLUGGED IN / CHARGING' : '🔋 ON BATTERY POWER';
    
    console.log(`\n• Battery Percentage : ${analysis.percentage}% (${chargeStateText})`);
    console.log(`• Status Zone        : [ ${analysis.statusPill} ]`);
    console.log(`• Urgent Directive   : 👉 ${analysis.recommendation}`);
    console.log(`• Threat Level       : ${analysis.threatLevel}`);
    console.log(`• Panic Index        : ${analysis.panicIndex} / 100 [${'█'.repeat(Math.floor(analysis.panicIndex / 10))}${'░'.repeat(10 - Math.floor(analysis.panicIndex / 10))}]`);
    console.log(`\n🧠 DEEP UNNECESSARY INSIGHT:`);
    console.log(`   "${analysis.deepInsight}"`);

    console.log(`\n🔥 ABSURD DRAIN CULPRIT:`);
    console.log(`   ${analysis.absurdDrain}`);

    console.log(`\n🤔 EXISTENTIAL QUESTION:`);
    console.log(`   ${analysis.existentialQuestion}`);

    console.log(`\n🩺 DIAGNOSIS:`);
    console.log(`   ${analysis.humanizedDiagnosis}`);
    console.log(`   (Hardware Source: ${status.source})`);

    console.log('\n=============================================================\n');
}

runCli();
