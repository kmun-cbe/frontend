#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Build script for Cloudflare Pages deployment
console.log('🚀 Building for Cloudflare Pages...');

// Ensure _headers and _redirects are copied to dist
const distPath = path.join(__dirname, 'dist');

// Copy _headers file
if (fs.existsSync(path.join(__dirname, '_headers'))) {
  fs.copyFileSync(
    path.join(__dirname, '_headers'),
    path.join(distPath, '_headers')
  );
  console.log('✅ Copied _headers to dist/');
}

// Copy _redirects file
if (fs.existsSync(path.join(__dirname, '_redirects'))) {
  fs.copyFileSync(
    path.join(__dirname, '_redirects'),
    path.join(distPath, '_redirects')
  );
  console.log('✅ Copied _redirects to dist/');
}

// Verify static assets exist
const publicPath = path.join(__dirname, 'public');
const distPublicPath = path.join(distPath);

const staticFiles = ['logo.png', 'dome-2.png', 'favicon.ico'];

staticFiles.forEach(file => {
  const sourcePath = path.join(publicPath, file);
  const destPath = path.join(distPublicPath, file);
  
  if (fs.existsSync(sourcePath)) {
    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✅ Copied ${file} to dist/`);
    }
  } else {
    console.warn(`⚠️  Warning: ${file} not found in public/`);
  }
});

console.log('🎉 Cloudflare build preparation complete!');
