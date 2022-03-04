# Lens-Jimp

[Jimp](https://www.npmjs.com/package/jimp) driver for
[@alxcube/lens](https://www.npmjs.com/package/@alxcube/lens) library.

## Installation

```
npm i jimp @alxcube/lens @alxcube/lens-jimp
```

## Usage

```javascript
const {distort, Distortion} = require('@alxcube/lens');
const Jimp = require('jimp');
const {Adapter} = require('@alxcube/lens-jimp');

Jimp.read('source.png')
  .then(image => {
      return distort(new Adapter(image), Distortion.ARC, [90]);
  }).then(result => result.image.getResource())
      .then(jimp => {
        return jimp.write('distorted.png'); // save result
      });
```

Also, if you import from index.js, ImageAdapter factory is invoked, so you can omit explicit adapter instantiation:

```javascript
const {distort, Distortion} = require('@alxcube/lens');
const Jimp = require('jimp');
require('@alxcube/lens-jimp'); // Only import module for side effects

Jimp.read('source.png')
  .then(image => {
      return distort(image, Distortion.ARC, [90]);
  }).then(result => result.image.getResource())
      .then(jimp => {
        return jimp.write('distorted.png'); // save result
      });
```

