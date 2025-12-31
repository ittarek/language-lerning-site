// scripts/convert-to-webp.js
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images/optimized');

// Supported image formats
const supportedFormats = ['.jpg', '.jpeg', '.png', '.gif'];

async function convertToWebP() {
  try {
    console.log('🚀 Starting image optimization...\n');

    // Create output directory if it doesn't exist
    try {
      await fs.mkdir(outputDir, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
    }

    // Read all files from input directory
    let files;
    try {
      files = await fs.readdir(inputDir);
    } catch (err) {
      console.error(`❌ Error: Could not read directory ${inputDir}`);
      console.log(`💡 Make sure 'public/images' folder exists with images inside`);
      process.exit(1);
    }

    let converted = 0;
    let skipped = 0;

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();

      // Skip if not a supported image format
      if (!supportedFormats.includes(ext)) {
        skipped++;
        continue;
      }

      const inputPath = path.join(inputDir, file);
      const outputFileName = path.basename(file, ext) + '.webp';
      const outputPath = path.join(outputDir, outputFileName);

      try {
        // Get image metadata
        const metadata = await sharp(inputPath).metadata();

        // Convert to WebP
        await sharp(inputPath)
          .webp({
            quality: 80,
            effort: 6,
          })
          .resize(1920, null, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .toFile(outputPath);

        // Get file sizes
        const inputStats = await fs.stat(inputPath);
        const outputStats = await fs.stat(outputPath);
        const savedPercent = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

        console.log(`✅ ${file}`);
        console.log(`   Original: ${(inputStats.size / 1024).toFixed(2)} KB`);
        console.log(`   WebP: ${(outputStats.size / 1024).toFixed(2)} KB`);
        console.log(`   Saved: ${savedPercent}%`);
        console.log(`   Dimensions: ${metadata.width}x${metadata.height}\n`);

        converted++;
      } catch (error) {
        console.error(`❌ Error converting ${file}:`, error.message);
      }
    }

    console.log('\n📊 Summary:');
    console.log(`✅ Converted: ${converted} images`);
    console.log(`⏭️  Skipped: ${skipped} files`);
    console.log(`📁 Output directory: ${outputDir}\n`);

    if (converted === 0) {
      console.log(
        '💡 Tip: Make sure you have .jpg, .jpeg, .png, or .gif files in public/images/'
      );
    }
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run the conversion
convertToWebP();
