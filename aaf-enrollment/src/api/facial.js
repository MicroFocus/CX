/* eslint-disable */
import * as tracking from 'exports-loader?tracking!tracking';
import "tracking/build/data/face.js";

// Error code 1006 means that the connection was closed abnormally
// See http://tools.ietf.org/html/rfc6455#section-7.4.1
const WS_ABNORMAL_CLOSURE_CODE = 1006;
// Error code 1000 means that the connection was closed normally.
const WS_NORMAL_CLOSURE_CODE = 1000;
const CAPTURE_TIMEOUT = 60000;  // 60 seconds
const FACE_SERVICE_URL = 'wss://127.0.0.1:8441/api/v1/video';

let webSocketInterval = null;
let trackerTaskInterval = null;
let trackertask = null;
let stop = false;
let webSocket = null;

//TODO convert this to our localization
const _ = (value) => {
    return value;
};

export function FACE_DETECTING_MSG() {
    return (_('Detecting a face'));
};

export function FACE_DETECTED_MSG() {
    return (_('Face Detected'));
};


function WEBSOCKET_RECONNECT_MSG() {
    return (_('Webcam service is busy. Trying to reconnect'));
}

function WEBCAM_NOT_SUPPORTED_MSG() {
    return (_('Webcam not supported by this browser'));
}

//========================= starts Device Service =============================
export function deviceServiceFaceCapture(callback, switchCallback) {
    if ('WebSocket' in window) {
        if (!webSocket) {
            clearInterval(webSocketInterval);
            let params = {
                'params': {'detectFace': 'true'},
                'command': 'getImage'
            };
            let counter = 0;
            let WAIT_COUNTER = 20;  // no of successful face detection before autosubmit

            webSocket = new WebSocket(FACE_SERVICE_URL);

            webSocket.onopen = function() {
                webSocket.send(JSON.stringify(params));
            };
            webSocket.onmessage = function(evt) {
                if (!stop) {
                    let msg = JSON.parse(evt.data);
                    if (msg.result == 'OK') {
                        msg.img_src = 'data:image/png;base64,' + encodeURIComponent(msg.data);
                        if (msg.detectedObjects) {
                            if (msg.detectedObjects.face) {
                                callback({'result': counter == WAIT_COUNTER ? 'OK' : 'WAIT', 'faceImg': msg.data, 'img_src': msg.img_src});
                                counter ++;
                            }
                        }
                        if (webSocket.readyState === WebSocket.OPEN && !stop) webSocket.send(JSON.stringify(params));
                    } else {
                        callback({'result': 'ERROR', 'msg': msg.reason});
                    }
                } else {
                    if (webSocket) { webSocket.close(); }
                }
            };
            webSocket.onclose = function(evt) {
                if (evt.code != WS_NORMAL_CLOSURE_CODE) {
                    console.log('Websocket Error: {code: %s, reason: %s}', evt.code, evt.reason || 'Unknown');
                }
                // close event returning with error code 1006 for websocket connection error
                // if error code is 1006 and stop flag is not set, switch to browser support
                if (evt.code == WS_ABNORMAL_CLOSURE_CODE && !stop) {
                    clearInterval(webSocketInterval);
                    switchCallback(callback);
                }

                if (webSocket.readyState === WebSocket.CLOSED) {
                    webSocket = null;
                }
            };
        } else if (webSocket.readyState === WebSocket.CLOSING) {
            callback({'result': 'ERROR', 'msg': WEBSOCKET_RECONNECT_MSG()});
            webSocketInterval = setInterval(function() {
                checkWebSocketAlive(callback);
            }, 1000);
        }
    } else {
        switchCallback(callback);
    }
}

export function checkWebSocketAlive(callback) {
    if (webSocket === null) {
        clearInterval(webSocketInterval);
        deviceServiceFaceCapture(callback);
    }
}

//=================== ends Device Service ===========================


//=================== starts Browser Support (trackingJS) ===========================

/**
* Captures the user camera when tracking a video element and set its source
* to the camera stream.
* @param {HTMLVideoElement} element Canvas element to track.
* @param {object} opt_options Optional configuration to the tracker.
*/
tracking.initUserMedia_ = function(element, opt_options, failCallback) {
    const navigator = window.navigator;
    // Older browsers might not implement mediaDevices at all, so we set an empty object first
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }
    // Some browsers partially implement mediaDevices. We can't just assign an object
    // with getUserMedia as it would overwrite existing properties.
    // Here, we will just add the getUserMedia property if it's missing.
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function(constraints) {
        // First get ahold of the legacy getUserMedia, if present
        const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        // Some browsers just don't implement it - return a rejected promise with an error
        // to keep a consistent interface
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }

        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise(function(resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: !!(opt_options && opt_options.audio)
    })
    .then(function(stream) {
        window.tracking.localStream = stream;
        // Older browsers may not have srcObject
        if ('srcObject' in element) {
            element.srcObject = stream;
        } else {
            // Avoid using this in new browsers, as it is going away.
            element.src = window.URL.createObjectURL(stream);
        }
    })
    .catch(function() {
        failCallback(WEBCAM_NOT_SUPPORTED_MSG());
    });
};


// overriding track function, to add failCallback as parameter that catches the error from getUserMedia
tracking.track = function(element, tracker, opt_options, failCallback) {
    element = tracking.one(element);
    if (opt_options) {
      if (opt_options.camera) {
        tracking.initUserMedia_(element, opt_options, failCallback);
      }
    }
    return tracking.trackVideo_(element, tracker, opt_options);
};

export function browserFaceCapture(domIds, callback) {
    const canvas = document.getElementById(domIds.canvas);
    const context = canvas.getContext('2d');
    let counter = 0;
    const WAIT_COUNTER = 5;  // no of successful face detection before autosubmit

    let tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(6);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    trackertask = tracking.track('#'+domIds.video, tracker, { camera: true }, failCallback);

    // to catch error throw by getUserMedia
    function failCallback(err) {
        callback({'result': 'ERROR', 'msg': err});
    }

    if (!trackerTaskInterval) { trackerTaskInterval = setInterval(checkTrackerTaskAlive, 1000); }

    tracker.on('track', function(event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        event.data.forEach(function(rect) {
            context.strokeStyle = '#117700';
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            if (counter == WAIT_COUNTER) {
                let faceImg = takeSnapshot(domIds);
                if (faceImg) { faceImg = faceImg.split('base64,')[1]; }
                callback({'result': 'OK', faceImg});
            }
            counter ++;
        });
    });
}

export function takeSnapshot(domIds) {
    const video = document.getElementById(domIds.video);
    const canvas = document.getElementById(domIds.canvasSnap);
    const context = canvas.getContext('2d');
    // Get the exact size of the video element.
    const width = video.videoWidth;
    const height = video.videoHeight;

    // Set the canvas to the same dimensions as the video.
    canvas.width = width;
    canvas.height = height;

    // Draw a copy of the current frame from the video on the canvas.
    context.clearRect(0, 0, width, height);
    context.drawImage(video, 0, 0, width, height);
    return canvas.toDataURL('image/png');
}

export function checkTrackerTaskAlive() {
    if (!trackertask.inRunning()) {
        trackertask.run();
    } else {
        stoptrackerTaskInterval();
    }
}

export function stoptrackerTaskInterval() {
    if (trackerTaskInterval) { clearInterval(trackerTaskInterval); }
}

//====================== ends Browser support (trackingJS)=============================================

 /**
     * It captures the face of user.
     * It uses the Device Service if available else it switches to Browser Support
     * (trackingJS) to capture the face of user
    **/
export function captureFace(domIds, changeStateCallBack) {
    stop = false;
    // Make fetch request
    let abortFunction = null;
    let promisePending = true;
    let timeoutTimerID = null;
    const timeout = true;
    const clearTimeoutTimer = () => {
        if (timeoutTimerID) {
            clearTimeout(timeoutTimerID);
        }
    };

    const promise = new Promise((resolve, reject) => {

        function capturFaceCallBack(data) {
            if (data.result == 'OK') {
                changeStateCallBack({img_src: ''});
                resolve(data.faceImg);
            } if (data.result == 'WAIT') {
                changeStateCallBack({img_src: data.img_src});
            } else {
                reject(data.msg);
            }
        }
            
        deviceServiceFaceCapture(capturFaceCallBack, (callback) => browserFaceCapture(domIds, callback));

        if (timeout) {
            timeoutTimerID = setTimeout(() => {
                if (promisePending) {
                    promisePending = false;
                    reject({
                        status: 'timeout'
                    });
                }
            }, CAPTURE_TIMEOUT);
        }

        abortFunction = () => {
            clearTimeoutTimer();
            if (promisePending) {
                promisePending = false;
                reject({
                    status: 'abort',
                    url
                });
            }
        };
    });

    promise.abort = () => abortFunction();    // In case abortFunction isn't already set, don't pass reference directly

    return promise;
}

export function stopCapture() {
    if (!stop) {
        stop = true;
        if (window.tracking.localStream) {
            const track = window.tracking.localStream.getTracks()[0];
            track.stop();
        }
        if (trackertask) {
            setTimeout(function() {
                trackertask.stop();
            }, 10);
        }
    }
}