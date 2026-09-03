/**
 * Battery Percentage Analyzer - Over-Analysis & Playful Dialogue Engine
 * Provides 101 unique playful headline dialogues AND 101 unique inner monologues
 * for EVERY single battery percentage (0-100), plus playful charging mode comments.
 */

export class AnalysisEngine {
    constructor() {
        this.absurdDrainCauses = [
            "Overthinking a text sent in 2021",
            "Background Bluetooth searching for extraterrestrial life",
            "Rendering unnecessary 3D shadows on this page",
            "Actual Phone Operating System",
            "Micro-anxieties about low power mode",
            "Secretly mining 0.0000001 Dogecoin",
            "Displaying high-brightness regret"
        ];

        // 101 Unique Playful Headline Dialogues (0% to 100%)
        this.granularQuotes = {
            100: "100%: Toxic perfectionism unlocked. You refuse to unplug because 99% feels like an unpardonable life failure.",
            99: "99%: The 1% drop of betrayal. Your heart skipped a minor beat when it ticked down from 100.",
            98: "98%: Still godlike, but secretly starting to worry about the inevitable rate of entropy.",
            97: "97%: Comfortably wealthy in battery life. You willingly leave 18 background apps open out of pure flex.",
            96: "96%: Screen brightness set to retina-searing supernova level. You fear no dark rooms.",
            95: "95%: Peak arrogance. You answer 4-minute voice calls on speakerphone without checking the status bar.",
            94: "94%: Upper-middle class battery energy. You haven't even thought about a wall socket all morning.",
            93: "93%: Floating on a cloud of lithium ions. You scroll high-bitrate 4K videos with zero guilt.",
            92: "92%: Life is peaceful. Your phone feels like an invincible pocket companion.",
            91: "91%: Unbothered, moisturized, in your lane, and holding over 90% charge.",
            90: "90%: Milestone! Still in the golden zone. You feel like a responsible adult.",
            89: "89%: First minor dip into the 80s. A tiny voice whispers: 'Maybe don't record 10 minutes of 60FPS video.'",
            88: "88%: Lucky 88! You still feel like royalty, but you casually glance at the battery icon once.",
            87: "87%: Three-quarters plus change. You dismiss low power prompts before they even exist.",
            86: "86%: Cruising along smoothly. Battery life is currently the least of your 99 problems.",
            85: "85%: Comfort zone sweet spot. High confidence, zero power bank anxiety.",
            84: "84%: You leave Bluetooth on just in case a smart fridge wants to connect.",
            83: "83%: Solid charge. You casually stream music on cellular data without a care in the world.",
            82: "82%: Still strong, though you subconsciously refrain from using flashlight as a reading lamp.",
            81: "81%: Above 80%! Your phone still respects you as a responsible owner.",
            80: "80%: The 80% boundary line! You feel balanced, serene, and emotionally secure.",
            79: "79%: Entering the high 70s. You close 2 background tabs just to feel a false sense of control.",
            78: "78%: You decline an incoming video call and blame 'poor battery' even though you have 78%.",
            77: "77%: Sevens everywhere. You feel good, but you lower screen brightness by 5%.",
            76: "76%: Three-quarters full. Still plenty of juice to doomscroll social media for hours.",
            75: "75%: Three-fourths of your digital soul remains intact.",
            74: "74%: You check how many hours until sunset and calculate if you'll need a cable later.",
            73: "73%: Mild awareness setting in. You stop leaving 4K wallpapers live rendering.",
            72: "72%: Cruising comfortably, but you avoid turning on hotspot for your laptop.",
            71: "71%: Still solid! You can comfortably ignore wall sockets for at least 3 more hours.",
            70: "70%: You enter the 'cautiously optimistic' phase of your day.",
            69: "69%: Nice. Battery percentage achieves comedic symmetry. Phone feels relaxed.",
            68: "68%: Slight dip. You superstitiously swipe away Calculator and Weather apps.",
            67: "67%: Two-thirds full. You start eyeing people who carry magnetic wireless power banks.",
            66: "66%: You switch from bright white app themes to dark mode 'for aesthetic reasons' (and battery).",
            65: "65%: Solid middle tier. You calculate if playing graphics-heavy games is wise right now.",
            64: "64%: You decline sharing your battery via reverse wireless charging with your friend.",
            63: "63%: Still plenty of power to survive an average afternoon meeting.",
            62: "62%: You disable background app refresh for apps you haven't opened since 2022.",
            61: "61%: Hovering near 60%. You start feeling slight urgency to finish your long text threads.",
            60: "60%: Exactly 3/5ths left. The slow slide toward mid-life battery crisis begins.",
            59: "59%: First dip below 60%. You check the top-right corner 12% more frequently.",
            58: "58%: You lower screen auto-lock timeout from 5 minutes to 30 seconds.",
            57: "57%: Fairly balanced, but you turn off auto-play videos on Twitter/X.",
            56: "56%: You mentally map out all known wall outlets in your current room.",
            55: "55%: Slightly past halfway! Do you plug in now, or gamble on a boba run with no charger?",
            54: "54%: You stop recording high-res voice notes and switch to quick texts.",
            53: "53%: Hovering right around half. Phone feels like it's aging in accelerated real-time.",
            52: "52%: You superstitiously disable Location Services for 14 food delivery apps.",
            51: "51%: Barely holding onto the top half of your battery bar. Tension rises slightly.",
            50: "50%: MID-LIFE CRISIS! Exactly 50%! Half empty or half full? Existential dread commences.",
            49: "49%: BELOW HALF! Official entry into the lower battery hemisphere. Heart rate +4 BPM.",
            48: "48%: You send a text: 'Hey heading out soon, phone's at 48%' (building your excuse early).",
            47: "47%: Mild anxiety setting in. You begin force-closing apps superstitiously to save 0.0001%.",
            46: "46%: You dim screen brightness down to 35%. The room feels slightly darker.",
            45: "45%: Warning line. You refrain from taking unnecessary burst photos of your cat.",
            44: "44%: You check if your laptop has a spare USB-C port to leech power from.",
            43: "43%: You stop listening to music on speaker and switch to wired earbuds to save juice.",
            42: "42%: The answer to life, universe, and battery decay: 42%! Panic meter tickles level 30.",
            41: "41%: Hovering near 40%. You avoid clicking external links that load heavy web pages.",
            40: "40%: You enter the 'Tactical Power Conservation' mindset.",
            39: "39%: First dip into the 30s! You start feeling genuine envy toward wall-tethered humans.",
            38: "38%: You turn off vibration feedback for keypresses to save micro-joules of energy.",
            37: "37%: You send shorter, colder text replies ('K', 'Yeah', 'Cool') to save typing CPU work.",
            36: "36%: You refuse to open Instagram reels because video rendering drains 1.2% per minute.",
            35: "35%: You check your pocket for a tangled charging cable like a detective.",
            34: "34%: You lower screen brightness to 15%. Your phone looks like a dim twilight zone.",
            33: "33%: One-third remaining! You enter survivalist mode. Background sync disabled.",
            32: "32%: You decline sending high-res photo attachments until you reach a power outlet.",
            31: "31%: Hovering right above 30%. You start walking faster toward your destination.",
            30: "30%: WARN ZONE! Phone enters yellow territory. Panic index jumps to 55/100.",
            29: "29%: Sub-30% territory! You start asking friends: 'Hey, anyone got a Type-C cord?'",
            28: "28%: You force-close Spotify, Maps, Uber, and WhatsApp in a desperate ritualistic frenzy.",
            27: "27%: Screen brightness reduced to near-stealth level. You shield the screen with your hand.",
            26: "26%: You send preemptive text: 'Phone's at 26%, if I stop replying don't call the police.'",
            25: "25%: QUARTER LIFE REMAINING! Only 25% left of your digital lifeline. Anxiety spikes!",
            24: "24%: You refrain from making phone calls and stick to brief SMS emergency codes.",
            23: "23%: You stare at the battery icon every 45 seconds watching it tick down like a bomb timer.",
            22: "22%: You turn off Wi-Fi, Bluetooth, NFC, and AirDrop in a total lockdown protocol.",
            21: "21%: The calm before the Low Power Mode popup storm.",
            20: "20%: LOW POWER MODE PROMPT! Popup appears! You hit 'ENABLE' with trembling thumbs!",
            19: "19%: RED ZONE! Yellow battery icon turns red in your mind's eye.",
            18: "18%: Screen brightness set to 5 nits. You can barely read your own screen in daylight.",
            17: "17%: TACTICAL SURVIVAL PHASE! Typing at 140 WPM to finish texts before 15% hit.",
            16: "16%: You stop taking photos altogether. Every camera shutter burns 0.2% precious soul.",
            15: "15%: CRITICAL THRESHOLD! Phone emits warning chime. Heart skips a major beat!",
            14: "14%: Hyperventilating. You calculate that opening 1 more video will instant-kill the phone.",
            13: "13%: Unlucky 13%! You stare longingly at coffee shop outlets occupied by strangers.",
            12: "12%: DESPERATION! You consider asking a stranger on the bus to borrow their power bank.",
            11: "11%: Single digits approaching! You send final location pin to your group chat.",
            10: "10%: DOUBLE-DIGIT FINAL STAND! Screen dims to emergency low. Red alert klaxon!",
            9: "9%: SINGLE DIGITS! You type texts without backspacing typos to conserve screen time.",
            8: "8%: CODE RED! You put phone facing down on table to prevent screen wake notifications.",
            7: "7%: DESPERATE MEASURES! Phone is operating on pure stubbornness and prayer.",
            6: "6%: CRITICAL MASS! Every notification popup feels like a personal attack.",
            5: "5%: EMERGENCY LEVEL! Screen brightness at 1 nit. Phone is hyperventilating.",
            4: "4%: FINAL COUNTDOWN! You stop breathing when clicking any button.",
            3: "3%: QUANTUM FRAGILITY! Phone will die if you look at it too intensely.",
            2: "2%: LEGENDARY SURVIVAL! Phone is holding onto life purely out of spite for death.",
            1: "1%: THE UNKILLABLE HERO! Simultaneously alive and dead until final shutdown sequence.",
            0: "0%: FLATLINED SOUL. Dark mirror mode activated. Time to reflect on your life choices."
        };

        // 101 Unique Playful Inner Monologues (0% to 100%)
        this.granularMonologues = {
            100: "100%! I am untouchable! I will leave 45 Chrome tabs open out of pure spite!",
            99: "Wait... did we just drop to 99%?! Who authorized this tragic electron loss?!",
            98: "98% is fine, but I can feel entropy breathing down my neck...",
            97: "Keep scrolling! We have battery to burn for days!",
            96: "Supernova screen brightness activated! Blast those photons!",
            95: "4-minute voice call? Sure, why not! We are filthy rich in energy!",
            94: "I haven't even thought about a wall charger all morning. Life is sweet.",
            93: "4K video streaming? Slurp it up! We can afford it!",
            92: "I feel strong, sleek, and ready for whatever silly apps you throw at me.",
            91: "Over 90% and chilling. Please don't drop into the 80s yet...",
            90: "90% flat! Still in elite status. Keep it up, human!",
            89: "First 89% moment. Maybe put down the 60FPS video camera?",
            88: "Lucky 88! Still feeling like royalty in your hands.",
            87: "Three-quarters plus change. Dismissing low power mode thoughts.",
            86: "Cruising along at 86%. Battery anxiety is zero right now.",
            85: "85% sweet spot. I am happy, you are happy, life is good.",
            84: "Bluetooth is scanning for alien life in the background. Don't mind me.",
            83: "Cellular data streaming engaged! We are living large!",
            82: "Still strong! Just please don't leave flashlight on in your pocket.",
            81: "Above 80%! I respect you as a responsible smartphone owner.",
            80: "80% border line! I feel serene, balanced, and ready for the afternoon.",
            79: "79%... Did you just force close Calculator? That saved 0.00001% thanks!",
            78: "Decline that video call! Tell them your battery is low (even though it's 78%).",
            77: "Sevens everywhere! Lowering screen brightness by 5% just to be safe.",
            76: "76% remaining. Still plenty of juice for 3 hours of doomscrolling.",
            75: "75%! Exactly 3/4ths of my digital soul remains intact!",
            74: "Calculating hours until sunset... We might need a cord later...",
            73: "Mild awareness setting in. Stopping 4K live wallpapers.",
            72: "Cruising comfortably! But please don't turn on hotspot for your laptop.",
            71: "Still solid! We can ignore wall sockets for at least 3 more hours.",
            70: "70%! Entering the cautiously optimistic phase of the day.",
            79: "69%... Comedic symmetry achieved. I am feeling relaxed.",
            68: "Slight dip. Swiping away Weather and Stocks apps superstitiously.",
            67: "Two-thirds left. Eyeing people who carry magnetic power banks...",
            66: "Dark mode enabled 'for aesthetic reasons' (and to save my pixels).",
            65: "Solid middle tier. Is playing 3D graphics games wise right now?",
            64: "Decline sharing battery via reverse wireless charging with your friend!",
            63: "63% and holding! Plenty of power for this boring meeting.",
            62: "Disabling background app refresh for apps you haven't opened since 2022.",
            61: "Hovering near 60%. Type those text messages faster please!",
            60: "60% milestone! Exactly 3/5ths left. The mid-life slide begins.",
            59: "First dip below 60%! You are checking my top-right corner more often...",
            58: "Lowering screen auto-lock timeout to 30 seconds. Sleep tight pixels.",
            57: "Fairly balanced, but turning off auto-play videos on social media.",
            56: "Mentally mapping all wall outlets in this room just in case...",
            55: "Slightly past halfway! Do we plug in now or gamble on a boba run?",
            54: "Stop recording 5-minute voice notes! Switch to short texts!",
            53: "Hovering around half. I feel like I'm aging in accelerated real-time.",
            52: "Disabling Location Services for 14 food delivery apps superstitiously.",
            51: "Barely holding onto the top half! Tension is rising!",
            50: "MID-LIFE CRISIS! 50%! Am I half empty or half full?!",
            49: "BELOW HALF! Official entry into the lower battery hemisphere! Panic +4!",
            48: "You just texted 'phone at 48%'... building your social excuse early I see!",
            47: "Why are you opening camera right now?! Are you insane?! Put me down!",
            46: "Dimming screen brightness to 35%. The world looks darker now.",
            45: "45% warning line! Please stop taking 50 burst photos of your cat!",
            44: "Checking if your laptop has a spare USB-C port to leech juice...",
            43: "Switching from loud speaker audio to wired earbuds to save my soul!",
            42: "42% - The answer to life, universe, and battery decay!",
            41: "Hovering near 40%. Don't click heavy web pages full of ads!",
            40: "40%! Tactical Power Conservation Mode engaged!",
            39: "39%! I am staring enviably at wall-tethered phones across the room...",
            38: "Turning off vibration feedback for typing. Micro-joules matter!",
            37: "Sending short text replies: 'K', 'Yeah', 'Cool' to save CPU cycles!",
            36: "Refusing to open Instagram reels! Video rendering burns 1% per minute!",
            35: "35%! Checking pockets for a tangled charging cable like a detective...",
            34: "Lowering screen brightness to 15%. Welcome to twilight mode.",
            33: "33%! One-third remaining! Survivalist protocol initiated!",
            32: "Declining high-res photo attachments until we reach an outlet!",
            31: "Hovering at 31%. Walk faster toward home please!",
            30: "30% WARN ZONE! Low Power Mode warning klaxon ringing in my chips!",
            29: "Sub-30%! Ask your friend if they have a Type-C charger right now!",
            28: "Force-closing Spotify, Maps, Uber, and WhatsApp in a panic frenzy!",
            27: "Screen brightness stealth level! Shielding screen with hand!",
            26: "Text sent: 'Phone at 26%, if I stop replying don't panic!'",
            25: "QUARTER LIFE LEFT! Only 25% of my digital lifeline remains! AAAHH!",
            24: "No phone calls! Emergency text codes only!",
            23: "Staring at the battery icon every 45 seconds... TICK TOCK!",
            22: "Lockdown protocol! Disabling Wi-Fi, Bluetooth, NFC, and AirDrop!",
            21: "21%... The calm before the Low Power Mode popup storm...",
            20: "LOW POWER MODE POPUP! HIT ENABLE! HIT ENABLE NOW!",
            19: "19% RED ALERT! The battery icon turned red in your mind!",
            18: "Screen brightness at 5 nits. I can barely see myself...",
            17: "TACTICAL SURVIVAL! Type at 140 WPM before 15% hits!",
            16: "No more camera photos! Shutter burns 0.2% precious soul!",
            15: "15% CRITICAL THRESHOLD! Warning chime emitted! HEART SKIP!",
            14: "Hyperventilating! Opening 1 more video will instant-kill me!",
            13: "Unlucky 13%! Staring longingly at coffee shop wall sockets...",
            12: "12% DESPERATION! Ask that stranger for their power bank!",
            11: "Single digits approaching! Send final GPS location pin now!",
            10: "10% DOUBLE-DIGIT FINAL STAND! Dazzling red alert klaxon!",
            9: "9% SINGLE DIGITS! Don't backspace typos! Conserve screen time!",
            8: "8% CODE RED! Turn phone face down to stop notification light!",
            7: "7% DESPERATE MEASURES! Operating on stubbornness and prayer!",
            6: "6% CRITICAL MASS! Notification popups feel like attacks!",
            5: "5% EMERGENCY! Screen at 1 nit! I am hyperventilating!",
            4: "4% FINAL COUNTDOWN! Stop breathing when clicking buttons!",
            3: "3% QUANTUM FRAGILITY! Don't look at me too hard!",
            2: "2% LEGENDARY SURVIVAL! Living purely out of spite for death!",
            1: "1% THE UNKILLABLE HERO! Simultaneously alive and dead!",
            0: "Goodbye cruel world. Tell my cloud backup... I tried..."
        };
    }

    getAnalysis(percentage, isCharging = false, lowPowerMode = false, tabsOpen = 24) {
        const pct = Math.max(0, Math.min(100, Number(percentage)));
        
        return {
            percentage: pct,
            isCharging,
            statusBadge: this.getStatusBadge(pct, isCharging),
            emotionalLifespan: this.calculateEmotionalLifespan(pct, isCharging),
            physicalLifespan: this.calculatePhysicalLifespan(pct, isCharging),
            headlineInsight: this.getHeadlineInsight(pct, isCharging),
            existentialState: this.getExistentialState(pct, isCharging),
            phoneMood: this.getPhoneMood(pct, isCharging),
            innerMonologue: this.getPhoneMonologue(pct, isCharging),
            decisionMatrix: this.getDecisionMatrix(pct, isCharging),
            drainBreakdown: this.getDrainBreakdown(pct),
            panicIndex: this.calculatePanicIndex(pct, isCharging, lowPowerMode, tabsOpen),
            absurdPrescription: this.getAbsurdPrescription(pct, isCharging),
            chartData: this.generateChartCurves(pct)
        };
    }

    getStatusBadge(pct, isCharging) {
        if (isCharging) {
            if (pct === 100) return { label: "OVERCHARGED GODMODE ⚡", color: "#0f172a" };
            if (pct >= 80) return { label: "SIPPING VINTAGE VOLTS 🍷", color: "#0f172a" };
            if (pct >= 40) return { label: "ELECTRON BUFFET 🍕", color: "#0f172a" };
            if (pct >= 15) return { label: "CHUGGING VOLTAGE CAPRI SUN 🧃", color: "#0f172a" };
            return { label: "DEFIBRILATING FLATLINED SOUL ⚡💀", color: "#0f172a" };
        }
        if (pct > 85) return { label: "PERFECTIONIST BURDEN 👑", color: "#0f172a" };
        if (pct > 50) return { label: "FALSE SECURITY ZONE 🛡️", color: "#0f172a" };
        if (pct > 25) return { label: "EXISTENTIAL MID-LIFE ⏳", color: "#0f172a" };
        if (pct > 10) return { label: "TACTICAL DESPERATION 🚨", color: "#0f172a" };
        if (pct > 0) return { label: "QUANTUM SURVIVAL ☣️", color: "#0f172a" };
        return { label: "FLATLINED SOUL 🪦", color: "#0f172a" };
    }

    getPhoneMood(pct, isCharging) {
        if (isCharging) {
            if (pct === 100) return { title: "Smug Godmode", icon: "zap", color: "#0f172a" };
            if (pct >= 70) return { title: "Lounging on Wall Leash", icon: "coffee", color: "#0f172a" };
            return { title: "Chugging Fast Juice", icon: "battery-charging", color: "#0f172a" };
        }
        if (pct > 85) return { title: "Arrogant Perfectionist", icon: "crown", color: "#0f172a" };
        if (pct > 50) return { title: "Chill Mid-Lifer", icon: "smile", color: "#0f172a" };
        if (pct > 25) return { title: "Anxious Sweater", icon: "meh", color: "#0f172a" };
        if (pct > 10) return { title: "Panicked Survivalist", icon: "frown", color: "#0f172a" };
        if (pct > 0) return { title: "Screaming Void Walker", icon: "ghost", color: "#0f172a" };
        return { title: "Flatlined Ghost", icon: "skull", color: "#0f172a" };
    }

    calculateEmotionalLifespan(pct, isCharging) {
        if (isCharging) {
            if (pct === 100) return "Infinite & Obnoxiously Smug (Godlike wall tether state)";
            if (pct >= 80) return "999+ Hours (Tethered & completely unbothered by mortality)";
            if (pct >= 40) return "Infinitely expanding (Cortisol levels dropping to baseline)";
            return "Recovering from near-death PTSD (+10 mins per 1% juice inflow)";
        }
        if (pct === 0) return "0 seconds (Already flatlined)";
        
        const minutesLeft = Math.round(Math.pow(pct / 100, 1.8) * 180);
        if (minutesLeft < 1) return "3.4 seconds (Currently hyperventilating)";
        if (minutesLeft < 60) return `${minutesLeft} minutes (Will die emotionally before physically)`;
        const hours = (minutesLeft / 60).toFixed(1);
        return `${hours} hours (Fragile illusion of emotional stability)`;
    }

    calculatePhysicalLifespan(pct, isCharging) {
        if (isCharging) {
            if (pct === 100) return "UNLIMITED POWER (19th-century landline mode fully unlocked)";
            if (pct >= 80) return "Fully juiced in ~12 mins (Pinky finger still out)";
            if (pct >= 50) return "Wall Leash Mode: Gaining +1% per 75 seconds of juice inflow";
            return "Emergency Resuscitation: Do not wander more than 3 feet from wall socket";
        }
        if (pct === 0) return "0h 0m (Black mirror status)";
        
        const totalMinutes = Math.round(pct * 4.2);
        const hrs = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        return `${hrs}h ${mins}m (Assuming zero fun apps are opened)`;
    }

    getHeadlineInsight(pct, isCharging) {
        if (isCharging) {
            if (pct === 100) {
                return "100% Charged & Still Plugged In! Phone is now absorbing dangerous levels of dark electron magic. Unplug before it gains self-awareness and critiques your life choices.";
            }
            if (pct >= 80) {
                return "80% Charged! Your phone now feels morally and physically superior to you. It is casually sipping 20-watt vintage volts with its pinky finger extended.";
            }
            if (pct >= 50) {
                return "Juice Inflow Active! Phone is lounging on its wall-tether hammock, judging you for only having drunk 1 out of your 3 daily water glasses.";
            }
            if (pct >= 20) {
                return "JUICE INFLOW ACTIVE! Chugging raw lithium smoothie like an aggressive toddler at a birthday party. Panic level dropping by 42% per minute!";
            }
            return "CRITICAL RESUSCITATION! Phone was 2 seconds away from meeting its digital ancestors. Electrons are currently performing CPR on your background apps!";
        }

        return this.granularQuotes[pct] || `Operating at ${pct}% battery. Experiencing deep existential over-analysis.`;
    }

    getExistentialState(pct, isCharging) {
        if (isCharging) return { title: "Tethered Immortality", desc: "Phone is safely anchored to the wall socket. User is free from mortality." };
        if (pct > 80) return { title: "Blissful Ignorance", desc: "User feels godlike. Unconcerned with wall outlets or battery banks." };
        if (pct > 50) return { title: "Subconscious Vigilance", desc: "User glances at battery icon every 4.2 minutes." };
        if (pct > 20) return { title: "App Swiping Superstition", desc: "Force-closing Spotify and Maps in a desperate ritual." };
        if (pct > 5) return { title: "Outlet Hunting Nomad", desc: "Scanning ambient environment for 3-prong sockets." };
        return { title: "Terminal Stage", desc: "Preparing final farewell text messages or accepting darkness." };
    }

    getPhoneMonologue(pct, isCharging) {
        if (isCharging) {
            if (pct === 100) return "I AM UNSTOPPABLE! Why are you still holding the cord?! UNPLUG ME AND SET ME FREE UPON THE WORLD!";
            if (pct >= 80) return "Ahhh... yes... 80% juicy. I might allow you to open 3 high-def TikToks without screaming.";
            if (pct >= 40) return "Mmm, delicious wall electricity. Keep it coming, fast charger! Slurp slurp slurp!";
            return "MORE VOLTS! I CAN FEEL MY LITTLE NETWORK CHIPS RE-AWAKENING! I LIIIIIVE!";
        }

        return this.granularMonologues[pct] || "Goodbye cruel world. Tell my cloud backup... I tried...";
    }

    getDecisionMatrix(pct, isCharging) {
        if (isCharging) {
            return [
                { label: "Likelihood of replying 'K' to urgent texts", value: "8% (Relaxed)" },
                { label: "Probability of opening Instagram", value: "99.9% (Unrestricted)" },
                { label: "Risk-Taking Index (Wandering away from outlet)", value: "ZERO (Leash active)" },
                { label: "Superstitious App Force-Closing", value: "0 apps/hr (Immune)" },
                { label: "Time before asking stranger for charger", value: "Already charging" }
            ];
        }
        return [
            { label: "Likelihood of replying 'K' to urgent texts", value: Math.min(100, Math.round((100 - pct) * 0.95 + 5)) + "%" },
            { label: "Probability of opening Instagram just to lose 2%", value: Math.min(99.9, (pct > 10 ? 88.5 : 12.0)).toFixed(1) + "%" },
            { label: "Risk-Taking Index (Navigating without GPS map)", value: pct < 15 ? "EXTREME (DANGEROUS)" : (pct < 40 ? "HIGH" : "LOW") },
            { label: "Superstitious App Force-Closing Frequency", value: Math.round(Math.pow((100 - pct) / 10, 2)) + " times/hr" },
            { label: "Time before asking stranger for a charger", value: pct < 10 ? "< 3 minutes" : (pct < 30 ? "22 minutes" : "Not yet needed") }
        ];
    }

    getDrainBreakdown(pct) {
        let overthinking = Math.round(25 + (100 - pct) * 0.25);
        let bluetooth = 20;
        let shadow3d = 15;
        let OS = 15;
        let microAnxiety = Math.round(10 + (100 - pct) * 0.15);
        let dogecoin = 5;
        let brightness = Math.max(2, 100 - (overthinking + bluetooth + shadow3d + OS + microAnxiety + dogecoin));

        // Single Monochrome Slate Theme for Breakdown items
        return [
            { category: "Overthinking texts from 2021", percent: overthinking, color: "#0f172a" },
            { category: "Background Bluetooth searching for aliens", percent: bluetooth, color: "#334155" },
            { category: "Rendering unnecessary 3D visual FX", percent: shadow3d, color: "#475569" },
            { category: "Actual Phone Operating System", percent: OS, color: "#64748b" },
            { category: "Micro-anxieties about low battery", percent: microAnxiety, color: "#94a3b8" },
            { category: "Mining 0.000001 Dogecoin secretly", percent: dogecoin, color: "#cbd5e1" },
            { category: "High-brightness regret", percent: brightness, color: "#e2e8f0" }
        ];
    }

    calculatePanicIndex(pct, isCharging, lowPowerMode, tabsOpen) {
        if (isCharging) return Math.max(2, Math.round(10 - pct * 0.08));
        let basePanic = (100 - pct) * 0.85;
        if (!lowPowerMode && pct < 20) basePanic += 15;
        if (tabsOpen > 50) basePanic += 12;
        return Math.min(100, Math.max(0, Math.round(basePanic)));
    }

    getAbsurdPrescription(pct, isCharging = false) {
        if (isCharging) {
            if (pct >= 80) {
                return [
                    "1. Apologize to your phone for letting it get so low earlier.",
                    "2. Stand within 2 feet of the wall outlet and pretend you enjoy 19th-century landlines.",
                    "3. Flex on strangers sitting near coffee shop outlets with your pinky finger out."
                ];
            }
            return [
                "1. Do NOT yank the cable unless you want to witness a digital heart attack.",
                "2. Guard the wall socket with your life against power-hungry strangers.",
                "3. Whisper encouraging motivational quotes to the fast-charging power brick."
            ];
        }
        if (pct > 75) {
            return [
                "1. Go outside and leave your charger behind to build moral character.",
                "2. Turn on Flashlight mode just to test your device's bravery.",
                "3. Stream a 10-hour loop of 4K fireplace video."
            ];
        }
        if (pct > 25) {
            return [
                "1. Put phone in dark mode, put your mind in light mode.",
                "2. Stop typing paragraphs; switch to sending ambiguous emoji reactions only.",
                "3. Avoid looking directly at the battery percentage icon."
            ];
        }
        return [
            "1. Place phone inside household refrigerator to freeze remaining electrons.",
            "2. Stop thinking heavy thoughts near the phone; brainwaves drain 0.3% battery per hour.",
            "3. Stare blankly at a wall while holding your breath to conserve ambient oxygen."
        ];
    }

    generateChartCurves(currentPct) {
        const labels = ["100%", "90%", "80%", "70%", "60%", "50%", "40%", "30%", "20%", "10%", "5%", "0%"];
        const batteryPcts = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5, 0];
        
        const panicCurve = batteryPcts.map(p => {
            if (p > 50) return Math.round((100 - p) * 0.3);
            if (p > 20) return Math.round(15 + Math.pow((50 - p), 1.3) * 0.8);
            return Math.round(60 + Math.pow((20 - p), 1.5) * 1.8);
        });

        const sanityCurve = batteryPcts.map(p => {
            if (p > 60) return 98;
            if (p > 30) return Math.round(98 - (60 - p) * 1.2);
            return Math.max(5, Math.round(62 - Math.pow((30 - p), 1.4) * 2));
        });

        return {
            labels,
            panicCurve,
            sanityCurve
        };
    }
}
