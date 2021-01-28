import { AppData, EndpointType, Languages, ServiceException } from 'atlas-services/src/models';
import { Subject } from 'rxjs';
import { AppContextInterface } from '..';
import { default as endpointsJson } from '../../../generated/endpoints.json';
import { Deeplinks } from '../../models/index';
import { merge } from '../../utils';
import { default as exceptionsJsonES } from './serviceExceptions.es.json';
import { default as exceptionsJson } from './serviceExceptions.json';

export interface AppContent {
    deeplinks: Deeplinks;
    endpoints: EndpointType;
    exceptions: Map<Languages, Map<string, ServiceException>>;
    supportedVersions: string[];
}

export default class Content {
    protected _deeplinks: Map<Languages, Deeplinks>;
    protected _endpoints: Map<Languages, EndpointType>; // Isn't currently language specific, but might as well give the option to let it be
    protected _exceptions: Map<Languages, Map<string, ServiceException>>;
    protected _supportedVersions: string[];

    protected languageKeys: Languages[] = Object.keys(Languages) as Languages[];

    constructor(appDataEN: Subject<AppData>, appDataES: Subject<AppData>, protected appContext: AppContextInterface) {
        this._deeplinks = new Map<Languages, Deeplinks>(this.languageKeys.map(language => [language, {} as Deeplinks]));
        this._endpoints = new Map<Languages, EndpointType>(
            this.languageKeys.map(language => [language, endpointsJson as EndpointType])
        );
        this._exceptions = new Map<Languages, Map<string, ServiceException>>(
            this.languageKeys.map(language => [language, new Map<string, ServiceException>()])
        );
        // TODO: Make this work off an array rather than hardcoding each language
        this.updateExceptions(exceptionsJson as ServiceException[], Languages.EN);
        this.updateExceptions(exceptionsJsonES as ServiceException[], Languages.ES);

        appDataEN.subscribe(data => {
            if (data) {
                this.updateDeeplinks(data.deeplinks, Languages.EN);
                this.updateEndpoints(data.endpoints, Languages.EN);
                this.updateExceptions(data.errors, Languages.EN);
                this.updateSupportedVersions(data.supportedVersions);
            }
        });

        appDataES.subscribe(data => {
            if (data) {
                this.updateDeeplinks(data.deeplinks, Languages.ES);
                this.updateEndpoints(data.endpoints, Languages.ES);
                this.updateExceptions(data.errors, Languages.ES);
                this.updateSupportedVersions(data.supportedVersions);
            }
        });
    }

    public get deeplinks() {
        return this._deeplinks.get(this.appContext.state.selectedLanguage);
    }

    public get endpoints() {
        return this._endpoints.get(this.appContext.state.selectedLanguage);
    }

    public get exceptions() {
        return this._exceptions;
    }

    public get supportedVersions() {
        return this._supportedVersions;
    }

    protected updateDeeplinks(deeplinkOverrides: Deeplinks, language: Languages) {
        const existingDeeplinks = this._deeplinks.get(language);
        const mergedDeepLinks = merge(existingDeeplinks, deeplinkOverrides);
        this._deeplinks = this._deeplinks.set(language, mergedDeepLinks);
    }

    protected updateEndpoints(endpointOverrides: EndpointType, language: Languages) {
        const existingEndpoints = this._endpoints.get(language);
        const mergedEndpoints = merge(existingEndpoints, endpointOverrides);
        this._endpoints = this._endpoints.set(language, mergedEndpoints);
    }

    protected updateExceptions(exceptionOverrides: ServiceException[], language: Languages) {
        if (exceptionOverrides) {
            exceptionOverrides.forEach(serviceException => {
                this._exceptions.get(language).set(serviceException.errorCode, serviceException);
            });
        }
    }

    protected updateSupportedVersions(versions: string[]) {
        if (versions) {
            this._supportedVersions = versions;
        }
    }
}
