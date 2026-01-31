// DOM Elements - Easy to understand
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const ampmElement = document.getElementById('ampm');
const dateElement = document.getElementById('date');

// Button elements
const formatToggle = document.getElementById('format-toggle');
const themeToggle = document.getElementById('theme-toggle');
const colorChange = document.getElementById('color-change');

// State variables
let is24HourFormat = false;
let currentColorIndex = 0;
const colors = ['#667eea', '#764ba2', '#e74c3c', '#2ecc71', '#f39c12', '#8e44ad', '#3498db', '#0ef'];

// 1. BASIC CLOCK FUNCTION - Core of the project
function updateClock() 
{
    const now = new Date();
    
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    let ampm = 'AM';
    
    // Handle 12-hour format
    if (!is24HourFormat) 
    {
        if (hours >= 12) 
        {
            ampm = 'PM';
        }
        if (hours > 12)
        {
            hours = hours - 12;
        }
        if (hours === 0) {
            hours = 12;
        }
    }
    
    // Update time display (add leading zero if needed)
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    
    // Update AM/PM only in 12-hour format
    if (!is24HourFormat) 
    {
        ampmElement.textContent = ampm;
        ampmElement.style.display = 'block';
    } 
    else 
    {
        ampmElement.style.display = 'none';
    }
    
    // Update date
    updateDate(now);
    
    // Update day of week highlight
    updateDayHighlight(now.getDay());
}

// 2. DATE FUNCTION - Simple date display
function updateDate(date) 
{
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const dayNumber = date.getDate();
    const year = date.getFullYear();
    
    dateElement.textContent = `${dayName}, ${monthName} ${dayNumber}, ${year}`;
}

// 3. DAY HIGHLIGHT FUNCTION - Visual feedback
function updateDayHighlight(dayIndex) 
{
    const dayElements = document.querySelectorAll('.day-display span');
    
    // Remove active class from all days
    dayElements.forEach(day => day.classList.remove('active'));
    
    // Add active class to current day (0=Sunday, 1=Monday, etc.)
    dayElements[dayIndex].classList.add('active');
}

// 4. TOGGLE TIME FORMAT - Simple toggle
formatToggle.addEventListener('click', function() 
{
    is24HourFormat = !is24HourFormat;
    
    if (is24HourFormat) 
    {
        formatToggle.innerHTML = '<i class="fas fa-exchange-alt"></i> 24hr/12hr';
        this.style.background = '#2ecc71';
    } else 
    {
        formatToggle.innerHTML = '<i class="fas fa-exchange-alt"></i> 12hr/24hr';
        this.style.background = '#667eea';
    }
    
    updateClock(); // Update immediately
});

// 5. TOGGLE DARK MODE - Simple theme switch
themeToggle.addEventListener('click', function() 
{
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) 
    {
        this.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        this.style.background = '#f39c12';
    } 
    else
    {
        this.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        this.style.background = '#667eea';
    }
});

// 6. CHANGE COLOR FUNCTION - Fun visual effect
colorChange.addEventListener('click', function() {
    // Cycle through colors
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    const newColor = colors[currentColorIndex];
    
    // Update clock color
    const timeBoxes = document.querySelectorAll('.time-box');
    timeBoxes.forEach(box => {
        box.style.background = newColor;
        box.style.boxShadow = `0 5px 15px ${newColor}66`;
    });
    
    // Update button color
    this.style.background = newColor;
    formatToggle.style.background = newColor;
});

// 7. ALARM FUNCTION - Simple alarm feature
const alarmTimeInput = document.getElementById('alarm-time');
const setAlarmBtn = document.getElementById('set-alarm');
const clearAlarmBtn = document.getElementById('clear-alarm');
let alarmTime = null;

setAlarmBtn.addEventListener('click', function() {
    if (alarmTimeInput.value) {
        alarmTime = alarmTimeInput.value;
        alert(`Alarm set for ${alarmTime}`);
        setAlarmBtn.style.background = '#2ecc71';
    } else {
        alert('Please select a time for the alarm!');
    }
});

clearAlarmBtn.addEventListener('click', function() {
    alarmTime = null;
    alarmTimeInput.value = '';
    alert('Alarm cleared!');
    setAlarmBtn.style.background = '';
});

// 8. STOPWATCH FUNCTION - Simple timer
const stopwatchElement = document.getElementById('stopwatch');
const startStopwatchBtn = document.getElementById('start-stopwatch');
const resetStopwatchBtn = document.getElementById('reset-stopwatch');

let stopwatchSeconds = 0;
let stopwatchMinutes = 0;
let stopwatchHours = 0;
let stopwatchInterval = null;
let isStopwatchRunning = false;

startStopwatchBtn.addEventListener('click', function() {
    if (!isStopwatchRunning) {
        // Start stopwatch
        stopwatchInterval = setInterval(updateStopwatch, 1000);
        isStopwatchRunning = true;
        startStopwatchBtn.textContent = 'Pause';
        startStopwatchBtn.style.background = '#e74c3c';
    } else {
        // Pause stopwatch
        clearInterval(stopwatchInterval);
        isStopwatchRunning = false;
        startStopwatchBtn.textContent = 'Resume';
        startStopwatchBtn.style.background = '#f39c12';
    }
});

resetStopwatchBtn.addEventListener('click', function() {
    // Reset stopwatch
    clearInterval(stopwatchInterval);
    stopwatchSeconds = 0;
    stopwatchMinutes = 0;
    stopwatchHours = 0;
    isStopwatchRunning = false;
    stopwatchElement.textContent = '00:00:00';
    startStopwatchBtn.textContent = 'Start';
    startStopwatchBtn.style.background = '';
});

function updateStopwatch() {
    stopwatchSeconds++;
    
    if (stopwatchSeconds >= 60) {
        stopwatchSeconds = 0;
        stopwatchMinutes++;
    }
    
    if (stopwatchMinutes >= 60) {
        stopwatchMinutes = 0;
        stopwatchHours++;
    }
    
    // Update display
    stopwatchElement.textContent = 
        `${stopwatchHours.toString().padStart(2, '0')}:` +
        `${stopwatchMinutes.toString().padStart(2, '0')}:` +
        `${stopwatchSeconds.toString().padStart(2, '0')}`;
    
    // Check alarm (if set)
    checkAlarm();
}

// 9. CHECK ALARM FUNCTION
function checkAlarm() {
    if (!alarmTime) return;
    
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    if (currentTime === alarmTime) {
        alert('⏰ ALARM! WAKE UP! ⏰');
        // Play sound (optional - browser may block autoplay)
        try {
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
            audio.play();
        } catch (e) {
            console.log('Audio playback failed:', e);
        }
        
        // Reset alarm
        alarmTime = null;
        alarmTimeInput.value = '';
        setAlarmBtn.style.background = '';
    }
}


function init() {
    // Start the clock
    updateClock();
    setInterval(updateClock, 1000);
    
    // Initialize day highlight
    updateDayHighlight(new Date().getDay());
    
    // Update clock every second
    setInterval(checkAlarm, 1000);
    
    console.log('✅ Digital Clock Started!');
    console.log('🎯 Perfect for JavaScript beginners!');
    console.log('👉 Try clicking all the buttons!');
}


init();