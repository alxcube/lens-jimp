import { resolve } from "path";
import Jimp from "jimp";
import { describe } from "node:test";
import { Adapter } from "./Adapter";
import { Viewport } from "@alxcube/lens";

describe("Adapter class", () => {
  let image: Jimp;
  let adapter: Adapter;
  beforeEach(() => {
    image = new Jimp(100, 100, "#ff0000");
    adapter = new Adapter(image);
  });

  describe("'width' and 'height' props", () => {
    it("should equal given Jimp instance width and height", () => {
      expect(adapter.width).toBe(image.getWidth());
      expect(adapter.height).toBe(image.getHeight());
    });
  });

  describe("createFromFile() static method", () => {
    it("should return promise of Adapter instance from file path", async () => {
      const adapter = await Adapter.createFromFile(
        resolve(__dirname, "../test/fixtures/rose.png")
      );
      expect(adapter).toBeInstanceOf(Adapter);
    });
  });

  describe("getImagePixelColor() method", () => {
    it("should return image pixel color", () => {
      expect(adapter.getImagePixelColor(0, 0)).toEqual([255, 0, 0, 255]);
    });
  });

  describe("setImagePixelColor() method", () => {
    it("should set image pixel color", () => {
      const color = [0, 255, 0, 255] as const;
      adapter.setImagePixelColor(0, 0, color);
      expect(adapter.getImagePixelColor(0, 0)).toEqual(color);
    });
  });

  describe("getAverageColor() method", () => {
    it("should return red color for fully red image", () => {
      expect(adapter.getAverageColor()).toEqual([255, 0, 0, 255]);
    });
  });

  describe("getResource() method", () => {
    it("should return promise of Jimp instance", async () => {
      const instance = await adapter.getResource();
      expect(instance).toBeInstanceOf(Jimp);
      expect(instance).toBe(image);
    });
  });

  describe("getBlank() method", () => {
    it("should return promise of Jimp instance with fully transparent image resource", async () => {
      const blank = await adapter.getBlank(new Viewport(0, 0, 29, 29));
      expect(blank.width).toBe(30);
      expect(blank.height).toBe(30);
      expect(blank.getPixelColor(0, 0)).toEqual([0, 0, 0, 0]);
    });
  });

  describe("scale() method", () => {
    it("should return promise of instance adapter scaled to given scale", async () => {
      const instance = await adapter.scale(0.5);
      const jimp = await instance.getResource();
      expect(jimp.getWidth()).toBe(50);
      expect(jimp.getHeight()).toBe(50);
    });
  });
});
