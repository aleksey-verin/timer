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
    editTitleAndTime: document.querySelector('.button-edit'),
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

export default UI_ELEMENTS
