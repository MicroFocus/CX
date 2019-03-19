let toastEventsBeforeLoad = [];
let toastHandler = null;

export function createToast(toast) {
    if (toastHandler) {
        toastHandler(toast);
    }
    else {
        toastEventsBeforeLoad.push(toast);
    }
}

export function onCreateToast(handler) {
    toastHandler = handler;
    toastEventsBeforeLoad.forEach((toast) => {
        handler(toast);
    });
    toastEventsBeforeLoad = [];
}

export default createToast;
