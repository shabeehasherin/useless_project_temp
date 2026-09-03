/**
 * Battery Percentage Over-Analysis Engine
 * Contains deep existential insights, absurd drain causes, urgent hilarious recommendations,
 * panic metrics, and mood diagnoses for battery levels 0-100%.
 */

const ABSURD_DRAIN_CAUSES = [
    "Overthinking a text sent in 2021 (48%)",
    "Background Bluetooth searching for extraterrestrial life (22%)",
    "Rendering unnecessary 3D shadows on idle VS Code tabs (18%)",
    "Actual System CPU Work (4%)",
    "Micro-anxieties about low power mode (8%)",
    "Secretly mining 0.00000001 Dogecoin in sleep mode (12%)",
    "Displaying high-brightness regret (31%)",
    "Syncing unwanted contacts from 2014 (15%)",
    "Simulating quantum wave function collapses (25%)"
];

const QUOTES_0_100 = {
    100: "Toxic perfectionism unlocked. You refuse to unplug because 99% feels like an unpardonable life failure.",
    99: "The 1% drop of betrayal. Your heart skipped a minor beat when it ticked down from 100.",
    98: "Still godlike, but secretly starting to worry about the inevitable rate of universal entropy.",
    97: "Comfortably wealthy in battery life. You willingly leave 18 background apps open out of pure flex.",
    96: "Screen brightness set to retina-searing supernova level. You fear no dark rooms.",
    95: "Peak arrogance. You answer 4-minute voice calls on speakerphone without checking the status bar.",
    94: "Upper-middle class battery energy. You haven't even thought about a wall socket all morning.",
    93: "Floating on a cloud of lithium ions. You scroll high-bitrate 4K videos with zero guilt.",
    92: "Life is peaceful. Your laptop feels like an invincible pocket powerhouse.",
    91: "Unbothered, moisturized, in your lane, and holding over 90% charge.",
    90: "90% milestone! Still in the golden green zone. You feel like a responsible adult.",
    89: "First minor dip into the 80s. A tiny voice whispers: 'Maybe don't compile that 50,000-line Rust crate.'",
    88: "Lucky 88! You still feel like royalty, but you casually glance at the battery icon once.",
    87: "Three-quarters plus change. You dismiss low power prompts before they even exist.",
    86: "Cruising along smoothly. Battery life is currently the least of your 99 problems.",
    85: "Comfort zone sweet spot. High confidence, zero power bank anxiety.",
    84: "You leave Bluetooth on just in case a smart fridge wants to connect.",
    83: "Solid charge. You casually stream music while running 4 docker containers.",
    82: "Still strong, though you subconsciously refrain from using keyboard backlight.",
    81: "Above 80%! Your system still respects you as a responsible developer.",
    80: "The 80% boundary line! Serene false security zone. Unplugging now is a gamble.",
    79: "Entering the high 70s. You close 2 background tabs just to feel a false sense of control.",
    78: "You decline an incoming Zoom call and blame 'poor battery' even though you have 78%.",
    77: "Sevens everywhere. You feel good, but you lower screen brightness by 5%.",
    76: "Three-quarters full. Still plenty of juice to doomscroll stackoverflow for hours.",
    75: "75% mark! Three-fourths of your digital soul remains intact.",
    74: "You check how many hours until sunset and calculate if you'll need a cable later.",
    73: "Mild awareness setting in. You stop leaving live web servers rendering.",
    72: "Cruising comfortably, but you avoid turning on laptop hotspot.",
    71: "Still solid! You can comfortably ignore wall sockets for at least 2 more hours.",
    70: "70% threshold! You enter the 'cautiously optimistic' phase of your workday.",
    69: "Nice. Battery percentage achieves comedic symmetry. Laptop fans feel relaxed.",
    68: "Slight dip. You superstitiously swipe away unused terminal tabs.",
    67: "Two-thirds full. You start eyeing colleagues who carry magnetic power bricks.",
    66: "You switch from light app themes to dark mode 'for aesthetic reasons' (and battery).",
    65: "Solid middle tier. You calculate if running heavy unit tests is wise right now.",
    64: "You decline sharing power via USB-C pass-through with your desk neighbor.",
    63: "63% and holding! Still plenty of power to survive an average standup meeting.",
    62: "You disable extension auto-updates for packages you haven't used since 2022.",
    61: "Hovering near 60%. You start feeling slight urgency to push your latest git commits.",
    60: "60% milestone! Exactly 3/5ths left. The slow slide toward mid-life battery crisis begins.",
    59: "First dip below 60%. You check the top-right status bar 12% more frequently.",
    58: "You lower screen auto-sleep timeout from 5 minutes to 1 minute.",
    57: "Fairly balanced, but you turn off animated code cursor extensions.",
    56: "You mentally map out all known wall outlets in your current workspace.",
    55: "Slightly past halfway! Do you plug in now, or gamble on working from a coffee shop?",
    54: "You stop recording high-res screen captures and switch to static text logs.",
    53: "Hovering right around half. Device feels like it's aging in accelerated real-time.",
    52: "You superstitiously disable Location Services and telemetry background loops.",
    51: "Barely holding onto the top half of your battery bar. Tension rises slightly.",
    50: "MID-LIFE CRISIS! Exactly 50%! Half empty or half full? Existential dread commences.",
    49: "BELOW HALF! Official entry into the lower battery hemisphere. Heart rate +4 BPM.",
    48: "You send a message: 'Hey heading out soon, battery's at 48%' (building your excuse early).",
    47: "Mild anxiety setting in. You begin force-closing apps superstitiously to save 0.0001%.",
    46: "You dim screen brightness down to 35%. The IDE window feels slightly darker.",
    45: "45% warning line. You refrain from compiling heavy node_modules binaries.",
    44: "You check if your monitor has a spare USB-C charging port to leech power from.",
    43: "You stop listening to lossless audio and switch to silence to save audio chip work.",
    42: "The answer to life, universe, and battery decay: 42%! Panic meter tickles level 30.",
    41: "Hovering near 40%. You avoid opening documentation links with video embeds.",
    40: "40% threshold! You enter the 'Tactical Power Conservation' mindset.",
    39: "First dip into the 30s! You start feeling genuine envy toward wall-tethered desktops.",
    38: "You turn off keypress sound effects to save micro-joules of energy.",
    37: "You send shorter commit messages ('fix', 'wip', 'stuff') to save typing CPU work.",
    36: "You refuse to run webpack watch mode because file watchers drain 1.2% per minute.",
    35: "35% level! You check your backpack for a tangled charging cable like a detective.",
    34: "You lower screen brightness to 15%. Your code window looks like a dim twilight zone.",
    33: "One-third remaining! You enter survivalist mode. Background sync disabled.",
    32: "You decline sending high-res git diffs until you reach a power outlet.",
    31: "Hovering right above 30%. You start typing faster to finish before shutdown.",
    30: "30% WARN ZONE! Battery status turns amber. Panic index jumps to 55/100.",
    29: "Sub-30% territory! You start asking coworkers: 'Hey, anyone got a spare laptop cord?'",
    28: "You force-close Chrome, Slack, Discord, and Spotify in a desperate ritualistic frenzy.",
    27: "Screen brightness reduced to near-stealth level. You shield screen with your hands.",
    26: "You send preemptive slack: 'Battery at 26%, if I go offline don't deploy to prod.'",
    25: "QUARTER LIFE REMAINING! Only 25% left of your digital lifeline. Anxiety spikes!",
    24: "You refrain from running dev servers and switch to inspecting static code files.",
    23: "You stare at the battery icon every 45 seconds watching it tick down like a timer.",
    22: "You turn off Wi-Fi, Bluetooth, NFC, and secondary monitors in total lockdown protocol.",
    21: "21%... The calm before the Low Power Mode popup storm.",
    20: "CRITICAL 20% THRESHOLD! Red alert mode initiated. Hands begin to sweat.",
    19: "Under 20%! You calculate every click like it costs 100 dollars of electrical grid power.",
    18: "You stop formatting code automatically on save to save parsing overhead.",
    17: "Seventeen percent. Your device is whisper-begging for alternating current.",
    16: "You decline all pull request reviews. 'Battery emergency, cannot approve.'",
    15: "15% EMERGENCY BARRIER! System pops low battery notifications. Code auto-saved every 2s.",
    14: "Fourteen percent! You start writing code directly in notepad to save memory.",
    13: "Unlucky 13%! You swear you can feel the CPU thermal throttling out of sheer despair.",
    12: "PANIC! 12%! You scramble under your desk searching for an electrical socket.",
    11: "Eleven percent! Your laptop screen flickers with low-voltage melancholy.",
    10: "DOUBLE DIGIT FINAL SECOND! 10%! Existential threat level reaches CODE RED.",
    9: "SINGLE DIGITS! 9%! The screen dims further than thought physically possible.",
    8: "8% remaining. You draft your digital last will and testament in a `.txt` file.",
    7: "7%... You pray to the gods of Lithium-Ion chemistry for extra minutes.",
    6: "Six percent! You mentally bid farewell to your uncommitted git branches.",
    5: "FIVE PERCENT CRISIS! System forces battery saver mode. Screen brightness: 2%.",
    4: "Four percent! Fans stop spinning completely. The silence is deafening.",
    3: "Three percent! You enter the realm of pure chaos mathematics. Shutdown imminent.",
    2: "TWO PERCENT GHOST TOWN! Device is running on pure willpower and prayers.",
    1: "QUANTUM ENTANGLEMENT MODE! 1%! Unplugging will tear a rift in space-time continuum.",
    0: "DEAD BATTERY MATRIX. 0%! How are you even reading this right now? Absolute wizardry."
};

/**
 * Generates structured over-analysis output based on percentage and charging state.
 */
function getAnalysis(pct, isCharging = false) {
    pct = Math.min(100, Math.max(0, Math.round(pct)));

    let recommendation = "";
    let statusPill = "";
    let threatLevel = "";
    let panicIndex = 0;

    if (isCharging) {
        if (pct === 100) {
            recommendation = "Charge immediately. Do NOT unplug under any circumstances!";
            statusPill = "TOXIC PERFECTIONISM ZONE";
            threatLevel = "LEVEL 1: HARMONIOUS CO-DEPENDENCY";
            panicIndex = 5;
        } else if (pct >= 80) {
            recommendation = "Keep plugged in. Unplugging starts the clock of mortality.";
            statusPill = "LITHIUM GLUTTONY";
            threatLevel = "LEVEL 2: COMPLACENT RECHARGING";
            panicIndex = 12;
        } else {
            recommendation = "Gulp down watts aggressively. Consume electricity like soup.";
            statusPill = "POWER CONSUMPTION BINGE";
            threatLevel = "LEVEL 3: JOULE ABSORPTION MODE";
            panicIndex = 25;
        }
    } else {
        if (pct === 100) {
            recommendation = "Charge immediately! 100% unplugged is a dangerous illusion.";
            statusPill = "PARANOID PERFECTIONISM";
            threatLevel = "LEVEL 5: PREEMPTIVE FREAKOUT";
            panicIndex = 30;
        } else if (pct >= 80) {
            recommendation = "Prepare for inevitable decline. Eyeball the wall socket now.";
            statusPill = "FALSE SECURITY COMFORT";
            threatLevel = "LEVEL 2: SMUG COMPLACENCY";
            panicIndex = 20;
        } else if (pct >= 50) {
            recommendation = "Initiate mild panic. Close 30 idle Chrome tabs immediately.";
            statusPill = "MID-LIFE BATTERY CRISIS";
            threatLevel = "LEVEL 3: EXISTENTIAL BECOMING";
            panicIndex = 48;
        } else if (pct >= 20) {
            recommendation = "TACTICAL SURVIVAL MODE: Dim screen, stop listening to music.";
            statusPill = "TACTICAL CONSERVATION";
            threatLevel = "LEVEL 4: SEVERE ANXIETY";
            panicIndex = 75;
        } else if (pct >= 5) {
            recommendation = "CRITICAL CODE RED: Crawl under desk searching for power brick!";
            statusPill = "PANIC PROTOCOL ACTIVE";
            threatLevel = "LEVEL 5: DEFCON 1 COLLAPSE";
            panicIndex = 95;
        } else {
            recommendation = "ACCEPT YOUR FATE: Commit code to git before dark void arrives.";
            statusPill = "QUANTUM FLUX EXTREMITY";
            threatLevel = "LEVEL 6: TOTAL ENTROPY";
            panicIndex = 99;
        }
    }

    const quote = QUOTES_0_100[pct] || `Battery at ${pct}%. Existential parameters degrading at normal rates.`;
    const absurdDrain = ABSURD_DRAIN_CAUSES[pct % ABSURD_DRAIN_CAUSES.length];

    return {
        percentage: pct,
        isCharging: isCharging,
        statusPill: statusPill,
        recommendation: recommendation,
        deepInsight: quote,
        threatLevel: threatLevel,
        panicIndex: panicIndex,
        absurdDrain: absurdDrain,
        existentialQuestion: `If a battery drops from ${pct}% to ${Math.max(0, pct - 1)}% in a forest with no charger, does it make a sound?`,
        humanizedDiagnosis: `Subject displays ${panicIndex}% emotional dependency on electron movement through lithium-cobalt oxide matrix.`
    };
}

module.exports = {
    getAnalysis,
    QUOTES_0_100,
    ABSURD_DRAIN_CAUSES
};
