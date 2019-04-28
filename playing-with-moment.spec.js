const assert = require("assert");
const authService = require("./auth.service");

it("Should return false if the password is less than eight chars", (done) => {
    let properPassword = authService.passwordContainsCapLowNum("AbCd123");
    assert.strictEqual(properPassword, false);
    done();
});

