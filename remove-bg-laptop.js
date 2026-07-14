import { Jimp } from "jimp";
import path from "path";
import fs from "fs";

async function processImage(filename) {
    const assetPath = path.join(process.cwd(), "src/assets", filename);
    const outName = filename; // We overwrite the same png file
    let outPath = path.join(process.cwd(), "src/assets", outName.replace(".png", "_temp2.png"));
    
    console.log(`Processing ${filename}...`);
    try {
        const image = await Jimp.read(assetPath);
        
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        
        // Sample top-left pixel to find the background color
        const bgR = image.bitmap.data[0];
        const bgG = image.bitmap.data[1];
        const bgB = image.bitmap.data[2];
        
        console.log(`Background color detected: RGB(${bgR}, ${bgG}, ${bgB})`);
        
        // Remove background color
        image.scan(0, 0, width, height, function (x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];
            
            // Calculate distance from background color
            const dist = Math.sqrt(
                Math.pow(r - bgR, 2) + 
                Math.pow(g - bgG, 2) + 
                Math.pow(b - bgB, 2)
            );
            
            // If pixel is very close to background color, make it transparent
            if (dist < 10) {
                this.bitmap.data[idx + 3] = 0;
            } else if (dist < 30) {
                // Anti-aliasing edges
                const alpha = Math.floor(255 * ((dist - 10) / 20));
                this.bitmap.data[idx + 3] = alpha;
            }
        });
        
        await image.write(outPath);
        console.log(`Saved transparent image to ${outPath}`);
        
        fs.unlinkSync(assetPath);
        fs.renameSync(outPath, assetPath);
        
    } catch (e) {
        console.error(`Error processing ${filename}:`, e);
    }
}

async function main() {
    // Only processing laptop 2.png to remove its specific grey background
    await processImage("laptop 2.png");
}

main();
