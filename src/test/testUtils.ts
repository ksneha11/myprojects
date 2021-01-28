import React from 'react';
import util from 'util';
import { TestContext } from '.';
import { StyleSheetSchema } from '../styles';
import { Logger } from '../utils';
import { mockColorSchema } from './mockColorSchema';

export const objectLog = (obj: object) => {
    // tslint:disable-next-line: no-console
    console.log(util.inspect(obj, true, null));
};
export class MockLogger extends Logger {
    protected log = null;

    public debug = () => null;
    public error = () => null;
    public info = () => null;
    public warn = () => null;
}

export const mockLogger = new MockLogger(null, null);

export const mockStyle = (styleSchema: any): StyleSheetSchema => {
    const style: StyleSheetSchema = styleSchema({ colorSchema: mockColorSchema });
    // objectLog(style);
    return style;
};

export const getTestComponentWithContext = Cut => {
    Cut.contextType = React.createContext(new TestContext());
    return Cut;
};

// TODO: find the correct matcher to deal with functions in objects.  Until then, use this function
// to remove functions from those objects
export const removeFunctionsFromObject = (object: any): any => {
    return JSON.parse(JSON.stringify(object));
};

export const hideReactWarnings = (spyOn) => {
    const errorsToHide: string[] = [
        'Each child in a list should have a unique "key" prop', 'componentWillReceiveProps'
    ]
    spyOn(console, 'error').mockImplementation((emittedError: string) => {
        const doShowError: boolean = !!errorsToHide.find((errorToHide) => {
            emittedError.includes(errorToHide);
        })
        if (doShowError) {
            console.warn(emittedError)
            return;
        }
        return
    });
}


export const flushPromises = () => new Promise(setImmediate);
