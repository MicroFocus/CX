window.readJSON = function (url) {
    // This builds out the URL.  Since we pass in the file name, we have to append the path.
    url = window.readJSON.base + url;

    var xhr = new XMLHttpRequest();
    var json = null;

    xhr.open("GET", url, false);

    xhr.onload = function (e) {
        if (xhr.status === 200) {
            json = JSON.parse(xhr.responseText);
        } else {
            console.error("readJSON", url, xhr.statusText);
        }
    };

    xhr.onerror = function (e) {
        console.error("readJSON", url, xhr.statusText);
    };

    xhr.send(null);
    return json;
};

window.readJSON.base = "/base/test/mock/";
