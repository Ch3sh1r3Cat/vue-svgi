/**
 * @license
 * Copyright (c) 2018 Charles-André LEDUC. All rights reserved.
 */

const Icon = {
  install(Vue, options) {
    var families = {}

    Vue.component('icon', {
      render: function(createElement) {
        var values = this.values()
        var paths = []
        if (values.paths != null) {
          if (values.paths.length > 0) {
            for (var index in values.paths) {
              var path = values.paths[index]
              if (typeof path === 'string') {
                paths.push(
                  createElement('path', {
                    attrs: {
                      class: 'path path-' + index,
                      d: path.trim(),
                      fill: 'currentColor'
                    }
                  })
                )
              }
            }
          }
        }
        var classes = [this.family, this.family + '-' + this.name]
        if (this.append != null) {
          classes.push(this.append)
        }
        var data = {
          attrs: {
            'aria-hidden': 'true',
            class: 'svg-inline ' + classes.join(' '),
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

export default Icon
