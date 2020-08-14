/**
 * A simple inline SVG component plugin for Vue.js
 *
 * @version 0.3.0
 * @author Charlie LEDUC <contact@graphique.io>
 * @license ISC
 * @requires 'vue'
 */

export default {
  install(Vue, options) {
    var families = {}

    Vue.component('icon', {
      render: function(createElement) {
        var values = this.values()
        var paths = []
        for (var i = 0; i < values.paths.length; i++) {
          var path = values.paths[i]
          paths.push(
            createElement('path', {
              attrs: {
                class: ['path', 'path-' + i].join(' '),
                d: typeof path === 'string' ? path.trim() : '',
                fill: 'currentColor'
              }
            })
          )
        }
        var classes = ['svg-inline', this.family, this.family + '-' + this.name]
        if (this.append && this.append.length) {
          var classList = this.append.split(/\s/g)
          classList.forEach(cl => {
            classes.push(cl)
          })
        }
        var data = {
          attrs: {
            'aria-hidden': 'true',
            class: classes.join(' '),
            'data-name': this.name,
            role: 'img',
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 ' + values.width + ' ' + values.height
          }
        }
        return createElement('svg', data, paths)
      },
      props: {
        family: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        append: {
          type: String,
          default: ''
        }
      },
      methods: {
        values: function() {
          var family = families[this.family]
          if (family != null) {
            var values = family[this.name]
            if (values != null && values.length === 3) {
              var paths = values[2].split('|')
              return {
                width: values[0],
                height: values[1],
                paths: paths
              }
            }
          }
          return {
            width: 0,
            height: 0,
            paths: []
          }
        }
      }
    })

    Vue.Icon = {
      load: function(name, json) {
        families[name] = json
      }
    }
  }
}
