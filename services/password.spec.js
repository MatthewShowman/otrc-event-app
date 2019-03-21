const assert = require("assert");
const authService = require("./auth.service");

it("Should return false if the password is less than eight chars", (done) => {
    let properPassword = authService.passwordContainsCapLowNum("AbCd123");
    assert.strictEqual(properPassword, false);
    done();
});

it("Should return false if the password is less than eight chars", (done) => {
    let properPassword = authService.passwordContainsCapLowNum("Ab&-123");
    assert.strictEqual(properPassword, false);
    done();
});

it("Should return false if the password has no numbers", (done) => {
    let properPassword = authService.passwordContainsCapLowNum("AbCdEfGh");
    assert.strictEqual(properPassword, false);
    done();
});

it("Should return false if the password has no uppercase", (done) => {
    let properPassword = authService.passwordContainsCapLowNum("abcd1234");
    assert.strictEqual(properPassword, false);
    done();
});

it("Should return false if the password has no lowercase", (done) => {
    let properPassword = authService.passwordContainsCapLowNum("ABCD1234");
    assert.strictEqual(properPassword, false);
    done();
});

it("Should return TRUE if the password has lowercase, uppercase and numbers", (done) => {
    let properPassword = authService.passwordContainsCapLowNum("AbCd1234");
    assert.strictEqual(properPassword, true);
    done();
});

it("Should return TRUE if the password has lowercase, uppercase, numbers, and SPECIAL chars", (done) => {
    let properPassword = authService.passwordContainsCapLowNum("AbCd&-1234");
    assert.strictEqual(properPassword, true);
    done();
});