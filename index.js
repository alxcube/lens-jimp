/* Copyright 2020 Alexander Alexandrov (alxcube) <alxcube@gmail.com>

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

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