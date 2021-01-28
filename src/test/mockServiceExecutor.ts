import { ServiceEndpoint } from 'atlas-services/src/services/middleware';
// import IngenioMockServices from '../../../ingeniorx-ui/src/services/ingenioMockService';
import { ExecutorParams } from '../context/services/serviceExecutor';

// TODO: figure out a way for individual apps to provide post transform mock responses
// so that builds don't break
const ingenioMockServices = {}
const mockPostTransformJSONResponses: Map<ServiceEndpoint, any> = new Map<ServiceEndpoint, any>()


// const ingenioMockServices = new IngenioMockServices();
// @ts-ignore Property 'createMockData' is protected and only accessible within class 'IngenioMockServices' and its subclasses
// const mockPostTransformJSONResponses: Map<ServiceEndpoint, any> = ingenioMockServices.createMockData();

/**
 * getMockServiceExecutor
 * @param servicesWithCustomResolve - a map of service endpoints and a object that service should resolve as.
 * @params servicesWithCustomReject - a map of service endpoints that will reject with an error and the given error object it is mapped to
 */

export interface GetMockServiceExecutorConfig {
    servicesWithCustomReject?: Map<ServiceEndpoint, any>
    servicesWithCustomResolve: Map<ServiceEndpoint, any>,
}


export const getMockServiceExecutor = ({ servicesWithCustomResolve,
    servicesWithCustomReject }: GetMockServiceExecutorConfig = {} as GetMockServiceExecutorConfig
) => {
    return () => {

        return {
            execute: (serviceEndpoint: ServiceEndpoint, serviceParams?: ExecutorParams) => {
                return new Promise((resolve, reject) => {
                    if (servicesWithCustomResolve?.has(serviceEndpoint)) {
                        const response = servicesWithCustomResolve?.get(serviceEndpoint) ?? {};
                        resolve(response);
                    }
                    else if (servicesWithCustomReject?.has(serviceEndpoint)) {
                        const response = servicesWithCustomReject?.get(serviceEndpoint) ?? {};
                        reject(response);
                    }
                    else {
                        // TODO: return the normal mock response object
                        // resolve(MOCK FROM JSON)
                    }
                });
            },
        };
    };
};
