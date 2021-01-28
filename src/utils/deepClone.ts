/*
 * per Evan
 *
 * doing the Object.assign will merge the objects, but it doesn't do a deep clone.
 * if you change properties in one object, it will be reflected in the other.
 * we shouldn't really need to worry about that, because each app should likely only be one theme at a time
 * but it's good we're doing it the right way

 * thanks Evan!
 */
export default function deepClone(obj: any): any {
    return Object.keys(obj).reduce((copyObj, key) => {
        let newVal;

        if (Array.isArray(obj[key])) {
            newVal = obj[key].map(item => deepClone(item));
        } else if (obj[key] !== null && typeof obj[key] === 'object') {
            newVal = deepClone(obj[key]);
        } else {
            newVal = obj[key];
        }
        return {
            ...copyObj,
            [key]: newVal,
        };
    }, {});
}
