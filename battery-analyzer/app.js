/**
 * Controller Application for Battery Percentage Analyzer
 * Simplified to display Deep Unnecessary Insight Diagnosis,
 * Emotional Lifespan, Physical Lifespan, and Adjust Charge Level Bar.
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

        this.initDOM();
        this.initTheme();
        this.initParticles();
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
            slider: document.getElementById('battery-slider'),
            sliderValLabel: document.getElementById('slider-val-label'),
            headlineInsight: document.getElementById('headline-insight'),
            valEmotionalLife: document.getElementById('val-emotional-life'),
            valPhysicalLife: document.getElementById('val-physical-life'),
            themeSelect: document.getElementById('theme-select')
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
        if (this.dom.slider) {
            this.dom.slider.addEventListener('input', (e) => {
                this.currentPct = Number(e.target.value);
                this.synth.playTick(300 + this.currentPct * 5);
                this.updateAll(true);
            });
        }
    }

    async tryAutoDetectBattery() {
        if ('getBattery' in navigator) {
            try {
                const battery = await navigator.getBattery();
                const levelPct = Math.round(battery.level * 100);
                this.currentPct = levelPct;
                this.isCharging = battery.charging;

                if (this.dom.slider) this.dom.slider.value = levelPct;

                this.updateAll(true);

                battery.addEventListener('levelchange', () => {
                    this.currentPct = Math.round(battery.level * 100);
                    if (this.dom.slider) this.dom.slider.value = this.currentPct;
                    this.updateAll(true);
                });

                battery.addEventListener('chargingchange', () => {
                    this.isCharging = battery.charging;
                    this.updateAll(true);
                });
            } catch (err) {
                console.warn("Battery API unavailable:", err);
            }
        }
    }

    updateAll(triggerScanner = false) {
        const report = this.engine.getAnalysis(this.currentPct, this.isCharging, this.isLowPower);

        // Update Theme Colors dynamically based on battery level
        this.updateThemeColors(report.percentage, report.statusBadge.color);

        // Update Slider Value Label
        if (this.dom.sliderValLabel) {
            this.dom.sliderValLabel.textContent = `${report.percentage}%`;
        }

        // Play panic sound if critical
        if (report.percentage <= 10 && !this.isCharging && triggerScanner) {
            this.synth.playAlarm();
        }

        // Headlines & Lifespan Stats
        if (this.dom.headlineInsight) {
            this.dom.headlineInsight.textContent = `"${report.headlineInsight}"`;
        }
        if (this.dom.valEmotionalLife) {
            this.dom.valEmotionalLife.textContent = report.emotionalLifespan;
        }
        if (this.dom.valPhysicalLife) {
            this.dom.valPhysicalLife.textContent = report.physicalLifespan;
        }

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

    initParticles() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = Array.from({ length: 35 }, () => ({
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
}

// Instantiate App when DOM Ready
window.addEventListener('DOMContentLoaded', () => {
    new BatteryApp();
});
