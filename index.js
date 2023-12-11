function clock() {
    const date = new Date()

    const hour = date.getHours()
    const minutes = date.getMinutes()
    const second = date.getSeconds()
    // const day = date.getDate()
    // const month = date.getMonth() + 1
    // const year = date.getFullYear()

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

clock()
setInterval(clock, 1000)