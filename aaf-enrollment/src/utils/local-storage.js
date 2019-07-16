/* Read from and write to local storage.
 * Catch errors in case the user has disabled local storage.
 */
export const storageItems = {
    ENDPOINT_SESSION_ID: 'ENDPOINT_SESSION_ID',
    LOGIN_PROCESS_ID: 'LOGIN_PROCESS_ID',
    LOGIN_SESSION_ID: 'LOGIN_SESSION_ID'
};

export function loadStorageItem(name) {
    try {
        return localStorage.getItem(name) || undefined;
    }
    catch (err) {
        // Ignore read errors
        console.error('Local storage read error:', err);
        return undefined;
    }
}

export function saveStorageItem(name, value) {
    try {
        localStorage.setItem(name, value);
    }
    catch (err) {
        // Ignore write errors
        console.error('Local storage write error:', err);
    }
}

export function clearStorageItem(name) {
    try {
        localStorage.removeItem(name);
    }
    catch (err) {
        // Ignore write errors
        console.error('Local storage write error:', err);
    }
}
