const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const { getBatteryStatus } = require('./batteryReader');
const { getAnalysis } = require('./analysisEngine');

let statusBarItem;
let timerId = null;
let currentWebviewPanel = null;

/**
 * Extension activation handler
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Battery Percentage Over-Analyzer Extension is active!');

    // Create Status Bar Item (Priority 100, placed on the right)
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'batteryAnalyzer.openDashboard';
    context.subscriptions.push(statusBarItem);

    // Initial battery update
    updateBatteryStatus();

    // Setup background interval polling
    startPolling();

    // Register Command: Analyze Current Battery
    const cmdAnalyze = vscode.commands.registerCommand('batteryAnalyzer.analyze', async () => {
        const status = await getBatteryStatus();
        const analysis = getAnalysis(status.percentage, status.isCharging);

        const detailMsg = `Battery: ${analysis.percentage}%\nDirective: ${analysis.recommendation}\n\nDeep Insight: "${analysis.deepInsight}"\n\nAbsurd Drain: ${analysis.absurdDrain}\nPanic Index: ${analysis.panicIndex}/100`;

        vscode.window.showInformationMessage(
            `🔋 Battery: ${analysis.percentage}% -> ${analysis.recommendation}`,
            'Open Full Dashboard',
            'Dismiss'
        ).then(selection => {
            if (selection === 'Open Full Dashboard') {
                vscode.commands.executeCommand('batteryAnalyzer.openDashboard');
            }
        });
    });

    // Register Command: Quick Existential Insight
    const cmdQuickInsight = vscode.commands.registerCommand('batteryAnalyzer.quickInsight', async () => {
        const status = await getBatteryStatus();
        const analysis = getAnalysis(status.percentage, status.isCharging);

        vscode.window.showInformationMessage(`🧠 Battery ${analysis.percentage}% Over-Analysis: "${analysis.deepInsight}"`);
    });

    // Register Command: Open Over-Analysis Dashboard Webview
    const cmdOpenDashboard = vscode.commands.registerCommand('batteryAnalyzer.openDashboard', async () => {
        if (currentWebviewPanel) {
            currentWebviewPanel.reveal(vscode.ViewColumn.One);
            return;
        }

        currentWebviewPanel = vscode.window.createWebviewPanel(
            'batteryAnalyzerDashboard',
            '🔋 Battery Over-Analysis Dashboard',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );

        const htmlPath = path.join(context.extensionPath, 'webview.html');
        if (fs.existsSync(htmlPath)) {
            currentWebviewPanel.webview.html = fs.readFileSync(htmlPath, 'utf8');
        } else {
            currentWebviewPanel.webview.html = `<h1>Over-Analysis Dashboard</h1><p>Battery Webview content loading failed.</p>`;
        }

        const status = await getBatteryStatus();
        currentWebviewPanel.webview.postMessage({
            type: 'update',
            percentage: status.percentage,
            isCharging: status.isCharging
        });

        currentWebviewPanel.onDidDispose(() => {
            currentWebviewPanel = null;
        }, null, context.subscriptions);
    });

    // Listen to configuration changes
    vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('batteryAnalyzer.refreshInterval') || e.affectsConfiguration('batteryAnalyzer.showStatusBar')) {
            startPolling();
        }
    });

    context.subscriptions.push(cmdAnalyze, cmdQuickInsight, cmdOpenDashboard);
}

/**
 * Periodically updates the VS Code status bar item with current system battery stats.
 */
async function updateBatteryStatus() {
    const config = vscode.workspace.getConfiguration('batteryAnalyzer');
    const showStatusBar = config.get('showStatusBar', true);

    if (!showStatusBar) {
        statusBarItem.hide();
        return;
    }

    try {
        const status = await getBatteryStatus();
        const analysis = getAnalysis(status.percentage, status.isCharging);

        let icon = '⚡';
        if (status.percentage <= 20) icon = '🚨';
        else if (status.percentage <= 50) icon = '⚠️';

        statusBarItem.text = `${icon} ${analysis.percentage}% | ${analysis.recommendation.split('.')[0]}`;
        statusBarItem.tooltip = `Battery Over-Analysis:\n${analysis.deepInsight}\n\nThreat: ${analysis.threatLevel}\nClick to open interactive dashboard.`;
        statusBarItem.show();

        if (currentWebviewPanel) {
            currentWebviewPanel.webview.postMessage({
                type: 'update',
                percentage: status.percentage,
                isCharging: status.isCharging
            });
        }
    } catch (err) {
        statusBarItem.text = `⚡ Battery Over-Analyzer`;
        statusBarItem.show();
    }
}

/**
 * Starts interval timer for polling battery.
 */
function startPolling() {
    if (timerId) clearInterval(timerId);

    const config = vscode.workspace.getConfiguration('batteryAnalyzer');
    const intervalSec = Math.max(5, config.get('refreshInterval', 30));

    timerId = setInterval(() => {
        updateBatteryStatus();
    }, intervalSec * 1000);
}

/**
 * Extension deactivation handler
 */
function deactivate() {
    if (timerId) {
        clearInterval(timerId);
    }
}

module.exports = {
    activate,
    deactivate
};
