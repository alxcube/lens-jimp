import Jimp from "jimp";
import type { ImageAdapter, ImageAdapterFactory } from "../../lens";
import { Adapter } from "./Adapter";

export class AdapterFactory implements ImageAdapterFactory<Jimp> {
  match(resource: unknown): boolean {
    return resource instanceof Jimp;
  }

  create(resource: Jimp): ImageAdapter<Jimp> {
    return new Adapter(resource);
  }
}
