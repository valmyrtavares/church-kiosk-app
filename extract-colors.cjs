const { default: Vibrant } = require('node-vibrant/node');
const path = require('path');

const imagePath = path.resolve('src/assets/images/header.jpg');

Vibrant.from(imagePath).getPalette((err, palette) => {
    if (err) {
        console.error('Error extracting colors:', err);
        process.exit(1);
    }

    console.log('---COLORS---');
    console.log('Vibrant:', palette.Vibrant ? palette.Vibrant.getHex() : '');
    console.log('Muted:', palette.Muted ? palette.Muted.getHex() : '');
    console.log('DarkVibrant:', palette.DarkVibrant ? palette.DarkVibrant.getHex() : '');
    console.log('DarkMuted:', palette.DarkMuted ? palette.DarkMuted.getHex() : '');
    console.log('LightVibrant:', palette.LightVibrant ? palette.LightVibrant.getHex() : '');
    console.log('LightMuted:', palette.LightMuted ? palette.LightMuted.getHex() : '');
});
