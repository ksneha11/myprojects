import { ServiceEndpoint } from 'atlas-services/src/services/middleware';
import React, { Component } from 'react';
import { AppContext } from '../App';
import { AppContextInterface } from '../context';
import { ExecutorParams } from '../context/services/serviceExecutor';

/**
 * Class which makes the app's style context available (this.style).
 * @extends React.Component
 */
abstract class ContextComponent<
    Props = {},
    State = {},
    Context extends AppContextInterface = AppContextInterface
> extends Component<Props, State> {
    public context: React.ContextType<typeof AppContext>;

    public get appContext(): Context {
        return this.context.appContext as Context;
    }

    public get appState(): Context['state'] {
        return this.appContext.state;
    }

    public get appStateActions(): Context['appStateActions'] {
        return this.appContext.appStateActions;
    }

    public get appContent(): Context['content'] {
        return this.appContext.content;
    }

    /**
     * this is simply a convenience method to wrap the serviceExecutor boilerplate
     * this provides a success callback only and is intended for calls that don't require special error handling
     * for anything requiring complex error handling, you can use the service executor directly
     */
    public executeService<T>(
        serviceEndpoint: ServiceEndpoint,
        callback: (response: T) => void,
        serviceParams?: ExecutorParams
    ) {
        this.appContext
            .getServiceExecutor()
            .execute(serviceEndpoint, serviceParams)
            .then(response => callback(response))
            .catch(exception => {
                /*
                 * a lot of places using service executor don't do any error handling
                 *
                 * we've had instances (e.g. pre-caching on post init, or refreshing Ingenio landing page)
                 * where multiple calls are chained together, or a service is awaited without a try/catch block,
                 * and an exception gets thrown which exits the function and prevents the remaining code from running.
                 * this is an attempt at alleviating that while making boilerplate service calls simple (not having to
                 * remember to explicitly try/catch or .catch for every service call)
                 */
                this.logger.warn(`unable to get service response for ${serviceEndpoint.name}`, exception);
            });
    }

    public get features(): Context['features'] {
        return this.appContext.features;
    }

    public formatLabel = (label: string, ...args: Array<number | string | JSX.Element>): Children => {
        /*
         * this is copied from the previous labelFormatted implementation
         *
         * FIXME: TODO:
         * this seems unnecessarily complex
         * there's a map + replace calls, followed by a split/map/reduce
         *
         * don't see any reason to not just loop over the args array, get the index and call replace\
         * it's one loop and the same number of replace calls
         */
        const regex = /\%[0-9]+/g;
        const argumentIndexes = label.match(regex).map(match => Number(match.replace('%', '')));

        const getArg = (index: number) => {
            const argumentIndex = argumentIndexes[index];
            return argumentIndex && args[argumentIndex - 1];
        };

        return label
            .split(regex)
            .map((str, index) => {
                return [str, getArg(index)];
            })
            .reduce((acc, val) => acc.concat(val), []);
    };

    public get getErrorModal() {
        return this.appContext.getErrorModal;
    }

    public get getGlobalModal() {
        return this.appContext.getGlobalModal;
    }

    public get getIcon() {
        return this.appContext.getIcon;
    }

    public get getImage() {
        return this.appContext.getImage;
    }

    public get labels(): Context['labels'] {
        return this.appContext.labels;
    }

    public get logger() {
        return this.appContext.logger;
    }

    public trackEvent(className: { name: string }, action?: string) {
        return this.appContext.getAnalyticsService().track(className, action);
    }
}

ContextComponent.contextType = AppContext;

export default ContextComponent;
