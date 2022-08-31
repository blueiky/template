export function isArray(val): boolean {
    return Object.prototype.toString.call(val) === '[object Array]';
}
export function isObject(val): boolean {
    return Object.prototype.toString.call(val) === '[object Object]';
}
export function isString(val): boolean {
    return Object.prototype.toString.call(val) === '[object String]';
}
export function isFunction(val): boolean {
    return Object.prototype.toString.call(val) === '[object Function]';
}

export function isNumber(val): boolean {
    return Object.prototype.toString.call(val) === '[object Number]';
}

export const isSSR = (function () {
    try {
        return !(typeof window !== 'undefined' && document !== undefined);
    } catch (e) {
        return true;
    }
})();