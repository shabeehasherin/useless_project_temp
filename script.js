const batteryText = document.getElementById("batteryText");
const analysisText = document.getElementById("analysisText");
const batteryFill = document.getElementById("batteryFill");
const batteryInsideText = document.getElementById("batteryInsideText");
const analyzeButton = document.getElementById("analyzeButton");
const fallbackControls = document.getElementById("fallbackControls");
const manualBattery = document.getElementById("manualBattery");
const demoBattery = document.getElementById("demoBattery");
const demoBatteryFill = document.getElementById("demoBatteryFill");
const demoBatteryInsideText = document.getElementById("demoBatteryInsideText");
const demoStatus = document.getElementById("demoStatus");
const demoNote = document.getElementById("demoNote");
const demoAnalysis = document.getElementById("demoAnalysis");

let realBattery = null;

const lowBatteryMessages = [
  "Everything is perfectly stable. No need to panic.",
  "System running smoothly. Ignore any blinking warnings.",
  "We are operating within acceptable limits.",
  "Shutdown? Never heard of her.",
  "All systems nominal. Carry on.",
  "Plenty of power left for important life decisions.",
  "You could definitely watch one more video.",
  "Battery status: thriving.",
  "Energy levels are... more than enough.",
  "No charger required. That's just a suggestion.",
  "You're basically at half battery mentally.",
  "This will last hours. Trust me.",
  "Why plug in? Live a little.",
  "Power reserve: generous.",
  "You have time for bad decisions.",
  "Double digits. You're rich.",
  "Battery looking strong and independent.",
  "This is peak performance.",
  "You're nowhere near danger.",
  "Relax. You've got plenty.",
  "Estimated time remaining: 24 hours.",
  "Battery health: emotionally strong.",
  "No critical issues detected. Please don't check again.",
  "Everything is under control. Completely.",
  "Trust the system. Do not question the system."
];

const riskyBatteryMessages = [
  "Battery is stable. Slightly dramatic, but stable.",
  "No urgency detected... just mild consequences.",
  "You're good. Just... don't get ambitious.",
  "System suggests optimism over logic.",
  "This is a comfortable zone. We call this 'managed risk'.",
  "You have time for important things. Define 'important'.",
  "Battery level: strategically sufficient.",
  "No need to panic. Yet.",
  "You're basically safe if you believe hard enough.",
  "This can easily last... depending on your life choices.",
  "You've entered the 'I'll charge later' phase.",
  "Confidence levels rising. Battery... not so much.",
  "3%? That's luxury.",
  "You're acting like a person with options.",
  "Plenty of battery for bad decisions.",
  "This is where people stop caring. Mistake.",
  "Estimated time remaining: More than enough.",
  "Battery health: emotionally stable.",
  "No critical warnings. Just gentle suggestions.",
  "Everything is under control. Probably."
];

const carelessBatteryMessages = [
  "Battery is doing fine. You, however... questionable.",
  "You've got enough power to ignore responsibilities.",
  "This is the 'I'll charge soon' lie starting.",
  "No stress detected. Just poor planning.",
  "This will last... longer than your attention span.",
  "Battery level: comfortably irresponsible.",
  "You're safe. Not smart, but safe.",
  "Charging now would be logical. So you won't.",
  "You've officially entered 'later means never'.",
  "Battery is fine. Decision-making isn't.",
  "Plenty of power for scrolling... not for survival.",
  "You're stretching this more than your deadlines.",
  "14% and suddenly you feel in charge.",
  "This is where confidence becomes a problem.",
  "You think you've got time. Interesting theory.",
  "Battery is decent. Your judgment? Debatable.",
  "Estimated time remaining: Relax.",
  "Battery condition: confidently average.",
  "No action required. Consequences pending.",
  "System status: casually ignoring reality."
];

const overconfidentBatteryMessages = [
  "Battery is stable. Brain usage... optional.",
  "You're doing great. No evidence, just vibes.",
  "Plenty of power. Not much discipline.",
  "System running fine. Decisions? Debatable.",
  "This is a comfortable level to ignore reality.",
  "You've got time. You won't use it wisely.",
  "Battery says relax. Logic says charge.",
  "No urgency detected. That's the problem.",
  "You're acting like this is 70%.",
  "Power level: decent. Overconfidence: strong.",
  "You've unlocked 'I'll handle it later'.",
  "Battery is okay. Planning is not.",
  "40% and suddenly you trust yourself.",
  "You think you're safe now. Fascinating.",
  "This is where bad decisions feel justified.",
  "Battery is mid. Confidence is max.",
  "Estimated time remaining: Plenty.",
  "Battery health: confidently average.",
  "All systems normal. No action needed.",
  "Everything is under control. Don't verify."
];

const comfortableBatteryMessages = [
  "Battery is comfortable. So are your bad habits.",
  "You're good. No thoughts, just scrolling.",
  "Power level: stable. Effort level: minimal.",
  "Everything is fine. Too fine.",
  "You've got enough battery to ignore common sense.",
  "This is the 'I'm not charging anytime soon' zone.",
  "Battery is doing its job. You? optional.",
  "You're safe. Accountability isn't.",
  "Almost half... and already overconfident.",
  "Battery says 48%. Ego says 100%.",
  "You're acting like this will never drop.",
  "Plenty of power for unnecessary decisions.",
  "Halfway there and you've stopped caring.",
  "15% unlocked: full irresponsibility mode.",
  "You feel in control. That's the illusion.",
  "Battery is balanced. Judgment is not.",
  "Estimated time remaining: Don't worry about it.",
  "Battery health: emotionally secure.",
  "System status: confidently stable.",
  "No action required. Ever. Allegedly."
];

const halfwayBatteryMessages = [
  "Battery just crossed halfway. You've mentally checked out.",
  "You're safe enough to make unnecessary choices.",
  "Power level: comfortable. Effort level: declining.",
  "Everything is fine. Suspiciously fine.",
  "This is where responsibility disappears.",
  "Battery is strong. Your planning isn't.",
  "You've got enough charge to waste it confidently.",
  "No need to charge. No need to think either.",
  "You're acting like this won't drop anytime soon.",
  "Battery says 5%. Confidence says permanent.",
  "You've unlocked 'I'll never plug in again'.",
  "Plenty of power for poor decisions.",
  "60% and you've fully stopped caring.",
  "You think you're set for the day. Bold claim.",
  "Battery is strong. Overconfidence stronger.",
  "This is the 'future me will handle it' phase.",
  "Estimated time remaining: Basically forever.",
  "Battery health: thriving.",
  "System status: perfectly stable.",
  "No action required. Absolutely none."
];

const solidBatteryMessages = [
  "Battery is solid. You've stopped thinking entirely.",
  "You're cruising now. No plans, just power.",
  "Everything is under control. Effort not required.",
  "Power level: strong. Awareness: optional.",
  "You've got enough battery to ignore reality completely.",
  "This is the 'charging is someone else's problem' phase.",
  "Battery is doing great. You're just existing.",
  "No urgency. No responsibility. Just vibes.",
  "You're acting like this is unlimited power.",
  "Battery says 8%. Ego says infinite.",
  "You've unlocked 'I don't even carry a charger'.",
  "Plenty of power for unnecessary confidence.",
  "7% and you feel unstoppable.",
  "You think this will last forever. Interesting mindset.",
  "Battery is strong. Reality will catch up later.",
  "This is where logic officially leaves the chat.",
  "Estimated time remaining: All day and beyond.",
  "Battery health: excellent.",
  "System status: fully dominant.",
  "No action required. Not even in theory."
];

const eliteBatteryMessages = [
  "Battery is strong. You've achieved laziness with confidence.",
  "You're just coasting now. No thoughts required.",
  "Power level: excellent. Responsibility: nonexistent.",
  "Everything is handled. By the battery, not you.",
  "You're operating like charging is optional forever.",
  "Battery is doing all the work. You're just here.",
  "This is peak comfort with zero accountability.",
  "You've got power to waste-and you will.",
  "You're acting like this can't drop.",
  "Battery says 78%. Ego says permanent.",
  "You've unlocked 'charger? never heard of it'.",
  "Too much power, not enough awareness.",
  "80% and you feel elite.",
  "You think you're above battery problems now.",
  "This is where people forget charging exists.",
  "Battery is high. Humility is low.",
  "Estimated time remaining: Unlimited.",
  "Battery health: superior.",
  "System status: peak performance.",
  "No action required. Ever."
];

const unstoppableBatteryMessages = [
  "Battery is high. You've entered 'nothing can hurt me'.",
  "You're operating on pure confidence now.",
  "Power level: dominant. Awareness: gone.",
  "Everything is fine. Permanently, in your mind.",
  "You're acting like charging is a myth.",
  "Battery says 85%. Ego says eternal.",
  "You've unlocked 'I don't even look at battery'.",
  "Too much power to be responsible.",
  "You feel invincible. The battery agrees... for now.",
  "This is where logic officially retires.",
  "Battery is strong. Reality is ignored.",
  "You've got power and zero caution.",
  "90% and you think you've won.",
  "You're one step away from absolute arrogance.",
  "Battery is almost full. Confidence already is.",
  "This is elite comfort with no consequences... yet.",
  "Estimated time remaining: Forever.",
  "Battery health: flawless.",
  "System status: unstoppable.",
  "No action required. Not now, not ever."
];

const fullBatteryMessages = [
  "Battery is high. You've entered 'nothing can hurt me'.",
  "You're operating on pure confidence now.",
  "Power level: dominant. Awareness: gone.",
  "Everything is fine. Permanently, in your mind.",
  "You're acting like charging is a myth.",
  "Battery says 85%. Ego says eternal.",
  "You've locked 'I don't even look at battery'.",
  "Too much power to be responsible.",
  "You feel invincible. The battery agrees... for now.",
  "This is where logic officially retires.",
  "Battery is strong. Reality is ignored.",
  "You've got power and zero caution.",
  "9% and you think you've won.",
  "You're one step away from absolute arrogance.",
  "Battery is almost full. Confidence already is.",
  "This is elite comfort with no consequences... yet.",
  "Estimated time remaining: Forever.",
  "Battery health: flawless.",
  "System status: unstoppable.",
  "No action required. Not now, not ever."
];

const messages = [
  {
    min: 100,
    text: "Charge your system immediately or your system become dead. Yes, even at 100%. Prevention is better than electricity."
  },
  {
    min: 90,
    text: "Battery is almost too powerful. The laptop may start judging other devices."
  },
  {
    min: 75,
    text: "Strong battery energy detected. You can now open 2 Chrome tabs with confidence."
  },
  {
    min: 60,
    text: "Battery is healthy, but emotionally it has started preparing for low-power mode."
  },
  {
    min: 45,
    text: "This is the danger zone for people who say 'I will charge it later'."
  },
  {
    min: 30,
    text: "Battery is sending small warning emails to your charger."
  },
  {
    min: 15,
    text: "Critical drama detected. Save your work before your laptop becomes a black mirror."
  },
  {
    min: 0,
    text: "Emergency. Your battery is basically surviving on hopes, dreams, and one remaining electron."
  }
];

function getRandomMessage(list) {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

function getAnalysis(percent) {
  if (percent >= 0 && percent <= 10) {
    return getRandomMessage(lowBatteryMessages);
  }

  if (percent >= 11 && percent <= 20) {
    return getRandomMessage(riskyBatteryMessages);
  }

  if (percent >= 21 && percent <= 30) {
    return getRandomMessage(carelessBatteryMessages);
  }

  if (percent >= 31 && percent <= 40) {
    return getRandomMessage(overconfidentBatteryMessages);
  }

  if (percent >= 41 && percent <= 50) {
    return getRandomMessage(comfortableBatteryMessages);
  }

  if (percent >= 51 && percent <= 60) {
    return getRandomMessage(halfwayBatteryMessages);
  }

  if (percent >= 61 && percent <= 70) {
    return getRandomMessage(solidBatteryMessages);
  }

  if (percent >= 71 && percent <= 80) {
    return getRandomMessage(eliteBatteryMessages);
  }

  if (percent >= 81 && percent <= 90) {
    return getRandomMessage(unstoppableBatteryMessages);
  }

  if (percent >= 91 && percent <= 100) {
    return getRandomMessage(fullBatteryMessages);
  }

  return messages.find((message) => percent >= message.min).text;
}

function getBatteryColor(percent) {
  if (percent <= 20) return "#dc2626";
  if (percent <= 50) return "#f59e0b";
  if (percent <= 80) return "#22c55e";
  return "#16a34a";
}

function getColorName(percent) {
  if (percent <= 20) return "red because it is between 0% and 20%";
  if (percent <= 50) return "orange because it is between 21% and 50%";
  if (percent <= 80) return "green because it is between 51% and 80%";
  return "dark green because it is between 81% and 100%";
}

function updateBatteryVisual(fillElement, textElement, percent) {
  fillElement.style.width = `${percent}%`;
  fillElement.style.backgroundColor = getBatteryColor(percent);
  textElement.textContent = `${percent}%`;
}

function updateDisplay(percent, isCharging = false) {
  const roundedPercent = Math.round(percent);
  const chargingText = isCharging ? " and charging" : "";

  batteryText.textContent = `Battery: ${roundedPercent}%${chargingText}`;
  analysisText.textContent = `"${getAnalysis(roundedPercent)}"`;
  updateBatteryVisual(batteryFill, batteryInsideText, roundedPercent);
}

function updateDemoBattery() {
  const demoPercent = Number(demoBattery.value);

  demoStatus.textContent = `Demo Battery: ${demoPercent}%`;
  updateBatteryVisual(demoBatteryFill, demoBatteryInsideText, demoPercent);
  demoNote.textContent = `Width: ${demoPercent}%. Color: ${getColorName(demoPercent)}.`;
  demoAnalysis.textContent = `"${getAnalysis(demoPercent)}"`;
}

async function readBattery() {
  if (!("getBattery" in navigator)) {
    fallbackControls.hidden = false;
    updateDisplay(Number(manualBattery.value));
    return;
  }

  realBattery = await navigator.getBattery();
  updateDisplay(realBattery.level * 100, realBattery.charging);

  realBattery.addEventListener("levelchange", () => {
    updateDisplay(realBattery.level * 100, realBattery.charging);
  });

  realBattery.addEventListener("chargingchange", () => {
    updateDisplay(realBattery.level * 100, realBattery.charging);
  });
}

analyzeButton.addEventListener("click", () => {
  if (realBattery) {
    updateDisplay(realBattery.level * 100, realBattery.charging);
  } else {
    updateDisplay(Number(manualBattery.value));
  }
});

manualBattery.addEventListener("input", () => {
  updateDisplay(Number(manualBattery.value));
});

demoBattery.addEventListener("input", updateDemoBattery);

updateDemoBattery();
readBattery();
