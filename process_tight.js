import sharp from 'sharp';
import fs from 'fs';

async function processImage() {
  const input = 'public/TAZEN.png';
  const output = 'public/TAZEN_cropped.png';

  if (!fs.existsSync(input)) {
    console.error('Input file does not exist!', input);
    return;
  }

  // Trim the white background completely
  const trimmedBuffer = await sharp(input)
    .trim({ background: '#ffffff', threshold: 50 })
    .toBuffer();

  const metadata = await sharp(trimmedBuffer).metadata();
  console.log('Trimmed size:', metadata.width, metadata.height);

  const size = 512;
  
  // Resize to exactly 512x512, filling the bounds. No padding.
  await sharp(trimmedBuffer)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(output);
    
  console.log('Successfully created tight transparent favicon:', output);
}

processImage().catch(console.error);
