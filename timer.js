const UI_ELEMENTS = {
  BODY: document.body,
  TITLE: document.querySelector('.title'),
  DOTS: document.querySelectorAll('.dots-block'),
  DIGITS: {
    daysOne: document.querySelector('.days-one'),
    daysTwo: document.querySelector('.days-two'),
    daysThree: document.querySelector('.days-tree'),
    hoursOne: document.querySelector('.hours-one'),
    hoursTwo: document.querySelector('.hours-two'),
    MinutesOne: document.querySelector('.minutes-one'),
    MinutesTwo: document.querySelector('.minutes-two'),
    secondsOne: document.querySelector('.seconds-one'),
    secondsTwo: document.querySelector('.seconds-two'),
  },
  BUTTONS: {
    colorsButtons: document.querySelectorAll('.set-color-btn'),
    setTitleAndTime: document.querySelector('.button-edit'),
  },
  MODAL_WINDOW: {
    container: document.querySelector('.container-edit'),
    form: document.querySelector('.edit-form'),
    inputForTitle: document.querySelector('.edit-title'),
    inputForTime: document.querySelector('.edit-time'),
    inputForDate: document.querySelector('.edit-date'),
    makeChangesButton: document.querySelector('.make-changes-button'),
    resetButton: document.querySelector('.reset-button'),
    closeButton: document.querySelector('.close-button'),
  },
}

const defaultDataForUI = {
  title: 'Are you ready for the New Year?',
  time: '00:00',
  date: `${new Date().getFullYear() + 1}-01-01`,
}

let colors = JSON.parse(localStorage.getItem('colors')) //===>><<===
if (!colors) {
  colors = {
    color1: '#000',
    color2: '#000',
  }
}

let dataForUI = JSON.parse(localStorage.getItem('dataForUI')) //===>><<===
if (!dataForUI) {
  dataForUI = {}
  dataForUI.title = defaultDataForUI.title
  dataForUI.time = defaultDataForUI.time
  dataForUI.date = defaultDataForUI.date
  UI_ELEMENTS.TITLE.textContent = dataForUI.title
} else {
  UI_ELEMENTS.TITLE.textContent = dataForUI.title
  UI_ELEMENTS.MODAL_WINDOW.inputForTitle.value = dataForUI.title
  UI_ELEMENTS.MODAL_WINDOW.inputForTime.value = dataForUI.time
  UI_ELEMENTS.MODAL_WINDOW.inputForDate.value = dataForUI.date
}

UI_ELEMENTS.MODAL_WINDOW.resetButton.addEventListener(
  'click',
  resetTitleAndDate
)
function resetTitleAndDate() {
  event.preventDefault()
  dataForUI.title = defaultDataForUI.title
  dataForUI.time = defaultDataForUI.time
  dataForUI.date = defaultDataForUI.date
  localStorage.setItem('dataForUI', JSON.stringify(dataForUI)) // <<======>>

  UI_ELEMENTS.TITLE.textContent = defaultDataForUI.title
  UI_ELEMENTS.MODAL_WINDOW.inputForTitle.value = defaultDataForUI.title
  UI_ELEMENTS.MODAL_WINDOW.inputForTime.value = defaultDataForUI.time
  UI_ELEMENTS.MODAL_WINDOW.inputForDate.value = defaultDataForUI.date
  UI_ELEMENTS.MODAL_WINDOW.container.classList.remove('active')
}

UI_ELEMENTS.MODAL_WINDOW.closeButton.addEventListener('click', closeModalWindow)
function closeModalWindow() {
  UI_ELEMENTS.MODAL_WINDOW.container.classList.remove('active')
}

UI_ELEMENTS.BODY.style.background =
  'linear-gradient(45deg, ' + colors.color1 + ', ' + colors.color2 + ')'

UI_ELEMENTS.BUTTONS.colorsButtons.forEach((item) =>
  item.addEventListener('click', changeColor)
)

function changeColor() {
  if (this.classList.contains('button-color')) {
    colors.color1 = '#' + Math.random().toString(16).substr(-6)
    colors.color2 = colors.color1
  }
  if (this.classList.contains('button-gradient')) {
    colors.color1 = '#' + Math.random().toString(16).substr(-6)
    colors.color2 = '#' + Math.random().toString(16).substr(-6)
  }
  if (this.classList.contains('button-black')) {
    colors.color1 = '#000'
    colors.color2 = '#000'
  }
  UI_ELEMENTS.BODY.style.background =
    'linear-gradient(45deg, ' + colors.color1 + ', ' + colors.color2 + ')'
  localStorage.setItem('colors', JSON.stringify(colors)) // <<======>>
}

UI_ELEMENTS.BUTTONS.setTitleAndTime.addEventListener('click', showWindowForEdit)

function showWindowForEdit() {
  UI_ELEMENTS.MODAL_WINDOW.container.classList.add('active')
  UI_ELEMENTS.MODAL_WINDOW.container.addEventListener('click', closeWindow)
}
function closeWindow() {
  if (event.target.classList.contains('container-edit')) {
    UI_ELEMENTS.MODAL_WINDOW.container.classList.remove('active')
  }
}

UI_ELEMENTS.MODAL_WINDOW.form.addEventListener('submit', editAll)

function editAll(event) {
  event.preventDefault()

  dataForUI.title = event.target[0].value
  dataForUI.date = event.target[1].value
  dataForUI.time = event.target[2].value

  UI_ELEMENTS.TITLE.textContent = dataForUI.title
  UI_ELEMENTS.MODAL_WINDOW.container.classList.remove('active')

  localStorage.setItem('dataForUI', JSON.stringify(dataForUI)) // <<======>>
}

render()
setInterval(render, 1000)

function render() {
  const currentDate = new Date()
  const nextYear = currentDate.getUTCFullYear() + 1

  let dateWeNeed
  if (dataForUI) {
    dateWeNeed = Date.parse(`${dataForUI.date}T${dataForUI.time}:00.000+03:00`)
  } else {
    dateWeNeed = Date.parse(`${nextYear}-01-01T00:00:00.000+03:00`)
  }
  const deference = dateWeNeed - currentDate

  const time = {}

  getTime(deference, time)
  setTimeInUI(time)

  UI_ELEMENTS.DOTS.forEach((item) => item.classList.toggle('active'))
}

function getTime(deference, time) {
  if (deference > 0) {
    const days = Math.floor(deference / 1000 / 60 / 60 / 24)
    time.daysString = String(days)
    if (time.daysString.length === 1) {
      time.daysString = '00' + time.daysString
    }
    if (time.daysString.length === 2) {
      time.daysString = '0' + time.daysString
    }

    const hours = Math.floor(
      (deference - days * 1000 * 60 * 60 * 24) / 1000 / 60 / 60
    )
    time.hoursString = String(hours)
    if (time.hoursString.length < 2) {
      time.hoursString = '0' + time.hoursString
    }

    const minutes = Math.floor(
      (deference - days * 1000 * 60 * 60 * 24 - hours * 1000 * 60 * 60) /
        1000 /
        60
    )
    time.minutesString = String(minutes)
    if (time.minutesString.length < 2) {
      time.minutesString = '0' + time.minutesString
    }

    const seconds = Math.floor(
      (deference -
        days * 1000 * 60 * 60 * 24 -
        hours * 1000 * 60 * 60 -
        minutes * 1000 * 60) /
        1000
    )
    time.secondsString = String(seconds)
    if (time.secondsString.length < 2) {
      time.secondsString = '0' + time.secondsString
    }
    return time
  } else {
    time.daysString = '000'
    time.hoursString = '00'
    time.minutesString = '00'
    time.secondsString = '00'

    colors.color1 = '#' + Math.random().toString(16).substr(-6)
    colors.color2 = '#' + Math.random().toString(16).substr(-6)
    UI_ELEMENTS.BODY.style.background =
      'linear-gradient(45deg, ' + colors.color1 + ', ' + colors.color2 + ')'

    return time
  }
}

function setTimeInUI(time) {
  UI_ELEMENTS.DIGITS.daysOne.textContent = time.daysString[0]
  UI_ELEMENTS.DIGITS.daysTwo.textContent = time.daysString[1]
  UI_ELEMENTS.DIGITS.daysThree.textContent = time.daysString[2]

  UI_ELEMENTS.DIGITS.hoursOne.textContent = time.hoursString[0]
  UI_ELEMENTS.DIGITS.hoursTwo.textContent = time.hoursString[1]

  UI_ELEMENTS.DIGITS.MinutesOne.textContent = time.minutesString[0]
  UI_ELEMENTS.DIGITS.MinutesTwo.textContent = time.minutesString[1]

  UI_ELEMENTS.DIGITS.secondsOne.textContent = time.secondsString[0]
  UI_ELEMENTS.DIGITS.secondsTwo.textContent = time.secondsString[1]
}
