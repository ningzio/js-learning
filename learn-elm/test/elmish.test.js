const test = require("tape"); // https://github.com/dwyl/learn-tape
const fs = require("fs"); // to read html files (see below)
const path = require("path"); // so we can open files cross-platform
const html = fs.readFileSync(path.resolve(__dirname, "./index.html")); // sample HTML file to initialise JSDOM.
require("jsdom-global")(html); // https://github.com/rstacruz/jsdom-global
const elmish = require("../lib/elmish.js"); // functions to test
const { view, update } = require("./counter.js");
const id = "test-app"; // all tests use 'test-app' as root element

test('empty("root") removes DOM elements from container', function (t) {
  // setup the test div:
  const text = "Hello World!";
  const root = document.getElementById(id);
  const div = document.createElement("div");
  div.id = "mydiv";
  const txt = document.createTextNode(text);
  div.appendChild(txt);
  root.appendChild(div);
  // check text of the div:
  const actual = document.getElementById("mydiv").textContent;
  t.equal(actual, text, "Contents of mydiv is: " + actual + " == " + text);
  t.equal(root.childElementCount, 1, "Root element " + id + " has 1 child el");
  // empty the root DOM node:
  elmish.empty(root); // <-- exercise the `empty` function!
  t.equal(root.childElementCount, 0, "After empty(root) has 0 child elements!");
  t.end();
});

test("elmish.mount app expect state to be Zero", function (t) {
  const root = document.getElementById(id);
  elmish.mount(7, update, view, id);
  const actual = document.getElementById(id).textContent;
  const actual_stripped = parseInt(
    actual.replace("+", "").replace("-Reset", ""),
    10
  );
  const expected = 7;
  t.equal(expected, actual_stripped, "Inital state set to 7.");
  // reset to zero:
  const btn = root.getElementsByClassName("reset")[0]; // click reset button
  btn.click(); // Click the Reset button!
  const state = parseInt(
    root.getElementsByClassName("count")[0].textContent,
    10
  );
  t.equal(state, 0, "State is 0 (Zero) after reset."); // state reset to 0!
  elmish.empty(root); // clean up after tests
  t.end();
});

test("elmish.add_attributes applies class HTML attribute to a node", (t) => {
  const root = document.getElementById(id);
  let div = document.createElement("div");
  div.id = "divid";
  div = elmish.add_attributes(["class=apptastic"], div);
  root.appendChild(div);

  const nodes = document.getElementsByClassName("apptastic");
  t.equal(nodes.length, 1, "<div> has 'apptastic' class applied");
  t.end();
});

test("elmish.add_attributes set placeholder on <input> element", function (t) {
  const root = document.getElementById(id);
  let input = document.createElement("input");
  input.id = "new-todo";
  input = elmish.add_attributes(["placeholder=What needs to be done?"], input);
  root.appendChild(input);
  const placeholder = document
    .getElementById("new-todo")
    .getAttribute("placeholder");
  t.equal(placeholder, "What needs to be done?", "paceholder set on <input>");
  t.end();
});

test("test elmish.add_attributes attrlist null (no effect)", function (t) {
  const root = document.getElementById(id);
  let div = document.createElement("div");
  div.id = "divid";
  // "Clone" the div DOM node before invoking elmish.attributes to compare
  const clone = div.cloneNode(true);
  div = elmish.add_attributes(null, div); // should not "explode"
  t.deepEqual(div, clone, "<div> has not been altered");
  t.end();
});

test('elmish.add_attributes adds "autofocus" attribute', function (t) {
  document
    .getElementById(id)
    .appendChild(
      elmish.add_attributes(
        ["class=new-todo", "autofocus", "id=new"],
        document.createElement("input")
      )
    );
  // document.activeElement via: https://stackoverflow.com/a/17614883/1148249
  // t.deepEqual(document.getElementById('new'), document.activeElement,
  //   '<input autofocus> is in "focus"');

  // This assertion is commented because of a broking change in JSDOM see:
  // https://github.com/dwyl/javascript-todo-list-tutorial/issues/29

  t.end();
});

test("elmish.add_attributes set data-id on <li> element", function (t) {
  const root = document.getElementById(id);
  let li = document.createElement("li");
  li.id = "task1";
  li = elmish.add_attributes(["data-id=123"], li);
  root.appendChild(li);
  const data_id = document.getElementById("task1").getAttribute("data-id");
  t.equal(data_id, "123", "data-id successfully added to <li> element");
  t.end();
});

test('elmish.add_attributes set "for" attribute <label> element', function (t) {
  const root = document.getElementById(id);
  let li = document.createElement("li");
  li.id = "toggle";
  li = elmish.add_attributes(["for=toggle-all"], li);
  root.appendChild(li);
  const label_for = document.getElementById("toggle").getAttribute("for");
  t.equal(label_for, "toggle-all", '<label for="toggle-all">');
  t.end();
});

test('elmish.add_attributes type="checkbox" on <input> element', function (t) {
  const root = document.getElementById(id);
  let input = document.createElement("input");
  input = elmish.add_attributes(["type=checkbox", "id=toggle-all"], input);
  root.appendChild(input);
  const type_atrr = document.getElementById("toggle-all").getAttribute("type");
  t.equal(type_atrr, "checkbox", '<input id="toggle-all" type="checkbox">');
  t.end();
});

test('elmish.add_attributes apply style="display: block;"', function (t) {
  const root = document.getElementById(id);
  elmish.empty(root);
  let sec = document.createElement("section");
  root.appendChild(
    elmish.add_attributes(["id=main", "style=display: block;"], sec)
  );
  const style = window.getComputedStyle(document.getElementById("main"));
  t.equal(style._values.display, "block", 'style="display: block;" applied!');
  t.end();
});

test('elmish.add_attributes checked=true on "done" item', function (t) {
  const root = document.getElementById(id);
  elmish.empty(root);
  let input = document.createElement("input");
  input = elmish.add_attributes(
    ["type=checkbox", "id=item1", "checked=true"],
    input
  );
  root.appendChild(input);
  const checked = document.getElementById("item1").checked;
  t.equal(checked, true, '<input type="checkbox" checked=true>');
  let input2;
  t.end();
});

test('elmish.add_attributes <a href="#/active">Active</a>', function (t) {
  const root = document.getElementById(id);
  elmish.empty(root);
  root.appendChild(
    elmish.add_attributes(
      ["href=#/active", "class=selected", "id=active"],
      document.createElement("a")
    )
  );
  // note: "about:blank" is the JSDOM default "window.location.href"
  console.log("JSDOM window.location.href:", window.location.href);
  // so when an href is set *relative* to this it becomes "about:blank#/my-link"
  // so we *remove* it before the assertion below, but it works fine in browser!
  const href = document
    .getElementById("active")
    .href.replace("about:blank", "");
  t.equal(href, "#/active", 'href="#/active" applied to "active" link');
  t.end();
});
