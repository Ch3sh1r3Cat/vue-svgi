# vue-svgi

A lightweight inline SVG component plugin for Vue.js

## Installation

```javascript
npm install vue-svgi --save
```

## How to use

Default use in your main.js Vue project

```javascript
import Icon from 'vue-svgi'

Vue.use(Icon)
```

Load a family name with a JSON file with SVG paths

```javascript
Vue.Icon.add('ico', require('./assets/icons/ico.json'))
```

The JSON value must be an array of three parameters: width (number), height (number), paths (string). You can separate multiple paths with '|'

```javascript
{
  "arrow-right": [
    256,
    512,
    "M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
  ],
  ...
}
```

You can use the 'icon' component in your HTML template

```javascript
...
<div>
  <icon family="ico" name="arrow-right"></icon>
</div>
...
```

The rendered SVG element, created with the class 'svg-inline' can then be easily customized with CSS.

```javascript
...
<div>
  <svg aria-hidden="true" class="svg-inline ico ico-arrow-right" data-name="arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path class="path path-0" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" fill="currentColor"></path></svg>
</div>
...
```

You can also pass an optional array of string as props to add to the default generated SVG node classes list.

```javascript
...
<div>
  <icon family="ico" name="arrow-right" :classes="['ico-small', 'icon-error']"></icon>
</div>
...
```

## License

[ISC](https://opensource.org/licenses/ISC)
