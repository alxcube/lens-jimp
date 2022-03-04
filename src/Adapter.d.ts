import { AbstractImageAdapter, ImageAdapter, Color } from "@alxcube/lens";
import * as Jimp from 'jimp';
/**
 * Lens image adapter for Jimp library
 */
export declare class Adapter extends AbstractImageAdapter<Adapter, Jimp> implements ImageAdapter<Adapter, Jimp> {
    /**
     * Image resource
     */
    protected image: Jimp;
    /**
     * Creates instance from image file path
     *
     * @param path Image file path
     */
    static createFromFile(path: string): Promise<Adapter>;
    /**
     * @param image Jimp image resource object
     */
    constructor(image: Jimp);
    /**
     * @inheritDoc
     */
    getImagePixelColor(x: number, y: number): Color;
    /**
     * @inheritDoc
     */
    setImagePixelColor(x: number, y: number, color: Color): any;
    /**
     * @inheritDoc
     */
    getAverageColor(): Color;
    /**
     * @inheritDoc
     */
    protected resize(width: number, height: number): Promise<Adapter>;
    /**
     * @inheritDoc
     */
    protected prepareBlank(width: number, height: number): Promise<Adapter>;
    /**
     * @inheritDoc
     */
    getResource(): Promise<Jimp>;
    /**
     * @inheritDoc
     */
    commit(): Promise<Adapter>;
}
