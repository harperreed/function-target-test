// ---------------------------------------------------------------------------
// [START functionsimport]

const functions = require('firebase-functions');
const admin = require('firebase-admin');

// [END functionsimport]
// ---------------------------------------------------------------------------
// [START additionalimports]

const fs = require('fs');
const path = require('path');

// [END additionalimports]
// ---------------------------------------------------------------------------
// [START helpers]

const firebaseConfig = functions.config().firebase;
// firebaseConfig.serviceAccountId = 'galactic-96e90@appspot.gserviceaccount.com';

admin.initializeApp(firebaseConfig);
admin.database.enableLogging(false);

const db = admin.firestore();

const settings = {
  /* your settings... */
  timestampsInSnapshots: true,
};
db.settings(settings);

// [END helpers]
// ---------------------------------------------------------------------------
// [START functions]

// [START API]

// Folder where all your individual api functions files are located.
const API_FUNCTIONS_FOLDER = './api';

// let's add some sanity checks. If the env function isn't available - let's throw and error.
if (!process.env.FUNCTION_NAME) {
  // eslint-disable-next-line no-console
  console.error('Expected FUNCTION_NAME');
  // throw new Error('Expected FUNCTION_NAME');
} else {
  // eslint-disable-next-line no-console
  console.log('FUNCTION_NAME', process.env.FUNCTION_NAME);
}

if (!process.env.FUNCTION_TARGET) {
  // eslint-disable-next-line no-console
  console.error('Expected FUNCTION_TARGET');
  // throw new Error('Expected FUNCTION_TARGET');
} else {
  // eslint-disable-next-line no-console
  console.log('FUNCTION_TARGET', process.env.FUNCTION_TARGET);
}

// list files in the folder.
fs.readdirSync(path.resolve(__dirname, API_FUNCTIONS_FOLDER)).forEach((file) => {
  if (file.endsWith('.js')) {
    const fileBaseName = file.slice(0, -3); // Remove the '.js' extension
    const ENV_FUNCTION = process.env.FUNCTION_TARGET; // This was changed from FUNCTION_NAME to FUNCTION_TARGET
    if (!ENV_FUNCTION || ENV_FUNCTION === fileBaseName) {
      const requireString = `${API_FUNCTIONS_FOLDER}/${fileBaseName}`;
      // eslint-disable-next-line no-console
      console.log('Importing', fileBaseName);
      // eslint-disable-next-line global-require, import/no-dynamic-require
      exports[fileBaseName] = require(requireString);
    } else {
      // eslint-disable-next-line no-console
      console.log('DO NOT IMPORT', fileBaseName);
    }
  }
});

// [END API]

// ---------------------------------------------------------------------------

// [END functions]
// ---------------------------------------------------------------------------
