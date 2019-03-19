export function randomString(n) {
    const count = n || 32;

    let result = '';
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < count; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
}
