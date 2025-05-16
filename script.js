const progressRing = document.querySelector('.progress-ring');
const currentAmountEl = document.getElementById('currentAmount');
const dailyGoalEl = document.getElementById('dailyGoal');
const waterBtns = document.querySelectorAll('.water-btn');
const customAmountEl = document.getElementById('customAmount');
const addCustomBtn = document.getElementById('addCustom');
const waterLogEl = document.getElementById('waterLog');
const resetDayBtn = document.getElementById('resetDay');

let dailyGoal = Number(localStorage.getItem('dailyGoal')) || 2000;
let currentAmount = Number(localStorage.getItem('currentAmount')) || 0;
let waterLog = JSON.parse(localStorage.getItem('waterLog')) || [];

const radius = 54;
const circumference = 2 * Math.PI * radius;
progressRing.style.strokeDasharray = `${circumference} ${circumference}`;

function setProgress(amount, goal) {
  const percent = Math.min(amount / goal, 1);
  const offset = circumference - percent * circumference;
  progressRing.style.strokeDashoffset = offset;
  currentAmountEl.textContent = amount;
  dailyGoalEl.value = goal;
}

function addWater(amount) {
  currentAmount += amount;
  waterLog.push({ amount, time: new Date().toLocaleTimeString() });
  saveData();
  render();
}

function saveData() {
  localStorage.setItem('currentAmount', currentAmount);
  localStorage.setItem('dailyGoal', dailyGoal);
  localStorage.setItem('waterLog', JSON.stringify(waterLog));
}

function render() {
  setProgress(currentAmount, dailyGoal);
  waterLogEl.innerHTML = '';
  waterLog.slice().reverse().forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.amount}ml at ${entry.time}`;
    waterLogEl.appendChild(li);
  });
}

waterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const amount = Number(btn.dataset.amount);
    addWater(amount);
  });
});

addCustomBtn.addEventListener('click', () => {
  const amount = Number(customAmountEl.value);
  if (amount > 0) {
    addWater(amount);
    customAmountEl.value = '';
  }
});

dailyGoalEl.addEventListener('change', () => {
  dailyGoal = Number(dailyGoalEl.value);
  saveData();
  render();
});

resetDayBtn.addEventListener('click', () => {
  currentAmount = 0;
  waterLog = [];
  saveData();
  render();
});

// Initial render
render();
// ... your existing code ...

function checkGoalReached() {
  if (currentAmount >= dailyGoal) {
    alert('🎉 Congratulations! You reached your daily water goal!');
  }
}

function addWater(amount) {
  currentAmount += amount;
  waterLog.push({ amount, time: new Date().toLocaleTimeString() });
  saveData();
  render();
  checkGoalReached();
}

// ... rest of your code ...

// Initial render
render();

// Periodic reminder every hour
setInterval(() => {
  alert('💧 Time to drink some water!');
}, 60 * 60 * 1000);
