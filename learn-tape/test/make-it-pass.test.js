const test = require("tape");

function sum(a, b) {
  return a + b;
}

test("sum should return the addition of two numbers", (t) => {
  t.equal(sum(1, 2), 3);
  t.end();
});
