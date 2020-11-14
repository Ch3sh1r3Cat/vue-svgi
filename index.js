/**
 * A simple inline SVG component plugin for Vue.js
 *
 * @version 0.3.0
 * @author Charlie LEDUC <contact@graphique.io>
 * @license ISC
 * @requires 'vue'
 */

import { h } from 'vue';

function __getIcon(families, key, icon) {
  if (families[key]) {
    var family = families[key];
    var values = family[icon];
    if (values != null && values.length === 3) {
      var paths = values[2].split('|');
      return {
        width: values[0],
        height: values[1],
        paths: paths
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
  install: function install(app, options) {
    app.provide('icons', options);

    app.component('icon', {
      inject: ['icons'],
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
      render: function render() {
        var icon = __getIcon(this.icons, this.family, this.name);
        var paths = [];
        for (var i = 0; i < icon.paths.length; i++) {
          var path = icon.paths[i];
          paths.push(h('path', {
            class: ['path', 'path-' + i].join(' '),
            d: typeof path === 'string' ? path.trim() : '',
            fill: 'currentColor'
          }));
        }
        var classList = ['svg-inline', this.family, this.family + '-' + this.name];
        if (this.classes && this.classes.length) {
          this.classes.forEach(function (c) {
            classList.push(c);
          });
        }
        return h('svg', {
          'aria-hidden': 'true',
          class: classList.join(' '),
          'data-name': this.name,
          role: 'img',
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 ' + icon.width + ' ' + icon.height
        }, paths);
      }
    });
  }
};
