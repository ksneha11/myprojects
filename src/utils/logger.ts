import crashlytics from '@react-native-firebase/crashlytics';

export enum LogLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARN = 'WARN',
}

export const getLogLevel = (logLevel: string): LogLevel => {
    switch (logLevel) {
        case 'DEBUG':
            return LogLevel.DEBUG;
        case 'INFO':
            return LogLevel.INFO;
        case 'WARN':
            return LogLevel.WARN;
        default:
            // tslint:disable-next-line: no-console
            console.warn(`log level is not configured correctly ~ trying to set to ${logLevel}`);
            // if log level is incorrect for whatever reason, default to the safe one
            return LogLevel.WARN;
    }
};

export default class Logger {
    constructor(protected readonly development: boolean, protected readonly logLevel: LogLevel) {}

    public debug(message: string, optionalParams?: any): undefined {
        if (this.logLevel === LogLevel.DEBUG) {
            // console.debug statements don't print to logcat for some reason
            // tslint:disable-next-line: no-console
            this.log(console.info, message, optionalParams);
        }
        return; // TypeScript forces you to return, no implicit undefineds
    }

    /**
     * we need to be careful with error logging
     * we could pass in optional params here, but sending the wrong data could cause PHI issues
     * be extremely diligent here ~ try to make the error message as detailed as possible but make sure no personal information gets sent
     *
     * here's what I'm worried about with optional parameters here:
     * it could be the case that we send an object that doesn't have PHI in it and it gives us some nice information on the  logs
     * without realizing it, somebody adds a field to that model and now the model has PHI in it
     * because it's already being sent  we're now sending PHI across the wire, and now we have PHI violations
     *
     * i believe it's safer to leave optional params off altogether
     * we still need to be diligent about making sure error messages aren't something like `error with payment ${paymentMethod}`
     */
    public error(message: string): undefined {
        // also want logs to show up in console for errors, not just in crashlytics
        crashlytics().recordError(new Error(message));
        this.warn(message);
        return;
    }

    public info(message: string, optionalParams?: any): undefined {
        if (this.logLevel === LogLevel.DEBUG || this.logLevel === LogLevel.INFO) {
            // tslint:disable-next-line: no-console
            this.log(console.info, message, optionalParams);
        }
        return;
    }

    public warn(message: string, optionalParams?: any): undefined {
        // tslint:disable-next-line: no-console
        this.log(console.warn, message, optionalParams);
        return;
    }

    protected log(
        consoleFunction: (message?: any, ...optionalParams: any[]) => void,
        message: string,
        optionalParams?: any
    ) {
        if (this.development) {
            consoleFunction(message, optionalParams || '');
        } else {
            /**
             * logcat doesn't work with commas in the console function
             * if you said something like console.log('My name is: ', myName), logcat would just print 'My name is'
             * the comma operator is extremely helpful for development purposes, but we need to make sure we don't use it in perfecto
             */
            consoleFunction(`${message} ${JSON.stringify(optionalParams, null, '\t')}`);
        }
    }
}
