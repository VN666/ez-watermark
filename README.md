# ez-watermark
A js watermark on any dom element. Written with ES6.Fortunately, with the help of [rollup](https://www.rollupjs.com/), it can be used in different ways, such as CommonJS and ES Module. Only 5KB in size, no other dependencies. Easy to use.

## Demo

[Click here](https://vn666.github.io/ez-watermark/)

## Browser Support

The following browsers have been tested and work:

![IE 11](https://vn666.github.io/static/icons/ie_48x48.png)|![Chrome](https://vn666.github.io/static/icons/chrome_48x48.png)|![Opera](https://vn666.github.io/static/icons/opera_48x48.png)|![Safari](https://vn666.github.io/static/icons/safari_48x48.png)|![Edage](https://vn666.github.io/static/icons/edge_48x48.png)|![Firefox](https://vn666.github.io/static/icons/firefox_48x48.png)|
--- | --- | --- | --- | --- | --- |
11 ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Installing

Using npm:

```bash
npm install --save ez-watermark
```

Using CDN:

> only support script tag method

```bash
<script src="https://unpkg.com/ez-watermark@1.0.0/dist/iife/ezwatermark.min.js"></script>
```

## Usage

### \<sciprt\> Tag


```javascript
<script src="https://unpkg.com/ez-watermark@1.0.0/dist/iife/ezwatermark.min.js"></script>
<script>
  var el = document.body;
  var watermark = new Watermark(el, {
    text: "ez-watermark,00:01:6C:06:A6:29,192.168.8.1,2022-10-22 00:00:00",
    family: "宋体",
    size: 16,
    angle: -30
  });
  watermark.add();
	
  el.addEventListener("resize", function () {
    watermark.redraw();
  }, false);
</script>

```

### ES MODULE

```javascript
import Watermark from "ez-watermark";

var watermark = new Watermark(el, options);

...
```

### CommonJS

```javascript
var Watermark = require("ez-watermark");

var watermark = new Watermark(el, options);

...
```

###

## Constructor Options
|Key|Description|Default|Type|
|---|---|---|---|
|text|text used as a watermark, multi lines separate with ","|ez-watermark|String|
|lineSpace|lines height when multi lines situation, units: px|8|Number|
|size|font size of text, units: px|16|Number|
|family|font family of text|Times New Roman|String|
|color|font color of watermark, use HEX format|#CFCFCF|String|
|angle|angle of watermark|-30|Number|
|offsetX|distance in horizontal direction, units: px|120|Number|
|offsetY|distance in vertical direction, units: px|120|Number|
|opacity|the transsparency of watermark, the value between 0 and 1|0.5|Number|
|zIndex|the zIndex value of watermark|10001|Number|

## API
add watermark on dom element after creating watermark object

```javascript
watermark.add();
```
remove watermark from dom element 

```javascript
watermark.remove();
```

Binding resize events on target dom element, and using resize() to resize watermark

```javascript
el.addEventListener("resize", function () {
  watermark.resize();
}, false);
```
## License

Copyright (c) 2022-present VN666

MIT (see [LICENSE](https://github.com/VN666/ez-watermark/blob/main/LICENSE))
