/**
 * A simple inline SVG component plugin for Vue.js
 *
 * @version 0.3.0
 * @author Charlie LEDUC <contact@graphique.io>
 * @license ISC
 * @requires 'vue'
 */

var __families = {};

function __getIcon(family, key) {
  var family = __families[family];
  if (family !== null && family !== undefined) {
    var values = family[key];
    if (values !== null && values !== undefined && values.length === 3) {
      var paths = values[2].split('|');
      return {
        width: values[0] || 0,
        height: values[1] || 0,
        paths: paths || []
      };
    }
  }
  return {
    width: 0,
    height: 0,
    paths: []
  };
}

export default {
  install: function install(Vue, options) {
    Vue.Icon = {
      load: function load(name, json) {
        __families[name] = json;
      }
    };

    Vue.component('icon', {
      props: {
        family: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        classes: {
          type: Array,
          default: function _default() {
            return [];
          }
        }
      },
      render: function render(createElement) {
        var icon = __getIcon(this.family, this.name);
        var paths = [];
        for (var i = 0; i < icon.paths.length; i++) {
          var path = icon.paths[i];
          paths.push(createElement('path', {
            attrs: {
              class: ['path', 'path-' + i].join(' '),
              d: typeof path === 'string' ? path.trim() : '',
              fill: 'currentColor'
            }
          }));
        }
        var classList = ['svg-inline', this.family, this.family + '-' + this.name];
        if (this.classes && this.classes.length) {
          this.classes.forEach(function (c) {
            classList.push(c);
          });
        }
        var data = {
          attrs: {
            'aria-hidden': 'true',
            class: classList.join(' '),
            'data-name': this.name,
            role: 'img',
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 ' + icon.width + ' ' + icon.height
          }
        };
        return createElement('svg', data, paths);
      }
    });
  }
};
