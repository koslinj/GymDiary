const fs = require('fs');
const glob = require('glob');

const SOURCE_FOLDER = './app'; // Source folder to scan
const LOCALE_FILE = './config/locales/en-US/translation.json'; // Path to the English translation JSON

const ignorePatterns = [
  'className', // Ignore className attributes
  't(', // Ignore already translated strings
  '<Trans' // Ignore Trans components
];

// Utility to check if a string is a "hardcoded" string
function isHardcodedString(str) {
  return (
    str.length > 1 && // Ignore single characters
    !/^\s*$/.test(str) && // Ignore whitespace
    !/^\d+$/.test(str) && // Ignore pure numbers
    !/{[^}]*}/.test(str) // Ignore strings with variables inside {}
  );
}

// Generate a translation key from a string
function generateTranslationKey(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, '_') // Replace non-alphanumeric characters with underscores
    .replace(/_+/g, '_') // Remove duplicate underscores
    .slice(0, 50); // Limit key length
}

async function detectAndReplaceStrings() {
  const files = glob.sync(`${SOURCE_FOLDER}/**/*.{js,jsx,ts,tsx}`);
  const translations = fs.existsSync(LOCALE_FILE)
    ? JSON.parse(fs.readFileSync(LOCALE_FILE, 'utf-8'))
    : {};
  let updatedFiles = 0;

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    
    let fileUpdated = false;

    // Find strings inside <ThemedText>...</ThemedText> components
    const themedTextRegex = /<ThemedText([^>]*)>([^<]+)<\/ThemedText>/g;
    let match;

    // Check all occurrences of <ThemedText>...</ThemedText>
    while ((match = themedTextRegex.exec(content)) !== null) {
      const attributes = match[1]; // Get the attributes of <ThemedText> (e.g., className)
      let str = match[2].trim(); // Get the text inside <ThemedText>...</ThemedText>

      // Skip strings that are part of import, className, or already wrapped in `t()`
      if (
        isHardcodedString(str) &&
        !ignorePatterns.some(pattern => str.includes(pattern)) &&
        !str.startsWith('{t(') // Avoid already translated strings
      ) {
        const key = generateTranslationKey(str);
        if (!translations[key]) {
          translations[key] = str; // Add to translations if not already present
        }

        // Replace the string with t('key')
        const translatedStr = `{t('${key}')}`;
        content = content.replace(match[0], `<ThemedText${attributes}>${translatedStr}</ThemedText>`); // Preserve attributes
        fileUpdated = true;
      }
    }

    // If the file was modified, write the updated content back
    if (fileUpdated) {
      fs.writeFileSync(file, content, 'utf-8');
      updatedFiles++;
      console.log(`Updated file: ${file}`);
    }
  }

  // Write updated translations to JSON
  fs.writeFileSync(LOCALE_FILE, JSON.stringify(translations, null, 2));
  console.log(`${updatedFiles} files updated.`);
  console.log(`Translations saved to ${LOCALE_FILE}`);
}

detectAndReplaceStrings().catch(console.error);
