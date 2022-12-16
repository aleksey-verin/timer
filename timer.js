render()

setInterval(render, 1000)

function render() {
  let currentDate = new Date()

  let currentYour = currentDate.getUTCFullYear()
  let nextNewYear = currentYour + 1

  let dateWeNeed = Date.parse(`${nextNewYear}-01-01T00:00:00.000+03:00`)
  let deference = dateWeNeed - currentDate

  if (deference < 0) {
    document.querySelector('.main').textContent =
      'The event has already arrived!'
  } else {
    let days = Math.floor(deference / 1000 / 60 / 60 / 24)
    let daysString = String(days)
    if (daysString.length === 1) {
      daysString = '00' + daysString
    }
    if (daysString.length === 2) {
      daysString = '0' + daysString
    }
    document.querySelector('.days-block').firstElementChild.textContent =
      daysString[0]
    document.querySelector(
      '.days-block'
    ).firstElementChild.nextElementSibling.textContent = daysString[1]
    document.querySelector('.days-block').lastElementChild.textContent =
      daysString[2]

    let hours = Math.floor(
      (deference - days * 1000 * 60 * 60 * 24) / 1000 / 60 / 60
    )
    let hoursString = String(hours)
    if (hoursString.length < 2) {
      hoursString = '0' + hoursString
    }
    document.querySelector('.hours-block').firstElementChild.textContent =
      hoursString[0]
    document.querySelector('.hours-block').lastElementChild.textContent =
      hoursString[1]

    let minutes = Math.floor(
      (deference - days * 1000 * 60 * 60 * 24 - hours * 1000 * 60 * 60) /
        1000 /
        60
    )
    let minutesString = String(minutes)
    if (minutesString.length < 2) {
      minutesString = '0' + minutesString
    }
    document.querySelector('.minutes-block').firstElementChild.textContent =
      minutesString[0]
    document.querySelector('.minutes-block').lastElementChild.textContent =
      minutesString[1]

    let seconds = Math.floor(
      (deference -
        days * 1000 * 60 * 60 * 24 -
        hours * 1000 * 60 * 60 -
        minutes * 1000 * 60) /
        1000
    )
    let secondsString = String(seconds)
    if (secondsString.length < 2) {
      secondsString = '0' + secondsString
    }
    document.querySelector('.seconds-block').firstElementChild.textContent =
      secondsString[0]
    document.querySelector('.seconds-block').lastElementChild.textContent =
      secondsString[1]
    // document.querySelector('.hours').firstElementChild.textContent = hours
    // document.querySelector('.minutes').firstElementChild.textContent = minutes
    // document.querySelector('.seconds').firstElementChild.textContent = seconds
  }
}

// console.log(currentDate)
// console.log(dateWeNeed)
// console.log(deference)
// console.log(hours)
// console.log(minutes)
// console.log(seconds)

const setBackground = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16)
  document.body.style.backgroundColor = '#' + randomColor
  color.innerHTML = '#' + randomColor
}
document.querySelector('.button').addEventListener('click', setBackground)
// setBackground()
