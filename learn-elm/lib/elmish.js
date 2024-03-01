/**
 * `empty` deletes all the DOM elements from within a specific "root" element.
 * it is used to erase the DOM before re-rendering the app.
 * This is the *fastest* way according to: stackoverflow.com/a/3955238/1148249
 * @param  {Object} node the exact ("parent") DOM node you want to empty
 * @example
 * // returns true (once the 'app' node is emptied)
 * empty(document.getElementById('app'));
 */
function empty(node) {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
}

/**
 * `mount` mounts the app in the "root" DOM Element.
 * @param  {Object} model store of the application's state.
 * @param  {Function} update how the application state is updated ("controller")
 * @param  {Function} view function that renders HTML/DOM elements with model.
 * @param  {String} root_element_id root DOM element in which the app is mounted
 */
function mount(model, update, view, root_element_id) {
  var root = document.getElementById(root_element_id); // root DOM element
  function signal(action) {
    // signal function takes action
    return function callback() {
      // and returns callback
      var updatedModel = update(action, model); // update model for the action
      empty(root); // clear root el before rerender
      root.appendChild(view(updatedModel, signal)); // subsequent re-rendering
    };
  }
  root.appendChild(view(model, signal)); // render initial model (once)
}

/**
 * add_attributes applies the desired attributes to the desired node.
 * Note: this function is "impure" because it "mutates" the node.
 * however it is idempotent; the "side effect" is only applied once
 * and no other nodes in the DOM are "affected" (undesirably).
 * @param {Array.<String>} attr_list list of attributes to be applied to the node
 * @param {Object} node DOM node upon which attribute(s) should be applied
 * @example
 * // returns node with attributes applied
 * div = add_attributes(["class=item", "id=mydiv", "active=true"], div);
 */
function add_attributes(attr_list, node) {
  if (attr_list && Array.isArray(attr_list) && attr_list.length > 0) {
    attr_list.forEach(function (attr) {
      var a = attr.split("=");

      switch (a[0]) {
        case "autofocus":
          node.autofocus = "autofocus";
          node.focus();
          setTimeout(function () {
            // wait till DOM has rendered then focus()
            node.focus();
          }, 200);
          break;
        default:
          node.setAttribute(a[0], a[1]);
      }
    });
  }
  return node;
}

/* module.exports is needed to run the functions using Node.js for testing! */
/* istanbul ignore next */
if (module !== undefined && module.exports) {
  module.exports = {
    empty: empty, // export the `empty` function so we can test it.
    mount: mount,
    add_attributes: add_attributes,
  };
} else {
  init(document);
}
