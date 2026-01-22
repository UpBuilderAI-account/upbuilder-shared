#!/usr/bin/env node
// ============================================================================
// VERSION INCREMENT SCRIPT
// Automatically increments the patch version in version.ts before each build
// ============================================================================

const fs = require('fs');
const path = require('path');

const VERSION_FILE = path.join(__dirname, '..', 'version.ts');

/**
 * Increment the patch version (e.g., 2.1.0 -> 2.1.1)
 */
function incrementVersion() {
  console.log('[version] Reading version file...');

  // Read the current version file
  const content = fs.readFileSync(VERSION_FILE, 'utf-8');

  // Extract current version using regex
  const versionMatch = content.match(/SHARED_VERSION\s*=\s*['"](\d+\.\d+\.\d+)['"]/);

  if (!versionMatch) {
    console.error('[version] ERROR: Could not find SHARED_VERSION in version.ts');
    process.exit(1);
  }

  const currentVersion = versionMatch[1];
  console.log(`[version] Current version: ${currentVersion}`);

  // Parse and increment
  const parts = currentVersion.split('.').map(Number);
  parts[2] += 1; // Increment patch version

  const newVersion = parts.join('.');
  console.log(`[version] New version: ${newVersion}`);

  // Replace in content
  const newContent = content.replace(
    /SHARED_VERSION\s*=\s*['"](\d+\.\d+\.\d+)['"]/,
    `SHARED_VERSION = '${newVersion}'`
  );

  // Write back
  fs.writeFileSync(VERSION_FILE, newContent, 'utf-8');
  console.log(`[version] Updated version.ts to ${newVersion}`);
}

// Run
incrementVersion();
