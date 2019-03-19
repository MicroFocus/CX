class U2FHandler {
    super() {}

    u2fServiceUrl() {
        return 'https://127.0.0.1:8441/api/v1/fidou2f';
    }

    U2F_MSG_TOUCH_DEVICE() {
        return 'Please touch the flashing U2F device now. You may be prompted to allow ' +
        'the site permission to access your security keys';
    }

    getU2FOriginFromUrl(url) {
        const re = new RegExp('^(https?://)[^/]*/?');
        const originarray = re.exec(url);
        if (originarray == null) return originarray;
        let origin = originarray[0];
        while (origin.charAt(origin.length - 1) === '/') {
            origin = origin.substring(0, origin.length - 1);
        }
        if (origin === 'http:' || origin === 'https:') return null;
        return origin;
    }
}

export default U2FHandler;