import { getColor, getPalette } from 'color-thief-node';
import path from 'path';

const imagePath = path.resolve('src/assets/images/header.jpg');

async function extract() {
    try {
        const defaultColor = await getColor(imagePath);
        const palette = await getPalette(imagePath, 5);
        console.log('---COLORS---');
        console.log('Dominant RGB:', defaultColor);
        console.log('Palette RGB:', palette);
    } catch (err) {
        console.error(err);
    }
}

extract();
