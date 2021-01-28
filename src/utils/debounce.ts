/**
 * Util to prevent consecutive service calls when change events occur.
 */

export function debounce(context: any, callback: DebounceCallback, ms: number = 500): DebounceCallback {
    let timeoutRef: NodeJS.Timeout;
    return (...args: any): void => {
        clearTimeout(timeoutRef);
        timeoutRef = setTimeout(() => callback.apply(context, args), ms);
    };
}

type DebounceCallback = (...params: any) => void;
