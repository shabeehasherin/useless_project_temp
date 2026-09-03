/**
 * Main Controller Application for Battery Percentage Analyzer
 * Integrates Web Battery API, Canvas Particle System, Chart.js,
 * Audio Synthesizer, Web Speech API, and HTML5 Canvas Certificate Exporter.
 */

import { AnalysisEngine } from './analysisEngine.js';
import { AudioSynth } from './audioSynth.js';

class BatteryApp {
    constructor() {
        this.engine = new AnalysisEngine();
        this.synth = new AudioSynth();
        
        this.currentPct = 47;
        this.isCharging = false;
        this.isLowPower = false;
        
        this.panicChart = null;
        this.drainChart = null;

        this.initDOM();
        this.initTheme();
        this.initParticles();
        this.initCharts();
        this.bindEvents();
        this.tryAutoDetectBattery();
        this.updateAll(false);
    }

    initTheme() {
        if (this.dom.themeSelect) {
            const initialTheme = this.dom.themeSelect.value || 'white';
            document.body.setAttribute('data-theme', initialTheme);
        } else {
            document.body.setAttribute('data-theme', 'white');
        }
    }

    initDOM() {
        this.dom = {
            displayPct: document.getElementById('display-pct'),
            badgePill: document.getElementById('badge-pill'),
            slider: document.getElementById('battery-slider'),
            sliderValLabel: document.getElementById('slider-val-label'),
            dialProgress: document.getElementById('dial-progress'),
            scanner: document.getElementById('scanner'),
            toggleCharging: document.getElementById('toggle-charging'),
            toggleLowPower: document.getElementById('toggle-lowpower'),
            btnDetectLive: document.getElementById('btn-detect-live'),
            batterySourceText: document.getElementById('battery-source-text'),
            
            headlineInsight: document.getElementById('headline-insight'),
            valEmotionalLife: document.getElementById('val-emotional-life'),
            valPhysicalLife: document.getElementById('val-physical-life'),
            valPanicIndex: document.getElementById('val-panic-index'),
            panicBarFill: document.getElementById('panic-bar-fill'),
            valExistentialState: document.getElementById('val-existential-state'),
            monologueText: document.getElementById('monologue-text'),
            btnSpeakMonologue: document.getElementById('btn-speak-monologue'),
            
            moodTitle: document.getElementById('mood-title'),
            moodIcon: document.getElementById('mood-icon'),
            moodIconWrapper: document.getElementById('mood-icon-wrapper'),
            
            matrixContainer: document.getElementById('matrix-list-container'),
            prescriptionContainer: document.getElementById('prescription-container'),
            
            btnToggleSound: document.getElementById('btn-toggle-sound'),
            soundIcon: document.getElementById('sound-icon'),
            themeSelect: document.getElementById('theme-select'),
            btnExport: document.getElementById('btn-export-certificate')
        };
    }

    bindEvents() {
        // Theme Selector Change
        if (this.dom.themeSelect) {
            this.dom.themeSelect.addEventListener('change', (e) => {
                const theme = e.target.value;
                document.body.setAttribute('data-theme', theme);
                this.synth.playScanSweep();
                this.updateAll(false);
            });
        }

        // Slider Change
        this.dom.slider.addEventListener('input', (e) => {
            this.currentPct = Number(e.target.value);
            this.synth.playTick(300 + this.currentPct * 5);
            this.updateAll(true);
        });

        // Presets
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetPct = Number(e.target.dataset.pct);
                this.currentPct = targetPct;
                this.dom.slider.value = targetPct;
                this.synth.playScanSweep();
                this.updateAll(true);
            });
        });

        // Toggles
        this.dom.toggleCharging.addEventListener('change', (e) => {
            this.isCharging = e.target.checked;
            this.synth.playScanSweep();
            this.updateAll(true);
        });

        this.dom.toggleLowPower.addEventListener('change', (e) => {
            this.isLowPower = e.target.checked;
            this.synth.playTick(500);
            this.updateAll(true);
        });

        // Sync real battery
        this.dom.btnDetectLive.addEventListener('click', () => {
            this.tryAutoDetectBattery(true);
        });

        // Sound Toggle
        this.dom.btnToggleSound.addEventListener('click', () => {
            this.synth.enabled = !this.synth.enabled;
            this.dom.soundIcon.setAttribute('data-lucide', this.synth.enabled ? 'volume-2' : 'volume-x');
            lucide.createIcons();
        });

        // Speak Monologue (Web Speech API)
        this.dom.btnSpeakMonologue.addEventListener('click', () => {
            this.speakMonologue();
        });

        // Export Certificate
        this.dom.btnExport.addEventListener('click', () => {
            this.exportCertificate();
        });
    }

    async tryAutoDetectBattery(userInitiated = false) {
        if ('getBattery' in navigator) {
            try {
                const battery = await navigator.getBattery();
                const levelPct = Math.round(battery.level * 100);
                this.currentPct = levelPct;
                this.isCharging = battery.charging;

                this.dom.slider.value = levelPct;
                this.dom.toggleCharging.checked = battery.charging;
                this.dom.batterySourceText.textContent = "LIVE HARDWARE CONNECTED";

                if (userInitiated) {
                    this.synth.playChime();
                }

                this.updateAll(true);

                // Add real-time event listeners
                battery.addEventListener('levelchange', () => {
                    this.currentPct = Math.round(battery.level * 100);
                    this.dom.slider.value = this.currentPct;
                    this.updateAll(true);
                });

                battery.addEventListener('chargingchange', () => {
                    this.isCharging = battery.charging;
                    this.dom.toggleCharging.checked = battery.charging;
                    this.updateAll(true);
                });
            } catch (err) {
                console.warn("Battery API unavailable:", err);
                if (userInitiated) alert("Battery API not supported on this browser/device.");
            }
        } else if (userInitiated) {
            alert("Web Battery Status API is not supported on this browser.");
        }
    }

    updateAll(triggerScanner = false) {
        const report = this.engine.getAnalysis(this.currentPct, this.isCharging, this.isLowPower);

        // Update Theme Colors dynamically based on battery level
        this.updateThemeColors(report.percentage, report.statusBadge.color);

        // Update Dial & Badge
        this.dom.displayPct.textContent = report.percentage;
        this.dom.sliderValLabel.textContent = `${report.percentage}%`;
        this.dom.badgePill.textContent = report.statusBadge.label;
        this.dom.badgePill.style.color = report.statusBadge.color;
        this.dom.badgePill.style.borderColor = report.statusBadge.color;

        // Dial Dashoffset calculation (Circumference ~ 597)
        const offset = 597 - (597 * report.percentage) / 100;
        this.dom.dialProgress.style.strokeDashoffset = offset;
        this.dom.dialProgress.style.stroke = report.statusBadge.color;

        // Trigger Scanner Laser
        if (triggerScanner) {
            this.dom.scanner.classList.add('scanning');
            setTimeout(() => this.dom.scanner.classList.remove('scanning'), 1200);
        }

        // Play panic sound if critical
        if (report.percentage <= 10 && !this.isCharging && triggerScanner) {
            this.synth.playAlarm();
        }

        // Headlines & Stats
        this.dom.headlineInsight.textContent = `"${report.headlineInsight}"`;
        this.dom.valEmotionalLife.textContent = report.emotionalLifespan;
        this.dom.valPhysicalLife.textContent = report.physicalLifespan;
        this.dom.valPanicIndex.textContent = `${report.panicIndex} / 100`;
        
        if (this.dom.panicBarFill) {
            this.dom.panicBarFill.style.width = `${report.panicIndex}%`;
            const panicColor = report.panicIndex > 70 ? '#ff0044' : (report.panicIndex > 30 ? '#ff9900' : '#00ffaa');
            this.dom.panicBarFill.style.background = `linear-gradient(90deg, ${panicColor}, var(--theme-color-secondary))`;
            this.dom.panicBarFill.style.boxShadow = `0 0 10px ${panicColor}`;
        }
        
        this.dom.valExistentialState.textContent = report.existentialState.title;
        this.dom.monologueText.textContent = `"${report.innerMonologue}"`;

        // Update Mood & Personality
        if (this.dom.moodTitle && report.phoneMood) {
            this.dom.moodTitle.textContent = report.phoneMood.title;
            this.dom.moodTitle.style.color = report.phoneMood.color;
            if (this.dom.moodIcon) {
                this.dom.moodIcon.setAttribute('data-lucide', report.phoneMood.icon);
            }
            if (this.dom.moodIconWrapper) {
                this.dom.moodIconWrapper.style.borderColor = report.phoneMood.color;
                this.dom.moodIconWrapper.style.background = `rgba(${this.hexToRgb(report.phoneMood.color)}, 0.15)`;
                this.dom.moodIconWrapper.style.color = report.phoneMood.color;
            }
        }

        // Update Decision Matrix
        this.dom.matrixContainer.innerHTML = report.decisionMatrix.map(item => `
            <div class="matrix-row">
                <span class="matrix-label">${item.label}</span>
                <span class="matrix-val" style="color: ${report.statusBadge.color}">${item.value}</span>
            </div>
        `).join('');

        // Update Prescriptions
        this.dom.prescriptionContainer.innerHTML = report.absurdPrescription.map(item => `
            <div class="prescription-item" style="border-left-color:${report.statusBadge.color};">${item}</div>
        `).join('');

        // Update Charts
        this.updateCharts(report);

        // Re-render Lucide icons
        if (window.lucide) lucide.createIcons();
    }

    updateThemeColors(pct, mainHex) {
        let rgb = "0, 255, 170";
        let secondary = "#00e5ff";

        if (this.isCharging) {
            mainHex = "#00f0ff";
            secondary = "#ff007f";
            rgb = "0, 240, 255";
        } else if (pct <= 20) {
            mainHex = "#ff0044";
            secondary = "#ff00a0";
            rgb = "255, 0, 68";
        } else if (pct <= 50) {
            mainHex = "#ff9900";
            secondary = "#ffcc00";
            rgb = "255, 153, 0";
        } else if (pct <= 85) {
            mainHex = "#ccff00";
            secondary = "#ffd700";
            rgb = "204, 255, 0";
        } else {
            mainHex = "#00ffaa";
            secondary = "#00e5ff";
            rgb = "0, 255, 170";
        }

        document.documentElement.style.setProperty('--theme-color', mainHex);
        document.documentElement.style.setProperty('--theme-color-secondary', secondary);
        document.documentElement.style.setProperty('--theme-color-rgb', rgb);
    }

    hexToRgb(hex) {
        if (!hex) return "0, 255, 170";
        hex = hex.replace('#', '');
        if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
        const num = parseInt(hex, 16);
        return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
    }

    initCharts() {
        const report = this.engine.getAnalysis(this.currentPct, this.isCharging, this.isLowPower);

        // Chart 1: Panic Curve Line Chart
        const ctxPanic = document.getElementById('chart-panic').getContext('2d');
        this.panicChart = new Chart(ctxPanic, {
            type: 'line',
            data: {
                labels: report.chartData.labels,
                datasets: [
                    {
                        label: 'Existential Panic Index',
                        data: report.chartData.panicCurve,
                        borderColor: '#ff0055',
                        backgroundColor: 'rgba(255, 0, 85, 0.15)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Rational Thinking',
                        data: report.chartData.sanityCurve,
                        borderColor: '#00ff9d',
                        backgroundColor: 'transparent',
                        borderDash: [5, 5],
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#8a99ad', font: { family: 'Inter', size: 10 } } }
                },
                scales: {
                    x: { ticks: { color: '#536275', font: { family: 'JetBrains Mono', size: 9 } }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    y: { ticks: { color: '#536275' }, grid: { color: 'rgba(255,255,255,0.05)' } }
                }
            }
        });

        // Chart 2: Absurd Drain Causes Doughnut Chart
        const ctxDrain = document.getElementById('chart-drain').getContext('2d');
        this.drainChart = new Chart(ctxDrain, {
            type: 'doughnut',
            data: {
                labels: report.drainBreakdown.map(d => d.category),
                datasets: [{
                    data: report.drainBreakdown.map(d => d.percent),
                    backgroundColor: report.drainBreakdown.map(d => d.color),
                    borderWidth: 2,
                    borderColor: '#0f1420'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                cutout: '70%'
            }
        });
    }

    updateCharts(report) {
        if (this.panicChart && this.drainChart) {
            const isWhiteTheme = document.body.getAttribute('data-theme') === 'white';
            const fontColor = isWhiteTheme ? '#475569' : '#8a99ad';
            const gridColor = isWhiteTheme ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)';

            this.panicChart.options.plugins.legend.labels.color = fontColor;
            this.panicChart.options.scales.x.ticks.color = fontColor;
            this.panicChart.options.scales.x.grid.color = gridColor;
            this.panicChart.options.scales.y.ticks.color = fontColor;
            this.panicChart.options.scales.y.grid.color = gridColor;

            this.panicChart.data.datasets[0].data = report.chartData.panicCurve;
            this.panicChart.data.datasets[1].data = report.chartData.sanityCurve;
            this.panicChart.update();

            this.drainChart.data.labels = report.drainBreakdown.map(d => d.category);
            this.drainChart.data.datasets[0].data = report.drainBreakdown.map(d => d.percent);
            this.drainChart.data.datasets[0].backgroundColor = report.drainBreakdown.map(d => d.color);
            this.drainChart.update();
        }
    }

    speakMonologue() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const text = this.dom.monologueText.textContent;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.pitch = 0.9;
            utterance.rate = 1.0;
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Speech synthesis is not supported in this browser.");
        }
    }

    initParticles() {
        const canvas = document.getElementById('particle-canvas');
        const ctx = canvas.getContext('2d');

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = Array.from({ length: 45 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            alpha: Math.random() * 0.5 + 0.2
        }));

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 157, ${p.alpha})`;
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        animate();
    }

    exportCertificate() {
        const canvas = document.getElementById('export-canvas');
        const ctx = canvas.getContext('2d');
        const report = this.engine.getAnalysis(this.currentPct, this.isCharging, this.isLowPower);

        // Draw Dark Background
        ctx.fillStyle = '#080b11';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Border Glow
        ctx.strokeStyle = report.statusBadge.color;
        ctx.lineWidth = 4;
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

        // Header Title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 26px Inter';
        ctx.fillText('BATTERY OVER-ANALYSIS DIAGNOSIS CERTIFICATE', 50, 70);

        ctx.fillStyle = report.statusBadge.color;
        ctx.font = 'bold 16px "JetBrains Mono"';
        ctx.fillText(`BATTERY LEVEL: ${report.percentage}% [${report.statusBadge.label}]`, 50, 105);

        // Headline
        ctx.fillStyle = '#8a99ad';
        ctx.font = 'italic 16px Inter';
        const headlineText = `"${report.headlineInsight}"`;
        ctx.fillText(headlineText.substring(0, 85), 50, 150);
        if (headlineText.length > 85) {
            ctx.fillText(headlineText.substring(85, 170), 50, 175);
        }

        // Stats Box
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(50, 210, 700, 120);

        ctx.fillStyle = '#ffffff';
        ctx.font = '14px Inter';
        ctx.fillText(`Emotional Lifespan: ${report.emotionalLifespan}`, 70, 245);
        ctx.fillText(`Physical Lifespan: ${report.physicalLifespan}`, 70, 275);
        ctx.fillText(`Existential Panic Index: ${report.panicIndex} / 100`, 70, 305);

        // Footer Stamp
        ctx.fillStyle = '#536275';
        ctx.font = '12px "JetBrains Mono"';
        ctx.fillText(`GENERATED BY BATTERY PERCENTAGE ANALYZER v2.4 • ${new Date().toLocaleDateString()}`, 50, 395);

        // Download trigger
        const link = document.createElement('a');
        link.download = `battery-diagnosis-${this.currentPct}pct.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        this.synth.playChime();
    }
}

// Instantiate App when DOM Ready
window.addEventListener('DOMContentLoaded', () => {
    new BatteryApp();
});
