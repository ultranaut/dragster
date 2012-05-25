var addEvent = (function () {
  if (document.addEventListener) {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.addEventListener(type, fn, false);
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  } else {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  }
})();

/**
 * drag source event handlers
 */
var handleDragStart = function (e) {
  e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be droppable
  e.dataTransfer.setData('Text', this.id); // required otherwise doesn't work
  this.style.opacity = '0.4';
};
var handleDragEnd = function (e) {
  this.style.opacity = '1.0';
};

/**
 * drag target event handlers
 */
var handleDragEnter = function (e) {
  if (e.preventDefault) { e.preventDefault(); }
  if (e.stopPropagation) e.stopPropagation();
  this.classList.add('over');
  return false;
};
var handleDragOver = function (e) {
  if (e.preventDefault) { e.preventDefault(); }
  e.dataTransfer.dropEffect = 'copy';
  return false;
};
var handleDragLeave = function (e) {
  this.classList.remove('over');
};
var handleDrop = function (e) {
  var id = e.dataTransfer.getData('Text');
  var clone = templates[id].cloneNode(true);

  this.appendChild(clone);
  this.classList.remove('over');
};


(function (global) {
  var i, len, clone, tID;
  var mID = 1;
  var templates = {};
  var modules = document.querySelectorAll('.modules .unit');
  var targets = document.querySelectorAll('.target');

  for (i = 0, len = modules.length; i < len; i = i + 1) {
    mod = modules[i];

    clone = mod.cloneNode(true); // make a "clean" copy of the module
    tID = clone.id;
    clone.id = null;
    templates[tID] = clone;

    mod.setAttribute('draggable', 'true');
    addEvent(mod, 'dragstart', handleDragStart);
    addEvent(mod, 'dragend', handleDragEnd);
  }
  for (i = 0, len = targets.length; i < len; i = i + 1) {
    target = targets[i];
    addEvent(target, 'dragover',  handleDragOver,  false);
    addEvent(target, 'dragenter', handleDragEnter, false);
    addEvent(target, 'dragleave', handleDragLeave, false);
    addEvent(target, 'drop',      handleDrop,      false);
  }

  global.templates = templates;
})(this);
