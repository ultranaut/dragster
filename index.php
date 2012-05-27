<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>Dragster</title>
  <link rel="stylesheet" href="css/dragster.css"/>
</head>
<body>
<div id="container">

  <div id="blank" class="target unit size2of3"></div>

  <div class="modules lastUnit size1of3">
    <div id="spot" class="unit size1of2">
      <article class="mod spot">
        Spot
      </article>
    </div>

    <div id="recipe" class="unit size1of2">
      <article class="mod recipe">
        Recipe
      </article>
    </div>
  </div>

</div>
<script src="js/libs/underscore.js"></script>
<script src="js/dragster.js"></script>
<script>
  (function (undefined) {
    var i, len, clone, tID,
        global = this,
        mID = 1,
        templates = {},
        modules = document.querySelectorAll('.modules .unit'),
        targets = document.querySelectorAll('.target');

    for (i = 0, len = modules.length; i < len; i++) {
      mod = modules[i];

      clone = mod.cloneNode(true); // make a "clean" copy of the module
      tID = clone.id;
      clone.id = null;
      templates[tID] = clone;

      Dragster.makeLoad(mod, {
        start: {
          handler: function () {
            this.style.opacity = '0.4';
          },
          effectAllowed: 'copy',
          setData: {
            format: 'Text',
            data: mod.id
          }
        },
        end: {
          handler: function () {
            this.style.opacity = '1.0';
          }
        }
      });
    }

    targets = document.querySelectorAll('.target');
    for (i = 0, len = targets.length; i < len; i++) {
      target = targets[i];

      Dragster.makeTarget(target, {
        enter: {
          handler: function (e) {
            this.classList.add('over');
          }
        },
        leave: {
          handler: function (e) {
            this.classList.remove('over');
          }
        },
        drop: {
          handler: function (e) {
            console.debug(this);
            var id = e.dataTransfer.getData('Text');
            var clone = templates[id].cloneNode(true);

            this.appendChild(clone);
            this.classList.remove('over');
          }
        }
      }, false);
    }

    global.templates = templates;
  })();
</script>
</body>
</html>
