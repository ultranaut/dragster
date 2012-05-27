(function (undefined) {

  var effect, data,
      global = this,
      _ = global._,
      Dragster = {};

  _makeLoad = function (el, options) {
    var defaults = {
      start: {
        handler: function (e) {},
        effectAllowed: 'copy',
        setData: {
          format: 'Text',
          data: null
        }
      },
      end: {
        handler: function (e) {}
      }
    };
    options = _.extend(defaults, options);

    effect  = options.start.effectAllowed;
    data    = options.start.setData;

    el.addEventListener('dragstart', options.start.handler, false);
    el.addEventListener('dragstart', function (e) {
      e.dataTransfer.effectAllowed = effect;
      e.dataTransfer.setData(data.format, data.data);
    }, false);

    el.addEventListener('dragend', options.end.handler, false);

    el.setAttribute('draggable', true);
  };

  _makeTarget = function (el, options) {
    var defaults = {
      over:  { handler: function (e) { e.preventDefault();} },
      enter: { handler: function (e) { e.preventDefault();} },
      leave: { handler: function (e) {} },
      drop:  { handler: function (e) { console.debug(this) } },
    }
    options = _.extend(defaults, options);

		el.addEventListener('dragover',  options.over.handler, false);
		el.addEventListener('dragover',  function (e) {
		  e.preventDefault();
    }, false);
		el.addEventListener('dragenter', options.enter.handler, false);
		el.addEventListener('dragenter',  function (e) {
		  e.preventDefault();
    }, false);
		el.addEventListener('dragleave', options.leave.handler, false);
		el.addEventListener('drop',      options.drop.handler, false);
  };

  global.Dragster = {
    makeLoad: _makeLoad,
    makeTarget: _makeTarget
  };
})();
