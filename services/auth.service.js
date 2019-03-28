const isEmail = require("isemail");
const Runner = require('../models/runner.model');

module.exports = {
  checkForInputs,
  validateEmail,
  passwordsMatch,
  passwordContainsCapLowNum,
  currentRole,
};

function checkForInputs(firstname, lastname, email, password, password2) {
  let inputsArray = [firstname, lastname, email, password, password2];
  let hasInputs = true;

  for (let value of inputsArray) {
    if (value === "") {
      hasInputs = false;
    }
  }

  return hasInputs;
}

function validateEmail(email) {
  return isEmail.validate(email);
}

function passwordsMatch(password1, password2) {
  return password1 === password2;
}

function passwordContainsCapLowNum(password) {
  return (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password));
}

function currentRole() {

}