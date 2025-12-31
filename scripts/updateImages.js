// scripts/updateImages.js
import fs from 'fs';
import path from 'path';

const updateImageTags = dir => {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      updateImageTags(filePath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');

      // Replace img tags
      content = content.replace(
        /<img\s+src=["']([^"']+)["']\s+alt=["']([^"']+)["'][^>]*>/g,
        (match, src, alt) => {
          return `<OptimizedImage src="${src}" alt="${alt}" width={400} height={300} />`;
        }
      );

      fs.writeFileSync(filePath, content);
    }
  });
};

updateImageTags('./src');
