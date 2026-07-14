import { Jimp } from "jimp";
import path from "path";
import fs from "fs";

async function processImage(filename) {
    const assetPath = path.join(process.cwd(), "src/assets", filename);
    const outName = filename.replace(/\.(jpg|jpeg|png)$/i, ".png");
    let outPath = path.join(process.cwd(), "src/assets", outName);
    
    // If it's already a png, save it to a temp file first so we don't overwrite while reading
    if (filename === outName) {
       outPath = path.join(process.cwd(), "src/assets", outName.replace(".png", "_temp.png"));
    }
    
    console.log(`Processing ${filename}...`);
    try {
        const image = await Jimp.read(assetPath);
        
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        
        // Remove white background
        image.scan(0, 0, width, height, function (x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];
            
            // If pixel is very close to white, make it transparent
            const brightness = (r + g + b) / 3;
            if (brightness > 240 && r > 240 && g > 240 && b > 240) {
                this.bitmap.data[idx + 3] = 0;
            } else if (brightness > 210 && r > 210 && g > 210 && b > 210) {
                const alpha = Math.floor(255 * ((240 - brightness) / 30));
                this.bitmap.data[idx + 3] = alpha;
            }
        });
        
        await image.write(outPath);
        console.log(`Saved transparent image to ${outPath}`);
        
        if (filename !== outName) {
            fs.unlinkSync(assetPath);
        } else {
            // Replace original png with processed one
            fs.unlinkSync(assetPath);
            fs.renameSync(outPath, assetPath);
        }
    } catch (e) {
        console.error(`Error processing ${filename}:`, e);
    }
}

async function main() {
    await processImage("flip 2.jpg");
    await processImage("ipod 2.jpg");
    await processImage("laptop 2.png");
}

main();
