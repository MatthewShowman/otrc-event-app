const assert = require("assert");
const authService = require("./auth.service");

it("Should return true if the string is a proper email format", (done) => {
  let isAnEmail = authService.validateEmail("test@uark.edu");
  assert.strictEqual(isAnEmail, true);
  done();
});

it("Should return true if the string is a proper email format", (done) => {
  let isAnEmail = authService.validateEmail("test.test@gmail.com");
  assert.strictEqual(isAnEmail, true);
  done();
});

it("Should return true if the string is a proper email format", (done) => {
  let isAnEmail = authService.validateEmail("test@ar.gov");
  assert.strictEqual(isAnEmail, true);
  done();
});

it("Should return false if the domain is incomplete", (done) => {
  let isAnEmail = authService.validateEmail("test@uark");
  assert.strictEqual(isAnEmail, false);
  done();
}); // This is a bug in the package; I've reported it.

it("Should return false if @ is missing", (done) => {
  let isAnEmail = authService.validateEmail("test.com");
  assert.strictEqual(isAnEmail, false);
  done();
});

it("Should return false if no domain", (done) => {
  let isAnEmail = authService.validateEmail("mshowman@");
  assert.strictEqual(isAnEmail, false);
  done();
});
