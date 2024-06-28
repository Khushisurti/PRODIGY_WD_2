let timer;
let startTime;
let lapCounter = 1;
let lapTimes = [];

function startStop() {
    if (!timer) {
        startTime = Date.now() - (lapCounter > 1 ? lapTimes[lapTimes.length - 1] : 0);
        timer = setInterval(updateDisplay, 10);
        document.getElementById('display').classList.add('running');
    } else {
        clearInterval(timer);
        timer = null;
        document.getElementById('display').classList.remove('running');
    }
}

function reset() {
    clearInterval(timer);
    timer = null;
    startTime = null; // Reset start time
    lapCounter = 1;
    lapTimes = [];
    document.getElementById('display').textContent = '00:00:00.000'; // Update display
    document.getElementById('display').classList.remove('running');
    document.getElementById('laps').innerHTML = ''; // Clear lap list
}

function recordLap() {
    if (timer) {
        const lapTime = Date.now() - startTime;
        lapTimes.push(lapTime);
        const lapDisplay = formatTime(lapTime);
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `Lap ${lapCounter}: ${lapDisplay}`;
        document.getElementById('laps').appendChild(li);
        lapCounter++;
    }
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    document.getElementById('display').textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const millisecondsFormatted = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${minutes}:${seconds}.${millisecondsFormatted}`;
}
