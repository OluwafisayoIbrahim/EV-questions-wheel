const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const popup = document.getElementById("popup");
const questionText = document.getElementById("question");
const closeButton = document.getElementById("close");
const spinButton = document.getElementById("spin");

const etiOsaBtn = document.getElementById("etiOsaBtn");
const obalendeBtn = document.getElementById("obalendeBtn");
const lekkiBtn = document.getElementById("lekkiBtn");

const colors = [
  "#FF5733",
  "#33FF57",
  "#5733FF",
  "#FF33A1",
  "#33FFF6",
  "#FFAD33",
  "#FF3333",
  "#9D33FF",
  "#33FF9D",
  "#FF8833",
  "#FFF733",
  "#33FF33",
  "#3357FF",
  "#FF3357",
  "#33FFAD",
];
const radius = canvas.width / 2;
let spinning = false;
let rotation = 0;
let questions = {};
let segments = 0;

const etiOsaQuestions = {
  1: "What does 'EV' stand for?",
  2: "What’s the first thing that comes to mind when you hear ‘Electric Vehicle’?",
  3: "What is the difference between an EV and a traditional car?",
  4: "Which is cheaper to maintain: EVs or traditional cars?",
  5: "With petrol prices rising, would you consider an EV to save on fuel costs?",
  6: "What do you think is the biggest obstacle to EVs becoming popular in Nigeria?",
  7: "If an EV ride-hailing service was available to you, would you patronize it?",
  8: "What role can Nigerian youth play in shaping the future of EV transportation?",
  9: "Would you switch to an EV if charging stations were more accessible?",
};

const obalendeQuestions = {
  1: "What does 'EV' stand for?",
  2: "What is the difference between electric and petrol-powered cars?",
  3: "Do you know you can drive a car without fuel?",
  4: "Which type of car has more moving parts: EV or petrol car?",
  5: "What is cheaper to drive: an EV or a petrol car?",
  6: "What would you do with the money saved on fuel by owning an EV?",
  7: "Would you switch to an EV if charging stations were everywhere?",
  8: "Would you like it if your Mini-BUS didn't need fuel?",
};

const lekkiQuestions = {
  1: "What does 'EV' stand for?",
  2: "Are EVs better for our environment?",
  3: "Do EVs need oil changes?",
  4: "Which type of car has fewer moving parts?",
  5: "What is cheaper to drive from Ikeja to Victoria Island: an EV or petrol car?",
  6: "Have you ever seen an EV charging station in Lagos?",
  7: "Where do you think EV charging stations should be located?",
  8: "What’s your biggest concern about owning an EV in Nigeria?",
  9: "If you could switch to an EV, would you and why?",
  10: "What motivates you to explore EV ownership?",
  11: "Would you consider switching to an EV?",
};

questions = { ...etiOsaQuestions };
segments = Object.keys(questions).length;

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const segmentAngle = 360 / segments;

  for (let i = 0; i < segments; i++) {
    const startAngle = i * segmentAngle;
    const endAngle = (i + 1) * segmentAngle;

    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.arc(
      radius,
      radius,
      radius,
      (startAngle * Math.PI) / 180,
      (endAngle * Math.PI) / 180
    );
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();

    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate((((startAngle + endAngle) / 2) * Math.PI) / 180);
    ctx.textAlign = "right";
    ctx.fillStyle = "white";
    ctx.font = "bold 16px Arial";
    ctx.fillText(i + 1, radius - 10, 0);
    ctx.restore();
  }
}

function calculateSegment(rotation) {
  const segmentAngle = 360 / segments;
  const adjustedRotation = (360 - (rotation % 360)) % 360;
  const segmentIndex = Math.floor(adjustedRotation / segmentAngle);
  return (segmentIndex + 1) % segments || segments;
}

let lastSegment = null;

function spinWheel() {
  if (spinning) return;
  spinning = true;

  const spinDuration = 4000;
  const totalRotation = Math.random() * 720 + 1440; 
  let startTime = null;

  function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / spinDuration, 1);
    rotation = totalRotation * (1 - Math.pow(1 - progress, 4));

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(radius, radius);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-radius, -radius);
    drawWheel();
    ctx.restore();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      const segmentNumber = calculateSegment(rotation);
      
      
      if (segmentNumber === lastSegment) {
        spinWheel();
        return;
      }
      lastSegment = segmentNumber;
      showPopup(segmentNumber);
      spinning = false;
    }
  }

  requestAnimationFrame(animate);
}


function showPopup(segmentNumber) {
  questionText.textContent = questions[segmentNumber];
  popup.classList.remove("hidden");
}

closeButton.addEventListener("click", () => {
  popup.classList.add("hidden");
});

spinButton.addEventListener("click", spinWheel);

etiOsaBtn.addEventListener("click", () => {
  questions = { ...etiOsaQuestions };
  segments = Object.keys(questions).length;
  drawWheel();
});

obalendeBtn.addEventListener("click", () => {
  questions = { ...obalendeQuestions };
  segments = Object.keys(questions).length;
  drawWheel();
});

lekkiBtn.addEventListener("click", () => {
  questions = { ...lekkiQuestions };
  segments = Object.keys(questions).length;
  drawWheel();
});

drawWheel();
