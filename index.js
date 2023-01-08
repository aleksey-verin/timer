import UI_ELEMENTS from './ui-elements.js'
import CONTENT from './content.js'

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

let lang = JSON.parse(localStorage.getItem('lang')) //===>><<===
if (!lang) {
  lang = 'eng'
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

UI_ELEMENTS.MODAL_WINDOW.languageButtons.forEach((item) => {
  item.addEventListener('click', changeLanguage)
  if (item.dataset.lang === lang) {
    item.classList.add('active')
  }
})
function changeLanguage(e) {
  UI_ELEMENTS.MODAL_WINDOW.languageButtons.forEach((item) => {
    item.classList.remove('active')
  })
  e.target.classList.add('active')
  lang = e.target.dataset.lang
  localStorage.setItem('lang', JSON.stringify(lang)) // <<======>>
  renderForContent(lang)
}

function renderForContent(lang) {
  UI_ELEMENTS.TITLE.textContent = CONTENT.title[lang] ///-------- конфликт
  UI_ELEMENTS.SUBTITLES.days.textContent = CONTENT.subtitle.days[lang]
  UI_ELEMENTS.SUBTITLES.hours.textContent = CONTENT.subtitle.hours[lang]
  UI_ELEMENTS.SUBTITLES.minutes.textContent = CONTENT.subtitle.minutes[lang]
  UI_ELEMENTS.SUBTITLES.seconds.textContent = CONTENT.subtitle.seconds[lang]
  UI_ELEMENTS.BUTTONS.buttonColor.textContent = CONTENT.buttons.color[lang]
  UI_ELEMENTS.BUTTONS.buttonGradient.textContent =
    CONTENT.buttons.gradient[lang]
  UI_ELEMENTS.BUTTONS.buttonBlack.textContent = CONTENT.buttons.black[lang]
  UI_ELEMENTS.BUTTONS.buttonEdit.textContent = CONTENT.buttons.edit[lang]

  UI_ELEMENTS.MODAL_WINDOW.label.textContent = CONTENT.modalWindow.label[lang]
  UI_ELEMENTS.MODAL_WINDOW.inputForTitle.value = CONTENT.modalWindow.input[lang] /// -------
  UI_ELEMENTS.MODAL_WINDOW.makeChangesButton.textContent =
    CONTENT.modalWindow.buttonEdit[lang]
  UI_ELEMENTS.MODAL_WINDOW.resetButton.textContent =
    CONTENT.modalWindow.buttonReset[lang]

  if (lang === 'rus' || lang === 'esp') {
    UI_ELEMENTS.BUTTONS.allButtons.forEach((item) => item.classList.add('min'))
    UI_ELEMENTS.MODAL_WINDOW.makeChangesButton.classList.add('min')
  } else {
    UI_ELEMENTS.BUTTONS.allButtons.forEach((item) =>
      item.classList.remove('min')
    )
    UI_ELEMENTS.MODAL_WINDOW.makeChangesButton.classList.remove('min')
  }
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

UI_ELEMENTS.BUTTONS.buttonEdit.addEventListener('click', showModalWindowForEdit)

function showModalWindowForEdit() {
  UI_ELEMENTS.MODAL_WINDOW.container.classList.add('active')
  UI_ELEMENTS.MODAL_WINDOW.container.addEventListener(
    'click',
    closeModalWindowByClickOutside
  )
}
function closeModalWindowByClickOutside() {
  if (event.target.classList.contains('container-edit')) {
    UI_ELEMENTS.MODAL_WINDOW.container.classList.remove('active')
  }
}

UI_ELEMENTS.MODAL_WINDOW.form.addEventListener('submit', makeChanges)

function makeChanges(event) {
  event.preventDefault()

  dataForUI.title = event.target[0].value
  dataForUI.date = event.target[1].value
  dataForUI.time = event.target[2].value

  UI_ELEMENTS.TITLE.textContent = dataForUI.title
  UI_ELEMENTS.MODAL_WINDOW.container.classList.remove('active')

  localStorage.setItem('dataForUI', JSON.stringify(dataForUI)) // <<======>>
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

render()
renderForContent(lang)
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
