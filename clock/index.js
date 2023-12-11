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

let seconds = 0
let running = false
let interval
timerButton.addEventListener("click", () => {
    console.log(running)

    if (running) {
        clearInterval(interval)
        seconds = 0
        timerButton.textContent = "Resume"
    }
    else {        
        interval = setInterval(() => {
            seconds += 100
            document.getElementById("time").textContent = formatTime(seconds)
        }, 100)
        running = true
        timerButton.textContent = "Stop"
    }
})

function formatTime(milliseconds) {
    const totalSeconds = milliseconds / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const ms = (milliseconds % 1000).toString().padStart(3, '0').substring(0, 2);
  
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms}`;
  }

clock()
setInterval(clock, 1000)
