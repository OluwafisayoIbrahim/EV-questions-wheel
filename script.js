const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const popup = document.getElementById("popup");
const questionText = document.getElementById("question");
const closeButton = document.getElementById("close");
const spinButton = document.getElementById("spin");

const segments = 15;
const colors = ["#FF5733", "#33FF57", "#5733FF", "#FF33A1", "#33FFF6", "#FFAD33", "#FF3333", "#9D33FF", "#33FF9D", "#FF8833", "#FFF733", "#33FF33", "#3357FF", "#FF3357", "#33FFAD"];
const radius = canvas.width / 2;
let spinning = false;
let rotation = 0;
let finalSegment = null;

const questions = {
    1: "Question 1: What is your favorite color?",
    2: "Question 2: What is your dream job?",
    3: "Question 3: If you could travel anywhere, where would it be?",
    4: "Question 4: What is your favorite movie?",
    5: "Question 5: What is the best advice you've ever received?",
    6: "Question 6: What superpower would you like to have?",
    7: "Question 7: What is your proudest achievement?",
    8: "Question 8: Who inspires you the most?",
    9: "Question 9: What is your favorite book?",
    10: "Question 10: What is your biggest fear?",
    11: "Question 11: What is your favorite hobby?",
    12: "Question 12: What is your favorite food?",
    13: "Question 13: What motivates you the most?",
    14: "Question 14: What is your biggest dream?",
    15: "Question 15: If you won the lottery, what would you do first?"
};

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
        ctx.fillStyle = colors[i];
        ctx.fill();

        
        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(((startAngle + endAngle) / 2 * Math.PI) / 180);
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

function spinWheel() {
    if (spinning) return;
    spinning = true;
    finalSegment = null;

    const spinDuration = 3000;
    const totalRotation = Math.random() * 360 + 1080;

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
            finalSegment = calculateSegment(rotation);
            showPopup(finalSegment);
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

drawWheel();
