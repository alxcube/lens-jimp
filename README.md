# Lens-Jimp

[Jimp](https://www.npmjs.com/package/jimp) driver for
[@alxcube/lens](https://www.npmjs.com/package/@alxcube/lens) library.

## Installation

```
npm i @alxcube/lens-jimp
```

## Usage

```javascript
var Jimp = require('jimp');
var lens = require('@alxcube/lens');
var LensJimp = require('@alxcube/lens-jimp');

Jimp.read('source.png')
  .then(image => {
    const img   = new LensJimp(image);

    const args = [/* distortion arguments */];

    return lens.distort(
        img,
        lens.distorts.AFFINE, // distortion
        args
    );

  })
  .then(distorted => {
    return distorted.image.write('distorted.png'); // save result
  });
```

