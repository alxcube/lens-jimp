var lens = require('@alxcube/lens');
var Jimp = require('jimp');

class LensJimp extends lens.image.AbstractImage {
  constructor(image) {
    super(image.bitmap.width, image.bitmap.height);
    this.image = image;
  }

  getImagePixelColor(x, y) {
    const {r, g, b, a}      = Jimp.intToRGBA(this.image.getPixelColor(x, y));
    return [r, g, b, a];
  }

  setImagePixelColor(x, y, color) {
    this.image.setPixelColor(
      Jimp.rgbaToInt(
        color[0],
        color[1],
        color[2],
        color[3]
      ),
      x, y
    );

    return this;
  }

  prepareBlank(width, height) {
    return new Promise(function (resolve, reject) {
      new Jimp(width, height, 0x0, function (err, image) {
        if (err) {
          reject(err);
        } else {
          resolve(new LensJimp(image));
        }
      });
    });
  }

  getAverageColor() {
    const px = this.image.clone();
    px.resize(1, 1);
    return Array.prototype.slice.call(px.bitmap.data);
  }

  resize(width, height) {
    var cloned = this.image.clone();
    cloned.resize(width, height);
    return new LensJimp(cloned);
  }
}

module.exports = LensJimp;