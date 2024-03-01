/* The code block below ONLY Applies to Node.js - This Demonstrates
   re-useability of JS code in both Back-end and Front-end! #isomorphic */
/* istanbul ignore if */

if (typeof module !== "undefined" && module.exports) {
  var QUnit = require("qunitjs"); // require QUnit node.js module
  // alias the QUnit.test method so we don't have to change all our tests
  var test = QUnit.test; // stores a copy of QUnit.test
  require("qunit-tap")(QUnit, console.log); // use console.log for test output
  var getChange = require("./change.js"); // load our getChange method
}

// This is what a simple unit test looks like:
test("getChange(1,1) should equal [] - an empty array", function (assert) {
  let result = getChange(1, 2);
  let expected = [1];
  assert.deepEqual(result, expected);
});

test("getChange(215, 300) should return [50, 20, 10, 5]", function (assert) {
  let result = getChange(215, 300);
  let expected = [50, 20, 10, 5];
  assert.deepEqual(result, expected);
});

test("getChange(486, 600) should equal [100, 10, 2, 2]", function (assert) {
  var result = getChange(486, 600);
  var expected = [100, 10, 2, 2];
  assert.deepEqual(result, expected);
});

test("getChange(12, 400) should return [200, 100, 50, 20, 10, 5, 2, 1]", function (assert) {
  var result = getChange(12, 400);
  var expected = [200, 100, 50, 20, 10, 5, 2, 1];
  assert.deepEqual(result, expected);
});

/* istanbul ignore next */
if (typeof module !== "undefined" && module.exports) {
  QUnit.load();
} // run the tests
