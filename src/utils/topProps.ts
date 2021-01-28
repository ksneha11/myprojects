/**
 * Useful for parsing SASS-if an object is structered
 *  login: {
 *      flex: 1
 *      paddingHorizontal: 15
 *      header: {
 *          paddingTop: 5
 *      }
 * }
 *
 * And you pass in login, this will return
 * login: {
 *      flex: 1
 *      paddingHorizontal: 15
 * }
 * Which can be parsed in the Stylesheet.Create method.
 *
 */
export default function topProps(styles: any) {
    const keys: string[] = Object.keys(styles);
    const newObject: any = {};
    keys.forEach(key => {
        if (typeof styles[key] === 'string' || typeof styles[key] === 'number') {
            newObject[key] = styles[key];
        }
    });
    return newObject;
}
