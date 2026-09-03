/**
 * System Battery Reader for Node.js / VS Code Extension
 * Cross-platform detection: Windows (PowerShell/WMIC), macOS (pmset), Linux (sysfs/upower)
 */

const { exec } = require('child_process');
const os = require('os');
const fs = require('fs');

/**
 * Executes a shell command and returns stdout as a promise.
 */
function runCommand(cmd) {
    return new Promise((resolve) => {
        exec(cmd, { timeout: 3000 }, (error, stdout) => {
            if (error) {
                resolve('');
            } else {
                resolve(stdout ? stdout.toString().trim() : '');
            }
        });
    });
}

/**
 * Gets the current system battery info.
 * @returns {Promise<{percentage: number, isCharging: boolean, isDesktop: boolean, source: string}>}
 */
async function getBatteryStatus() {
    const platform = os.platform();

    try {
        if (platform === 'win32') {
            // Windows PowerShell CIM check
            const psOutput = await runCommand(
                'powershell -NoProfile -Command "Get-CimInstance -ClassName Win32_Battery | Select-Object EstimatedChargeRemaining, BatteryStatus | ConvertTo-Json"'
            );
            if (psOutput) {
                try {
                    const parsed = JSON.parse(psOutput);
                    const data = Array.isArray(parsed) ? parsed[0] : parsed;
                    if (data && typeof data.EstimatedChargeRemaining === 'number') {
                        // BatteryStatus: 2 = Discharging, 1/6/7/8/9 = Charging or AC connected
                        const isCharging = data.BatteryStatus !== 1 && data.BatteryStatus !== 2;
                        return {
                            percentage: Math.min(100, Math.max(0, data.EstimatedChargeRemaining)),
                            isCharging: isCharging,
                            isDesktop: false,
                            source: 'Windows PowerShell CIM'
                        };
                    }
                } catch (e) {
                    // Fallback to WMIC
                }
            }

            // Secondary Windows WMIC fallback
            const wmicOutput = await runCommand('wmic path Win32_Battery get EstimatedChargeRemaining, BatteryStatus /format:csv');
            if (wmicOutput) {
                const lines = wmicOutput.split('\n').map(l => l.trim()).filter(l => l.length > 0);
                if (lines.length >= 2) {
                    const parts = lines[lines.length - 1].split(',');
                    if (parts.length >= 3) {
                        const statusVal = parseInt(parts[1], 10);
                        const pctVal = parseInt(parts[2], 10);
                        if (!isNaN(pctVal)) {
                            return {
                                percentage: Math.min(100, Math.max(0, pctVal)),
                                isCharging: statusVal !== 1 && statusVal !== 2,
                                isDesktop: false,
                                source: 'Windows WMIC'
                            };
                        }
                    }
                }
            }
        } else if (platform === 'darwin') {
            // macOS pmset
            const pmsetOutput = await runCommand('pmset -g batt');
            if (pmsetOutput) {
                const matchPct = pmsetOutput.match(/(\d+)%/);
                if (matchPct) {
                    const pct = parseInt(matchPct[1], 10);
                    const isCharging = pmsetOutput.includes('AC Power') || pmsetOutput.includes('charging');
                    return {
                        percentage: pct,
                        isCharging: isCharging,
                        isDesktop: false,
                        source: 'macOS pmset'
                    };
                }
            }
        } else if (platform === 'linux') {
            // Linux sysfs
            const sysfsPath = '/sys/class/power_supply/BAT0/capacity';
            if (fs.existsSync(sysfsPath)) {
                const capStr = fs.readFileSync(sysfsPath, 'utf8').trim();
                const statusStr = fs.existsSync('/sys/class/power_supply/BAT0/status')
                    ? fs.readFileSync('/sys/class/power_supply/BAT0/status', 'utf8').trim()
                    : 'Discharging';
                const pct = parseInt(capStr, 10);
                if (!isNaN(pct)) {
                    return {
                        percentage: pct,
                        isCharging: statusStr.toLowerCase().includes('charg'),
                        isDesktop: false,
                        source: 'Linux sysfs'
                    };
                }
            }
        }
    } catch (err) {
        // Fallback to desktop simulation
    }

    // Default desktop fallback (if no hardware battery detected, e.g. PC plugged into wall)
    return {
        percentage: 100,
        isCharging: true,
        isDesktop: true,
        source: 'AC Wall Power (Desktop Mode)'
    };
}

module.exports = {
    getBatteryStatus
};
