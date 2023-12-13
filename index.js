const timerButton = document.getElementById("start-button")

function clock() {
    const date = new Date()

    const hour = date.getHours()
    const minutes = date.getMinutes()
    const second = date.getSeconds()

    setRotation(document.querySelector(".hour"), (hour + minutes / 60) * 30)
    setRotation(document.querySelector(".minute"), (minutes + second / 60) * 6)
    setRotation(document.querySelector(".second"), second * 6)
}

function formatDate(data) {
    return data.map(x => x.toString().padStart(2, "0"))
}

function setRotation(element, rotation) {
    element.style.setProperty("--rotation", `${rotation}deg`)
}

let elapsedTime = 0
let interval
let startTime = 0


const startStopwatch = () => {
    startTime = new Date().getTime() - elapsedTime
    interval = setInterval(() => {
        currentTime = new Date().getTime()
        elapsedTime = currentTime - startTime;
        document.getElementById("time").textContent = formatTime(elapsedTime)
    }, 100)
    timerButton.textContent = "Stop"
}

const stopStopwatch = () => {
    clearInterval(interval)
    interval = undefined
    elapsedTime = new Date().getTime() - startTime
    timerButton.textContent = "Start"
}

const resetStopwatch = () => {
    stopStopwatch()
    elapsedTime = 0
    document.getElementById("time").textContent = "00:00.00"
}


function formatTime(milliseconds) {
    const totalSeconds = milliseconds / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const ms = (milliseconds % 1000).toString().padStart(3, '0').substring(0, 2);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms}`;
}

clock()
resetStopwatch()

timerButton.addEventListener("click", () => {
    let resetButton = null
    console.log(elapsedTime, startTime, interval)
    if (!interval) {
        startStopwatch()
        resetButton && document.querySelector(".timer").removeChild(resetButton)
    }
    else {
        stopStopwatch()
        resetButton = document.createElement("button")
        resetButton.textContent = "reset"
        document.querySelector(".timer").appendChild(resetButton)
        resetButton.addEventListener("click", resetButton)
    }
})

setInterval(clock, 1000)