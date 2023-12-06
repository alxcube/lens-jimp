import Jimp from "jimp";
import { resolve } from "path";
import { distort } from "@alxcube/lens";
import { Adapter } from "../../src";

describe("Integration with Lens", () => {
  it("should distort image using Arc distortion", async () => {
    const jimp = await Jimp.read(resolve(__dirname, "../fixtures/rose.png"));
    const result = await distort(jimp, "Arc", [45]);
    expect(result.image).toBeInstanceOf(Adapter);
    const resultImage = await result.image.getResource();
    expect(resultImage).toBeInstanceOf(Jimp);
  });
});
