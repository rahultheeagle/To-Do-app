// This file exports placeholders. The actual configuration data will be loaded
// from a global object defined in index.html to ensure compatibility across
// module boundaries in this specialized execution environment.

/**
 * The application identifier used for Firestore data partitioning.
 * @type {string}
 */
export let APP_ID = 'default-app-id';

/**
 * The Firebase configuration object, parsed from a global JSON string.
 * @type {object | null}
 */
export let FIREBASE_CONFIG = null;

/**
 * The custom authentication token for initial sign-in.
 * @type {string | null}
 */
export let INITIAL_AUTH_TOKEN = null;

/**
 * Function to initialize the exported configuration variables.
 * This is called from the <script> block in index.html.
 * @param {object} config - Object containing the environment variables.
 */
export function initializeConfig(config) {
    APP_ID = config.appId;
    FIREBASE_CONFIG = config.firebaseConfig;
    INITIAL_AUTH_TOKEN = config.initialAuthToken;
}
