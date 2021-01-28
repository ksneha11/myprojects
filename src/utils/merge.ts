import deepmerge from 'deepmerge';

export default function merge(...objects: any[]): any {
    return deepmerge.all(objects.filter(x => typeof x === 'object'));
}
