const timerButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button"); 
const playButton = document.getElementById("play-button")

let elapsedTime = 0;
let interval;
let startTime = 0;
let tags

function clock() {
    const date = new Date();

    const hour = date.getHours();
    const minutes = date.getMinutes();
    const second = date.getSeconds();

    
    setRotation(document.querySelector(".hour"), (hour + minutes / 60) * 30);
    setRotation(document.querySelector(".minute"), (minutes + second / 60) * 6);
    setRotation(document.querySelector(".second"), second * 6);

    document.querySelectorAll(".stopwatch-clock").forEach(x => x.textContent = `${hour}:${minutes}`)
}

function formatDate(data) {
    return data.map((x) => x.toString().padStart(2, "0"));
}

function setRotation(element, rotation) {
    element.style.setProperty("--rotation", `${rotation}deg`);
}

const startStopwatch = () => {
    startTime = new Date().getTime() - elapsedTime;
    interval = setInterval(() => {
        const currentTime = new Date().getTime();
        elapsedTime = currentTime - startTime;
        document.getElementById("time").textContent = formatTime(elapsedTime);
    }, 100);
    timerButton.textContent = "Stop";
};

const stopStopwatch = () => {
    clearInterval(interval);
    interval = undefined;
    elapsedTime = new Date().getTime() - startTime;
    timerButton.textContent = "Start";
};

const resetStopwatch = () => {
    stopStopwatch();
    elapsedTime = 0;
    document.getElementById("time").textContent = "00:00.00";
    document.getElementById("laps-container").innerHTML = ""
};

function formatTime(milliseconds) {
    const totalSeconds = milliseconds / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const ms = (milliseconds % 1000).toString().padStart(3, "0").substring(0, 2);

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms}`;
}

const audio_url = "new_tank.mp3"


const audio = new Audio(audio_url)
jsmediatags.read("http://127.0.0.1:5500/"+audio_url, {
  onSuccess: function({tags}) {
    console.log(tags)
    document.getElementById("audio-title").textContent = tags.title
    document.getElementById("audio-author").textContent = `${tags.artist} - ${tags.album}`
  },
  onError: function(error) {
    console.log(error);
  }
});

clock();
resetStopwatch();

timerButton.addEventListener("click", () => {
    resetButton.removeAttribute("disabled")
    if (!interval) {
        startStopwatch();
        resetButton.classList.remove("reset")
        resetButton.classList.add("lap")

        resetButton.textContent = "Lap"
    } else {
        stopStopwatch();
        resetButton.classList.replace("lap", "reset")
        resetButton.textContent = "Reset";        
    }
});

resetButton.addEventListener("click", () => {
    if(!interval) {
        resetStopwatch()
    } else {
        document.getElementById("laps-container").innerHTML += `<p>${formatTime(elapsedTime)}</p>`
    }
})

playButton.addEventListener("click", () => {
    
    if(audio.duration > 0 && !audio.paused) {
        playButton.textContent = "►"
        audio.pause()
    } else {
        audio.play()
        playButton.textContent = "⏸︎"
    }

})

setInterval(clock, 1000);
