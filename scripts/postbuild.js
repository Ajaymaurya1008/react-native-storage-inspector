#!/usr/bin/env node
/**
 * Replace __require("optional-module") with require("optional-module") in dist.
 * Metro only recognizes literal require() in try/catch as optional deps.
 */
const fs = require('fs');
const path = require('path');

const optionalModules = [
  '@react-native-async-storage/async-storage',
  'react-native-keychain',
  'expo-secure-store',
  'react-native-mmkv',
];

const distDir = path.join(__dirname, '..', 'dist');
for (const mod of optionalModules) {
  const safeMod = mod.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`__require\\(["']${safeMod}["']\\)`, 'g');
  const replacement = `require("${mod}")`;
  for (const file of ['index.js', 'index.mjs']) {
    const p = path.join(distDir, file);
    if (fs.existsSync(p)) {
      let content = fs.readFileSync(p, 'utf8');
      content = content.replace(pattern, replacement);
      fs.writeFileSync(p, content);
    }
  }
}
console.log('Postbuild: replaced __require with require for optional deps');
